// ============================================
// FETCH API İSTİFADƏSİ İLƏ COMPONENT NÜMUNƏSİ
// ============================================
// Bu fayl fetch API istifadə edərək React component yazmaq üçün nümunədir

import { useState, useEffect } from "react";
import { getAllTodos, createTodo, updateTodo, deleteTodo, Todo } from "./fetch-api-example";

export function ToDoWithFetch() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Component mount olduqda todoları yüklə
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllTodos();
        setTodos(data);
      } catch (err) {
        setError("Failed to load todos. Make sure the backend is running on http://localhost:3000");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // Yeni todo əlavə et
  const handleAdd = async () => {
    if (!input.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const newTodo = await createTodo(input);
      setTodos([...todos, newTodo]);
      setInput("");
    } catch (err) {
      setError("Failed to add todo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Todo sil
  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await deleteTodo(id);
      setTodos(todos.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to delete todo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Todo redaktə et
  const handleEdit = async (id: number) => {
    const newText = prompt("Edit todo: ");
    if (!newText || !newText.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const updatedTodo = await updateTodo(id, newText);
      setTodos(
        todos.map((item) => (item.id === id ? updatedTodo : item))
      );
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-xl my-5">Full Stack To Do App (Fetch API)</h1>
      <div className="w-100">
        {error && (
          <div className="mb-3 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="buy groceries.."
            onChange={(e) => setInput(e.target.value)}
            value={input}
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAdd();
              }
            }}
          />
          <button 
            onClick={handleAdd} 
            disabled={loading || !input.trim()}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
        {loading && todos.length === 0 ? (
          <div className="mt-3">Loading todos...</div>
        ) : (
          <ul className="mt-3">
            {todos.map((item) => (
              <li key={item.id} className="flex justify-between items-center mt-3">
                <div>{item.text}</div>
                <div>
                  <button
                    onClick={() => handleEdit(item.id)}
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ============================================
// FETCH API-NIN XÜSUSİYYƏTLƏRİ:
// ============================================
// ✅ Heç bir əlavə paket lazım deyil (native browser API)
// ✅ Modern və standart
// ✅ Promise-based (async/await ilə istifadə olunur)
// ❌ Manual error handling lazımdır
// ❌ Manual loading state idarəetməsi lazımdır
// ❌ JSON.stringify və response.json() manual yazılmalıdır

