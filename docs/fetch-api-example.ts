// ============================================
// FETCH API İSTİFADƏSİ İLƏ NÜMUNƏ
// ============================================
// Bu fayl fetch API istifadə edərək backend ilə əlaqə qurmaq üçün nümunədir
// Native fetch API - heç bir əlavə paket lazım deyil

const API_URL = 'http://localhost:3000/todos';

export interface Todo {
  id: number;
  text: string;
}

// GET - Bütün todoları gətir
export const getAllTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  
  // Response status-u yoxla
  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.status}`);
  }
  
  // JSON-u parse et və qaytar
  return response.json();
};

// POST - Yeni todo yarat
export const createTodo = async (text: string): Promise<Todo> => {
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Backend-ə JSON göndərdiyimizi bildiririk
    },
    body: JSON.stringify({ text }), // JavaScript obyektini JSON string-ə çeviririk
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create todo: ${response.status}`);
  }
  
  return response.json();
};

// PUT - Todo-nu yenilə
export const updateTodo = async (id: number, text: string): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update todo: ${response.status}`);
  }
  
  return response.json();
};

// DELETE - Todo-nu sil
export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete todo: ${response.status}`);
  }
  
  // DELETE üçün body yoxdur, sadəcə status yoxlayırıq
};

// ============================================
// İSTİFADƏ NÜMUNƏSİ:
// ============================================
// import { getAllTodos, createTodo, updateTodo, deleteTodo } from './fetch-api-example';
//
// // Component-də istifadə:
// useEffect(() => {
//   const loadTodos = async () => {
//     try {
//       const todos = await getAllTodos();
//       setTodos(todos);
//     } catch (error) {
//       console.error('Error loading todos:', error);
//     }
//   };
//   loadTodos();
// }, []);

