# SpendWise - Expense Tracker App

A full-stack expense tracking application built with React, Node.js, Express, and MongoDB. Track your expenses, manage budgets, and visualize your spending with interactive charts.

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login with JWT tokens
- 💸 **Expense Management** - Add, edit, and delete expenses with categories
- 📊 **Budget Tracking** - Set and monitor budgets by category
- 📈 **Data Visualization** - Interactive charts showing spending patterns
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔒 **Protected Routes** - Secure API endpoints with authentication middleware

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ParthaPratimBorah/Expense_Tracker-app.git
cd expenseAPP
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend_backup
npm install
```

## ⚙️ Environment Setup

### Backend Configuration

Create a `.env` file in the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
PORT=5001
```

**MongoDB Connection String Examples:**
- **Local MongoDB**: `mongodb://localhost:27017/expenseapp`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/expenseapp`

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🏃 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

**Expected Output:**
```
MongoDB Connected: 127.0.0.1
Server started on port 5001
```

### Start Frontend Server

Open a **new terminal** and run:

```bash
cd frontend_backup
npm run dev
```

**Expected Output:**
```
VITE v6.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Access the Application

Open your browser and navigate to:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5001/api`

## 🗄️ Checking the Database

### MongoDB Compass (Recommended)

1. Download and install [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your `MONGO_URI` from the `.env` file
3. Browse collections: `users`, `expenses`, `budgets`


## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Expenses

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/expenses` | Get all expenses | Yes |
| POST | `/api/expenses` | Create expense | Yes |
| PUT | `/api/expenses/:id` | Update expense | Yes |
| DELETE | `/api/expenses/:id` | Delete expense | Yes |

**Create Expense Request:**
```json
{
  "title": "Groceries",
  "amount": 150.50,
  "category": "Food",
  "date": "2024-01-15"
}
```

### Budgets

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/budgets` | Get all budgets | Yes |
| POST | `/api/budgets` | Create budget | Yes |
| PUT | `/api/budgets/:id` | Update budget | Yes |
| DELETE | `/api/budgets/:id` | Delete budget | Yes |

**Create Budget Request:**
```json
{
  "category": "Food",
  "limit": 500
}
```

## 📁 Project Structure

```
expenseAPP/
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── expenseController.js
│   │   └── budgetController.js
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT authentication
│   ├── models/
│   │   ├── User.js
│   │   ├── Expense.js
│   │   └── Budget.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── budgetRoutes.js
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env                    # Environment variables
│
└── frontend_backup/
    ├── src/
    │   ├── api/                # API calls
    │   ├── components/         # React components
    │   ├── pages/              # Page components
    │   ├── hooks/              # Custom hooks
    │   ├── providers/          # Context providers
    │   ├── routes/             # Route configuration
    │   └── types/              # TypeScript types
    ├── package.json
    └── vite.config.js
```

## 🧪 Testing the Connection

### Quick Backend Test

```bash
# Test if backend is running
curl http://localhost:5001/api/auth/login
```

### Test Registration

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Test Login

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

## 👤 Author

Partha Pratim Borah

## 🙏 Acknowledgments

- Built with React, Express, and MongoDB
- UI components styled with Tailwind CSS
- Charts powered by Recharts

---

**Happy Expense Tracking! 💰📊**
