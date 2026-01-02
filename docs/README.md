# Backend-Frontend Əlaqəsi - Nümunələr

Bu qovluqda backend ilə frontend arasında əlaqə qurmaq üçün müxtəlif üsulların nümunələri var.

## 🚀 Başlamaq Üçün

**Yeni başlayırsınızsa, əvvəlcə bu fayla baxın:**
- **[INTEGRATION-GUIDE.md](./INTEGRATION-GUIDE.md)** - Step-by-step inteqrasiya təlimatı

Bu guide sizə backend ilə frontend-i necə birləşdirməyi ətraflı izah edir.

## 📁 Fayllar

### 1. `fetch-api-example.ts`
- Native `fetch` API istifadə edərək API funksiyaları
- Heç bir əlavə paket lazım deyil
- Browser-da built-in olaraq mövcuddur

### 2. `fetch-app-example.tsx`
- `fetch` API istifadə edərək React component nümunəsi
- useState və useEffect ilə state idarəetməsi

### 3. `axios-api-example.ts`
- Axios istifadə edərək API funksiyaları
- Daha təmiz syntax və yaxşı error handling
- Interceptors nümunələri daxildir

### 4. `axios-app-example.tsx`
- Axios istifadə edərək React component nümunəsi
- Axios error handling ilə

### 5. `INTEGRATION-GUIDE.md` ⭐ **YENİ**
- Step-by-step inteqrasiya təlimatı
- Hər addımın izahı
- Problem həlləri
- Test etmək üçün checklist

## 🔄 Fetch vs Axios Müqayisəsi

### Fetch API
```typescript
// GET request
const response = await fetch(API_URL);
const data = await response.json();

// POST request
const response = await fetch(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text })
});
const data = await response.json();
```

### Axios
```typescript
// GET request
const response = await axios.get(API_URL);
const data = response.data; // Avtomatik parse olunur

// POST request
const response = await axios.post(API_URL, { text });
const data = response.data; // Avtomatik parse olunur
```

## 📊 Xüsusiyyət Müqayisəsi

| Xüsusiyyət | Fetch API | Axios |
|------------|-----------|-------|
| Paket ölçüsü | 0 KB (built-in) | ~13 KB |
| JSON parsing | Manual (`response.json()`) | Avtomatik |
| Error handling | Manual | Daha yaxşı |
| Interceptors | ❌ | ✅ |
| Request cancellation | AbortController | ✅ |
| Timeout | Manual | ✅ |
| Browser support | Modern browsers | Bütün browsers |

## 🚀 Quraşdırma

### Fetch API üçün
Heç bir quraşdırma lazım deyil - browser-da built-in-dir.

### Axios üçün
```bash
cd frontend
npm install axios
```

## 💡 Hansını Seçməli?

### Fetch API seçin, əgər:
- ✅ Kiçik layihədir
- ✅ Əlavə dependency istəmirsiniz
- ✅ Modern browser support kifayətdir
- ✅ Sadə request-lər lazımdır

### Axios seçin, əgər:
- ✅ Daha təmiz kod istəyirsiniz
- ✅ Interceptors lazımdır (token əlavə etmək, error handling)
- ✅ Request cancellation lazımdır
- ✅ Daha yaxşı error handling istəyirsiniz
- ✅ Production layihəsidir

## 📝 İstifadə

Bu nümunələri öz kodunuzda istifadə etmək üçün:

1. İstədiyiniz nümunəni açın
2. API funksiyalarını öz `api` qovluğunuza kopyalayın
3. Component nümunəsindən istifadə edərək öz component-inizi yazın
4. Backend-in işlədiyindən əmin olun (`http://localhost:3000`)

## 🔗 Backend Endpoints

Backend-də mövcud olan endpoint-lər:

- `GET /todos` - Bütün todoları gətir
- `POST /todos/add` - Yeni todo yarat
- `PUT /todos/:id` - Todo-nu yenilə
- `DELETE /todos/:id` - Todo-nu sil

## ⚠️ Qeydlər

- Backend `http://localhost:3000` ünvanında işləməlidir
- CORS backend-də aktivdir (`app.enableCors()`)
- Bütün nümunələr TypeScript ilə yazılıb
- Error handling hər iki üsulda nümunə olaraq göstərilmişdir

