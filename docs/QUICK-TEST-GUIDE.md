# ⚡ Quick Test Guide - Backend Connection

## 🎯 What You Should Expect Now

### ✅ **When Everything Works:**

1. **Page loads** → Todos automatically fetch from backend
2. **Add todo** → Saves to backend, appears in list
3. **Edit todo** → Updates in backend, changes reflect
4. **Delete todo** → Removes from backend, disappears from list
5. **Refresh page** → Todos persist (stored in backend memory)

---

## 🧪 How to Test (3 Steps)

### Step 1: Start Backend
```bash
cd backend
npm run start:dev
```
**Expected:** Terminal shows "Nest application successfully started"

### Step 2: Start Frontend
```bash
cd frontend
npm run dev
```
**Expected:** Browser opens at `http://localhost:5173`

### Step 3: Test in Browser

#### ✅ **Test 1: Page Load**
- Open browser → `http://localhost:5173`
- **Expected:** Empty list or "No todos" message
- **Check:** Browser console (F12) - should see API call to `/todos`

#### ✅ **Test 2: Add Todo**
- Type "Buy milk" → Click "Add"
- **Expected:** Todo appears in list immediately
- **Check:** Browser Network tab (F12) - should see `POST /todos/add` with status 200

#### ✅ **Test 3: Edit Todo**
- Click "Edit" on a todo → Change text → OK
- **Expected:** Todo text updates
- **Check:** Network tab - should see `PUT /todos/:id` with status 200

#### ✅ **Test 4: Delete Todo**
- Click "Delete" on a todo
- **Expected:** Todo disappears
- **Check:** Network tab - should see `DELETE /todos/:id` with status 200

#### ✅ **Test 5: Persistence**
- Add a todo → Refresh page (F5)
- **Expected:** Todo still there (loaded from backend)
- **Note:** Backend uses in-memory storage, so todos reset when backend restarts

---

## 🔍 How to Verify Backend is Connected

### Method 1: Browser Network Tab (Easiest)
1. Open browser → F12 → Network tab
2. Perform any action (Add/Edit/Delete)
3. **Look for:**
   - Request to `http://localhost:3000/todos`
   - Status: `200 OK` ✅
   - Response: JSON data

### Method 2: Browser Console
1. F12 → Console tab
2. **Look for:**
   - No CORS errors ✅
   - No "Failed to fetch" errors ✅
   - API calls logged (if you added console.log)

### Method 3: Direct Backend Test
Open in browser: `http://localhost:3000/todos`
- **Expected:** `[]` or `[{...}]` (JSON array)
- **If error:** Backend not running

---

## 🚨 Common Issues & Quick Fixes

### ❌ **Problem: "Failed to fetch"**
**Fix:** Backend not running → Start it: `cd backend && npm run start:dev`

### ❌ **Problem: CORS Error**
**Fix:** Check `backend/src/main.ts` has `app.enableCors()`

### ❌ **Problem: Empty list after adding**
**Fix:** Check API URL in `getCrud.ts` → Should be `http://localhost:3000/todos`

### ❌ **Problem: Todos disappear on refresh**
**Normal:** Backend uses in-memory storage. To persist, need database.

---

## ✅ Success Checklist

- [ ] Backend terminal shows "successfully started"
- [ ] Frontend opens without errors
- [ ] Browser Network tab shows API calls
- [ ] Add todo works → appears in list
- [ ] Edit todo works → text updates
- [ ] Delete todo works → disappears
- [ ] Refresh page → todos still there

---

## 🎯 What Success Looks Like

**Visual:**
- Page loads smoothly
- Todos appear/disappear instantly
- No error messages
- Loading states work (if implemented)

**Technical:**
- Network requests: `200 OK`
- Console: No errors
- Data flows: Frontend ↔ Backend

---

**That's it! If all tests pass → Your backend is connected! 🎉**

