export type Todo = {
  id: number;
  text: string;
};
// “Backend-dən gələn data bu formada OLMALIDIR” - type part backennde gelen sorgulari qebul edirik. ele bil flow bele gedir. Biz frontednden gonderirik backend onu dto ile tutmalidir (1 check) sonra backend gonderir front onu api hisseden tutmalidir (2 check)
// Ümumi flow
// Frontend → Backend DTO → Business logic → Backend response DTO
// → Frontend API layer → UI
// Yəni:
// Frontend → Backend
// → Backend DTO ilə validate edir ✅
// Backend → Frontend
// → Frontend type ilə qəbul edir ✅

// API URL - .env-dən götür, yoxdursa default istifadə et
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/todos';

export const getAllTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("failed to response");
  }

  return response.json();
};
// native fetch de biz .env yazriiq VITE ile url sonra onu deyisene beraber edib, funksiya icinde CRUD opeators ile yaziriq.

export const createTodo = async (text: string): Promise<Todo> => {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error("adding response from BE has problem");
  }
  return response.json();
};

export const updateTodo = async (id: number, text: string): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({text }), //biz backende tekce text gonderirik, i system date ile generate edir
  });
  if (!response.ok) {
    throw new Error("updating from BE has problem");
  }
  return response.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE", //delete edende ise hecne gonermirik, ona gore body yoxdu.
  });
  if (!response.ok) {
    throw new Error("deleting from BE has problem");
  }
};