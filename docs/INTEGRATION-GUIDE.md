# 🔗 Backend-Frontend İnteqrasiya Təlimatı

Bu guide sizə backend ilə frontend-i necə birləşdirməyi step-by-step göstərir.

---

## 📋 Məzmun

1. [Əvvəlcə Yoxlama](#1-əvvəlcə-yoxlama)
2. [API Funksiyaları Yaratmaq](#2-api-funksiyaları-yaratmaq)
3. [Component-də İstifadə](#3-component-də-istifadə)
4. [Test Etmək](#4-test-etmək)
5. [Problem Həlləri](#5-problem-həlləri)

---

## 1. Əvvəlcə Yoxlama

### ✅ Backend-i Yoxlayın

1. Backend qovluğuna gedin:
   ```bash
   cd backend
   ```

2. Backend-in işlədiyindən əmin olun:
   ```bash
   npm run start:dev
   ```

3. Backend-in işlədiyini yoxlayın:
   - Browser-da açın: `http://localhost:3000/todos`
   - Boş array `[]` görsə, backend işləyir ✅
   - Error görsə, backend-i yenidən başladın

### ✅ Frontend-i Yoxlayın

1. Frontend qovluğuna gedin:
   ```bash
   cd frontend
   ```

2. Frontend-in işlədiyindən əmin olun:
   ```bash
   npm run dev
   ```

3. Frontend-in işlədiyini yoxlayın:
   - Browser-da açın: `http://localhost:5173` (və ya göstərilən port)
   - Frontend səhifəsi açılmalıdır ✅

--- 

## 2. API Funksiyaları Yaratmaq

### 📁 Fayl Strukturu

```
frontend/
  └── src/
      └── api/
          └── getCrud.ts  ← Bu faylı yaradacağıq
```

### 📝 Step 1: API Faylını Yaradın

`frontend/src/api/getCrud.ts` faylını yaradın:

```typescript
// API base URL-i təyin edin
const API_URL = 'http://localhost:3000/todos';

// Todo interface-i (backend-dən gələn data strukturuna uyğun)
export interface Todo {
  id: number;
  text: string;
}
```

### 📝 Step 2: GET Funksiyası (Bütün Todoları Gətir)

```typescript
// GET - Bütün todoları gətir
export const getAllTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  
  // Error yoxla
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  
  // JSON-u parse et və qaytar
  return response.json();
};
```

**İzah:**
- `fetch(API_URL)` - GET request göndərir
- `response.ok` - Status 200-299 arasıdırsa `true`
- `response.json()` - Response-u JavaScript obyektinə çevirir

### 📝 Step 3: POST Funksiyası (Yeni Todo Yarat)

```typescript
// POST - Yeni todo yarat
export const createTodo = async (text: string): Promise<Todo> => {
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Backend-ə JSON göndərdiyimizi bildiririk
    }, w
    body: JSON.stringify({ text }), // JavaScript obyektini JSON string-ə çeviririk
  });
  
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  
  return response.json();
};
```

**İzah:**
- `method: 'POST'` - POST request göndərir
- `headers` - Backend-ə məlumat formatını bildirir
- `body: JSON.stringify({ text })` - Data-nı JSON formatına çevirir

### 📝 Step 4: PUT Funksiyası (Todo Yenilə)

```typescript
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
    throw new Error('Failed to update todo');
  }
  
  return response.json();
};
```

**İzah:**
- `${API_URL}/${id}` - URL-də ID parametri (məsələn: `/todos/123`)
- `method: 'PUT'` - PUT request göndərir

### 📝 Step 5: DELETE Funksiyası (Todo Sil)

```typescript
// DELETE - Todo-nu sil
export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  
  // DELETE üçün body yoxdur
};
```

**İzah:**
- `method: 'DELETE'` - DELETE request göndərir
- Body lazım deyil, sadəcə ID URL-də göndərilir

### ✅ Tam API Faylı

```typescript
const API_URL = 'http://localhost:3000/todos';

export interface Todo {
  id: number;
  text: string;
}

export const getAllTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

export const createTodo = async (text: string): Promise<Todo> => {
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  return response.json();
};

export const updateTodo = async (id: number, text: string): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
};
```

---

## 3. Component-də İstifadə

### 📝 Step 1: Import-ları Əlavə Edin

`App.tsx` (və ya component faylınız) faylının yuxarısına:

```typescript
import { useState, useEffect } from "react";
import { getAllTodos, createTodo, updateTodo, deleteTodo, Todo } from "./api/getCrud";
```

### 📝 Step 2: State-ləri Təyin Edin

```typescript
export function ToDo() {
  // Todoları saxlamaq üçün
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // Input field üçün
  const [input, setInput] = useState("");
  
  // Loading state (request gözləyir)
  const [loading, setLoading] = useState(false);
  
  // Error state (xəta baş verərsə)
  const [error, setError] = useState<string | null>(null);
  
  // ... component kodları
}
```

### 📝 Step 3: Component Mount Olduqda Todoları Yükləyin

```typescript
// Component mount olduqda (səhifə açılanda) todoları yüklə
useEffect(() => {
  const fetchTodos = async () => {
    try {
      setLoading(true); // Loading başladı
      setError(null); // Error-u təmizlə
      
      const data = await getAllTodos(); // API-dən todoları gətir
      setTodos(data); // State-ə yaz
      
    } catch (err) {
      // Xəta baş verərsə
      setError("Failed to load todos. Make sure the backend is running on http://localhost:3000");
      console.error(err);
    } finally {
      setLoading(false); // Loading bitdi
    }
  };
  
  fetchTodos(); // Funksiyanı çağır
}, []); // Boş array = yalnız bir dəfə işlə (component mount olduqda)
```

**İzah:**
- `useEffect` - Component mount olduqda işləyir
- `async/await` - Asinxron funksiyalar üçün
- `try/catch` - Error handling üçün
- `[]` - Dependency array (boş = yalnız bir dəfə)

### 📝 Step 4: Add (Əlavə Et) Funksiyası

```typescript
const handleAdd = async () => {
  // Boş input-u yoxla
  if (!input.trim()) return;
  
  try {
    setLoading(true);
    setError(null);
    
    // API-yə yeni todo göndər
    const newTodo = await createTodo(input);
    
    // State-ə yeni todo-nu əlavə et
    setTodos([...todos, newTodo]);
    
    // Input-u təmizlə
    setInput("");
    
  } catch (err) {
    setError("Failed to add todo");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

**İzah:**
- `createTodo(input)` - API-yə POST request göndərir
- `[...todos, newTodo]` - Köhnə todolar + yeni todo
- `setInput("")` - Input field-i təmizləyir

### 📝 Step 5: Delete (Sil) Funksiyası

```typescript
const handleDelete = async (id: number) => {
  try {
    setLoading(true);
    setError(null);
    
    // API-yə DELETE request göndər
    await deleteTodo(id);
    
    // State-dən todo-nu sil (filter ilə)
    setTodos(todos.filter((item) => item.id !== id));
    
  } catch (err) {
    setError("Failed to delete todo");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

**İzah:**
- `deleteTodo(id)` - API-yə DELETE request göndərir
- `todos.filter()` - ID-yə görə todo-nu silir

### 📝 Step 6: Edit (Redaktə Et) Funksiyası

```typescript
const handleEdit = async (id: number) => {
  // Prompt ilə yeni mətn al
  const newText = prompt("Edit todo: ");
  
  // Boş mətn yoxla
  if (!newText || !newText.trim()) return;
  
  try {
    setLoading(true);
    setError(null);
    
    // API-yə PUT request göndər
    const updatedTodo = await updateTodo(id, newText);
    
    // State-də todo-nu yenilə
    setTodos(
      todos.map((item) => 
        item.id === id ? updatedTodo : item
      )
    );
    
  } catch (err) {
    setError("Failed to update todo");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

**İzah:**
- `updateTodo(id, newText)` - API-yə PUT request göndərir
- `todos.map()` - ID-yə görə todo-nu tapıb yeniləyir

### 📝 Step 7: UI-da İstifadə

```typescript
return (
  <div>
    {/* Error mesajı */}
    {error && (
      <div className="error">{error}</div>
    )}
    
    {/* Input və Add button */}
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
    
    {/* Todolar siyahısı */}
    {loading && todos.length === 0 ? (
      <div>Loading todos...</div>
    ) : (
      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            <span>{item.text}</span>
            <button onClick={() => handleEdit(item.id)}>
              Edit
            </button>
            <button onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);
```

---

## 4. Test Etmək

### ✅ Step 1: Backend-i Başladın

```bash
cd backend
npm run start:dev
```

Backend `http://localhost:3000` ünvanında işləməlidir.

### ✅ Step 2: Frontend-i Başladın

```bash
cd frontend
npm run dev
```

Frontend `http://localhost:5173` (və ya başqa port) ünvanında işləməlidir.

### ✅ Step 3: Browser-da Test Edin

1. Frontend səhifəsini açın
2. Todolar avtomatik yüklənməlidir (əgər backend-də varsa)
3. Yeni todo əlavə edin - işləməlidir ✅
4. Todo redaktə edin - işləməlidir ✅
5. Todo silin - işləməlidir ✅

### ✅ Step 4: Browser Console-u Yoxlayın

1. Browser-da `F12` basın (Developer Tools)
2. Console tab-ına keçin
3. Error-lar görsə, onları yoxlayın

### ✅ Step 5: Network Tab-ı Yoxlayın

1. Developer Tools-da Network tab-ına keçin
2. Bir əməliyyat edin (məsələn, todo əlavə edin)
3. Request-ləri yoxlayın:
   - URL düzgündürmü?
   - Method düzgündürmü? (GET, POST, PUT, DELETE)
   - Status code nədir? (200 = uğurlu)

---

## 5. Problem Həlləri

### ❌ Problem 1: "Failed to fetch" Error

**Səbəb:** Backend işləmir və ya CORS problemi

**Həll:**
1. Backend-in işlədiyindən əmin olun
2. Backend-də CORS aktivdir? (`app.enableCors()`)
3. URL düzgündürmü? (`http://localhost:3000`)

### ❌ Problem 2: "404 Not Found" Error

**Səbəb:** URL yanlışdır və ya endpoint mövcud deyil

**Həll:**
1. Backend controller-də endpoint-ləri yoxlayın:
   - `GET /todos` ✅
   - `POST /todos/add` ✅
   - `PUT /todos/:id` ✅
   - `DELETE /todos/:id` ✅
2. API_URL düzgündürmü? (`http://localhost:3000/todos`)

### ❌ Problem 3: "CORS Error"

**Səbəb:** Backend CORS-a icazə vermir

**Həll:**
Backend `main.ts` faylında:
```typescript
app.enableCors(); // Bu sətir olmalıdır
```

### ❌ Problem 4: Data Gəlmir

**Səbəb:** Response formatı yanlışdır

**Həll:**
1. Browser Network tab-da response-u yoxlayın
2. Backend-dən nə qayıdır? (JSON formatında olmalıdır)
3. `response.json()` düzgün işləyirmi?

### ❌ Problem 5: TypeScript Error-ları

**Səbəb:** Type-lar uyğun deyil

**Həll:**
1. `Todo` interface-i backend response-a uyğundurmu?
2. Type-ları yoxlayın:
   ```typescript
   interface Todo {
     id: number;
     text: string;
   }
   ```

---

## 📊 Checklist

İnteqrasiyanı tamamladıqdan sonra yoxlayın:

- [ ] Backend işləyir (`http://localhost:3000`)
- [ ] Frontend işləyir (`http://localhost:5173`)
- [ ] API funksiyaları yaradılıb (`getCrud.ts`)
- [ ] Component-də import-lar var
- [ ] `useEffect` ilə todolar yüklənir
- [ ] Add funksiyası işləyir
- [ ] Edit funksiyası işləyir
- [ ] Delete funksiyası işləyir
- [ ] Loading state işləyir
- [ ] Error handling işləyir
- [ ] Browser console-da error yoxdur
- [ ] Network request-lər uğurludur (200 status)

---

## 🎯 Növbəti Addımlar

İnteqrasiya tamamlandıqdan sonra:

1. **Axios-a keçmək istəsəniz:**
   - `docs/axios-api-example.ts` faylına baxın
   - `npm install axios` edin
   - API funksiyalarını axios ilə yenidən yazın

2. **React Query istifadə etmək istəsəniz:**
   - `npm install @tanstack/react-query` edin
   - `useQuery` və `useMutation` hook-larını istifadə edin

3. **Error handling-i təkmilləşdirmək:**
   - Daha detallı error mesajları
   - Retry mexanizmi
   - Toast notifications

---

## 📚 Əlavə Resurslar

- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React useEffect Hook](https://react.dev/reference/react/useEffect)
- [Async/Await Guide](https://javascript.info/async-await)

---

**Uğurlar! 🚀**

