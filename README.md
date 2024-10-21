
---

# BudgetMate

**BudgetMate** is a simple and user-friendly web application that helps users manage their personal budgets and track expenses. The app allows users to create budgets, add expenses, and monitor their spending in a structured and efficient way.

## Features

- **User Authentication**: Secure login and registration system using JWT.
- **Create Budgets**: Users can create budgets for various categories or goals.
- **Track Expenses**: Add and manage expenses within each budget.
- **Real-Time Budget Overview**: View the total budget, used amount, and available amount for each budget.
- **Responsive Design**: Works across different devices, including desktops, tablets, and smartphones.

## Tech Stack

- **Frontend**: React.js, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **API**: Axios for HTTP requests
- **Styling**: Custom CSS

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/CodeMaverick2/BudgetMate.git
    cd budgetmate
    ```

2. Install server dependencies:
    ```bash
    cd server
    npm install
    ```

3. Install client dependencies:
    ```bash
    cd ../client
    npm install
    ```

4. Create a `.env` file in the `server` directory and add your environment variables:

    ```
    PORT=4000
    DATABASE_URL=mongodb://localhost:27017/budgetmate
    secret_key_jwt=your_jwt_secret_key
    ```

5. Start MongoDB (if not already running):
    ```bash
    mongod
    ```

6. Run the server and client:

    - Start the backend server:
      ```bash
      cd server
      npm run dev
      ```

    - Start the frontend client:
      ```bash
      cd ../client
      npm start
      ```

7. Open your browser and go to `http://localhost:3000` to start using the app.

## API Endpoints

### Authentication

- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login and receive a token

### Budgets

- `GET /budget` – Get all budgets for the logged-in user
- `POST /budget/create` – Create a new budget
- `DELETE /budget/:id` – Delete a budget by ID

### Expenses

- `GET /budget/:id/expenses` – Get all expenses for a specific budget
- `POST /budget/:id/expenses` – Add a new expense to a budget

## Project Structure

```
budgetmate/
│
├── server/                # Backend (Node.js + Express)
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── controllers/       # Controllers for API logic
│   ├── config/            # Database configuration
│   ├── middleware/        # Authentication middleware
│   └── server.js          # Entry point for the server
│
├── client/                # Frontend (React)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── calls/         # API calls
│   │   └── App.js         # Main app component
│   └── public/            # Static files
│
├── .env                   # Environment variables
├── README.md              # Project documentation
└── package.json           # Dependencies and scripts
```

---
