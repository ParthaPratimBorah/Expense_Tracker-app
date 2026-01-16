# Testing Guide: Backend & Frontend Connection

## Quick Start Checklist

### 1. **Start the Backend Server**

Open a terminal and run:
```bash
cd backend
npm run dev
```

**Expected Output:**
- `MongoDB Connected: [your connection host]`
- `Server started on port 5000`

**If you see errors:**
- Make sure you have a `.env` file in the `backend` folder with:
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key_here
  PORT=5000
  ```

### 2. **Start the Frontend Server**

Open a **new terminal** and run:
```bash
cd frontend_backup
npm run dev
```

**Expected Output:**
- Vite dev server running (usually on `http://localhost:5173`)

### 3. **Test the Connection**

#### Method 1: Browser Testing (Recommended)
1. Open your browser and go to the frontend URL (usually `http://localhost:5173`)
2. Open **Developer Tools** (F12 or Right-click → Inspect)
3. Go to the **Console** tab
4. Go to the **Network** tab
5. Try to register a new user or login
6. Check for:
   - ✅ **No CORS errors** in console
   - ✅ **200/201 status codes** in Network tab
   - ✅ **Successful API responses**

#### Method 2: Test API Endpoints Directly

**Test Backend Health:**
```bash
# In a new terminal, test if backend is running
curl http://localhost:5000/api/auth/login
# Should return an error (expected - no credentials), but confirms server is running
```

**Test Registration:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

**Expected Response:**
```json
{
  "_id": "...",
  "name": "Test User",
  "email": "test@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 4. **Common Issues & Solutions**

#### ❌ **CORS Error**
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:** 
- Make sure backend has `app.use(cors())` in `server.js` ✅ (Already configured)
- Check that backend is running on port 5000

#### ❌ **Connection Refused**
**Error:** `ERR_CONNECTION_REFUSED` or `Network Error`

**Solution:**
- Verify backend server is running: `http://localhost:5000`
- Check if port 5000 is already in use
- Verify frontend axios.ts uses `http://localhost:5000/api` ✅ (Already fixed)

#### ❌ **401 Unauthorized**
**Error:** `Not authorized, no token` or `Not authorized, token failed`

**Solution:**
- Make sure you're logged in
- Check if token is stored in localStorage
- Verify JWT_SECRET is set in backend `.env`

#### ❌ **500 Server Error**
**Error:** `Server Error` or `MongoDB connection error`

**Solution:**
- Check MongoDB connection string in `.env`
- Verify MongoDB is running (if local) or connection string is correct
- Check backend console for detailed error messages

### 5. **Step-by-Step Testing Flow**

1. **Start Backend** → Should see "Server started on port 5000"
2. **Start Frontend** → Should see Vite dev server URL
3. **Open Browser** → Navigate to frontend URL
4. **Open DevTools** → F12 → Network tab
5. **Register New User:**
   - Fill registration form
   - Submit
   - Check Network tab for POST to `/api/auth/register`
   - Should see 201 status code
   - Should redirect to dashboard
6. **Login:**
   - Logout if logged in
   - Fill login form
   - Submit
   - Check Network tab for POST to `/api/auth/login`
   - Should see 200 status code
   - Should redirect to dashboard
7. **Test Protected Routes:**
   - Try to add an expense
   - Try to add a budget
   - Check Network tab for requests to `/api/expenses` or `/api/budgets`
   - Should see 200/201 status codes

### 6. **Browser Console Checks**

Open Browser DevTools → Console tab and look for:

✅ **Good Signs:**
- No red error messages
- API calls showing successful responses
- Token stored in localStorage (check Application tab → Local Storage)

❌ **Bad Signs:**
- Red CORS errors
- Network errors
- 401/403/500 status codes
- "Failed to fetch" errors

### 7. **Network Tab Checks**

Open Browser DevTools → Network tab:

✅ **Good Signs:**
- Requests to `http://localhost:5000/api/*` showing 200/201 status
- Response data visible when clicking on requests
- Headers include `Authorization: Bearer [token]` for protected routes

❌ **Bad Signs:**
- Requests showing (failed) or red status
- CORS errors in response headers
- 404 Not Found (wrong endpoint)
- 401 Unauthorized (token issues)

## Quick Test Commands

```bash
# Test if backend is running
curl http://localhost:5000/api/auth/login

# Test registration (replace with your data)
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Test login (use token from registration)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

## Success Indicators

✅ Backend server running on port 5000
✅ Frontend server running (usually port 5173)
✅ No CORS errors in browser console
✅ API requests showing 200/201 status codes
✅ User can register and login
✅ Protected routes work (expenses, budgets)
✅ Data persists (MongoDB connection working)
