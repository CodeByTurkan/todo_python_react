# 🔍 Backend-in İşlədiyini Necə Yoxlamaq

Backend-in işlədiyini yoxlamaq üçün bir neçə yol var.

---

## ✅ Yol 1: Browser-da Açmaq (Ən Asan)

### Step 1: Backend-i Başladın

```bash
cd backend
npm run start:dev
```

Backend başladıqdan sonra terminal-da belə mesaj görəcəksiniz:
```
[Nest] 12345  - 01/01/2024, 10:00:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 01/01/2024, 10:00:00 AM     LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345  - 01/01/2024, 10:00:00 AM     LOG [NestFactory] Nest application successfully started
```

### Step 2: Browser-da Açın

Browser-da bu URL-i açın:
```
http://localhost:3000/todos
```

### ✅ Nə Görməlisiniz:

**Əgər backend işləyirsə:**
- Boş array görəcəksiniz: `[]`
- Və ya JSON formatında data: `[{"id":123,"text":"test"}]`

**Əgər backend işləmir:**
- "This site can't be reached" error
- Və ya "ERR_CONNECTION_REFUSED" error

---

## ✅ Yol 2: Terminal-da curl İstifadə Etmək

### Windows üçün:

PowerShell və ya Command Prompt-da:

```bash
curl http://localhost:3000/todos
```

### Mac/Linux üçün:

Terminal-da:

```bash
curl http://localhost:3000/todos
```

### ✅ Nə Görməlisiniz:

**Əgər backend işləyirsə:**
```json
[]
```

**Əgər backend işləmir:**
```
curl: (7) Failed to connect to localhost port 3000: Connection refused
```

---

## ✅ Yol 3: Postman və ya Thunder Client (VS Code Extension)

### VS Code Thunder Client:

1. VS Code-da Extensions-a gedin
2. "Thunder Client" axtarın və quraşdırın
3. Thunder Client-i açın
4. Yeni request yaradın:
   - **Method:** GET
   - **URL:** `http://localhost:3000/todos`
5. "Send" düyməsinə basın

### ✅ Nə Görməlisiniz:

**Əgər backend işləyirsə:**
- Status: `200 OK`
- Body: `[]` (və ya data)

**Əgər backend işləmir:**
- Status: `ECONNREFUSED`
- Error mesajı

---

## 🧪 Bütün Endpoint-ləri Test Etmək

### 1. GET - Bütün Todoları Gətir

**Browser:**
```
http://localhost:3000/todos
```

**curl:**
```bash
curl http://localhost:3000/todos
```

**Gözlənilən cavab:**
```json
[]
```

---

### 2. POST - Yeni Todo Yarat

**curl:**
```bash
curl -X POST http://localhost:3000/todos/add \
  -H "Content-Type: application/json" \
  -d '{"text":"Test todo"}'
```

**Gözlənilən cavab:**
```json
{"id":1234567890,"text":"Test todo"}
```

**Browser-da test etmək üçün:**
Browser-da POST request göndərmək çətindir. Ona görə də:
- Postman/Thunder Client istifadə edin
- Və ya frontend-dən test edin

---

### 3. PUT - Todo Yenilə

**curl:**
```bash
curl -X PUT http://localhost:3000/todos/1234567890 \
  -H "Content-Type: application/json" \
  -d '{"text":"Updated todo"}'
```

**Gözlənilən cavab:**
```json
{"id":1234567890,"text":"Updated todo"}
```

---

### 4. DELETE - Todo Sil

**curl:**
```bash
curl -X DELETE http://localhost:3000/todos/1234567890
```

**Gözlənilən cavab:**
- Status: `200 OK`
- Body: boş

---

## 🐛 Problem Həlləri

### Problem 1: "Connection Refused" Error

**Səbəb:** Backend işləmir

**Həll:**
1. Terminal-da backend qovluğuna gedin:
   ```bash
   cd backend
   ```

2. Backend-i başladın:
   ```bash
   npm run start:dev
   ```

3. Terminal-da error yoxdursa, backend işləyir ✅

---

### Problem 2: Port 3000 İstifadə Olunur

**Səbəb:** Başqa bir proqram 3000 portunu istifadə edir

**Həll:**
1. Port-u dəyişin (`.env` faylında):
   ```env
   PORT=3001
   ```

2. Və ya o portu istifadə edən proqramı dayandırın

---

### Problem 3: CORS Error (Browser Console-da)

**Səbəb:** Backend CORS-a icazə vermir

**Həll:**
Backend `main.ts` faylında:
```typescript
app.enableCors(); // Bu sətir olmalıdır
```

---

## ✅ Checklist

Backend-in işlədiyini yoxlamaq üçün:

- [ ] Terminal-da backend başladılıb
- [ ] Terminal-da error yoxdur
- [ ] Browser-da `http://localhost:3000/todos` açılır
- [ ] JSON response gəlir (boş array `[]` və ya data)
- [ ] curl ilə test edilir və işləyir

---

## 🎯 Tez Test

Ən sürətli yol:

1. **Backend terminal-da işləyir?** ✅
2. **Browser-da aç:** `http://localhost:3000/todos`
3. **Boş array `[]` görürsən?** → Backend işləyir! ✅

---

**Uğurlar! 🚀**


