import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getAllTodos, updateTodo, type Todo } from "./api/getCrud";

export function ToDo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // component ekrana ilk defe gelende mount olur, yeni ilk render, bunu amma useeffectde return edende cleanup gedir bu ise component ekrandan silinmesi unmountdur.
  //   Unmount
  // Bir komponent ekrandan silindiyi zaman baş verir.
  // React həmin component-i memory-dən təmizləyir, cleanup lazımdırsa burda edilir.
  // sen unmount etmsen, lazimsiz build up olur memory leak olacaq yaddas fullu deye.
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError(null);
        // laoding geldi error null olub temizlendi

        // json formarinda mende geldi getalltodos, onlar gozleyirik gelsin funsiyadan, sonrada state yazariiq. set - bir feldir action yeni yazmaq ucun. get gostermek ucun.
        const data = await getAllTodos();
        setTodos(data);
      } catch (error) {
        setError("data is now being fetched");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAdd = async () => {
  
    if (!input.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const newTodo = await createTodo(input);
      setTodos([...todos, newTodo]);
      setInput("");
    } catch (error) {
      setError('while creating i got error lad')
      console.error(error)
    }
    finally {
      setLoading(false)
    } 

    // Date.now() is a placeholder for “the database will handle this later”
    
  };
  const handleDelete = async(id: number) => {
    try {
      setLoading(true);
      setError(null);
      await deleteTodo(id) //apiye delete request gonder
      
      setTodos(todos.filter((item) => item.id !== id));
    } catch (error) {
      setError("while deleting i got error lad");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: number) => {
   
    const newText = prompt("Edit todo: ");
    if (!newText || !newText.trim()) return;
    try {
      
      setLoading(true);
      setError(null);
      const updatedTodo = await updateTodo(id, newText );
       setTodos(
         todos.map((item) =>
           item.id === id ?  updatedTodo : item
         )
       );
    } catch (error) {
      setError("while editing i got error lad");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen">
      <h1 className="text-xl my-5">Full Stack To Do App</h1>
      <div className="w-100">
        <div className="flex justify-between">
          <Input
            type="text"
            placeholder="buy grocies.."
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button onClick={handleAdd} variant="outline" className="ml-3 ">
            Add
          </Button>
        </div>
        <ul className="mt-3 ">
          {todos.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center mt-3"
            >
              <div> {item.text}</div>
              <div>
                <Button
                  onClick={() => handleEdit(item.id)}
                  variant="outline"
                  className="ml-3"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="outline"
                  className="ml-3"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
