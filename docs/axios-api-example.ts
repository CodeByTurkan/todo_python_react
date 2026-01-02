// ============================================
// AXIOS İSTİFADƏSİ İLƏ NÜMUNƏ
// ============================================
// Bu fayl axios istifadə edərək backend ilə əlaqə qurmaq üçün nümunədir
// 
// QUraşdırmaq üçün:
// npm install axios
// 
// Axios - daha təmiz syntax və daha yaxşı error handling təmin edir

import axios from 'axios';

const API_URL = 'http://localhost:3000/todos';

// Axios instance yaradırıq (opsional, amma tövsiyə olunur)
// Bu sayədə base URL və headers-i bir dəfə təyin edirik
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 saniyədən çox gecikmə olarsa error atır
});

export interface Todo {
  id: number;
  text: string;
}

// GET - Bütün todoları gətir
export const getAllTodos = async (): Promise<Todo[]> => {
  // Axios avtomatik olaraq response.data-da JSON-u qaytarır
  const response = await api.get<Todo[]>('/todos');
  return response.data;
  
  // Qısa versiya:
  // return (await api.get<Todo[]>('/todos')).data;
};

// POST - Yeni todo yarat
export const createTodo = async (text: string): Promise<Todo> => {
  // Axios avtomatik olaraq obyekti JSON-a çevirir
  // Headers-i də avtomatik təyin edir
  const response = await api.post<Todo>('/todos/add', { text });
  return response.data;
};

// PUT - Todo-nu yenilə
export const updateTodo = async (id: number, text: string): Promise<Todo> => {
  const response = await api.put<Todo>(`/todos/${id}`, { text });
  return response.data;
};

// DELETE - Todo-nu sil
export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
  // DELETE üçün response.data lazım deyil
};

// ============================================
// AXIOS ERROR HANDLING NÜMUNƏSİ:
// ============================================
// Axios error handling daha detallıdır:

// try {
//   await getAllTodos();
// } catch (error) {
//   if (axios.isAxiosError(error)) {
//     // Axios error
//     console.error('Error message:', error.message);
//     console.error('Status code:', error.response?.status);
//     console.error('Response data:', error.response?.data);
//   } else {
//     // Başqa error
//     console.error('Unexpected error:', error);
//   }
// }

// ============================================
// AXIOS INTERCEPTORS (Opsional):
// ============================================
// Request interceptor - hər request-dən əvvəl işləyir
// api.interceptors.request.use(
//   (config) => {
//     // Məsələn, token əlavə et
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response interceptor - hər response-dan sonra işləyir
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Məsələn, 401 error olarsa login səhifəsinə yönləndir
//     if (error.response?.status === 401) {
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// ============================================
// İSTİFADƏ NÜMUNƏSİ:
// ============================================
// import { getAllTodos, createTodo, updateTodo, deleteTodo } from './axios-api-example';
//
// // Component-də istifadə (fetch ilə eynidir):
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

