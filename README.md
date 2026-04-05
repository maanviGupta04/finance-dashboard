# Finance Dashboard UI

A simple and interactive Finance Dashboard built using HTML, CSS, and JavaScript.  
This project allows users to track financial activity, view transactions, and understand spending patterns through visualizations.

---

## Features

### 1. Dashboard Overview
- Displays **Total Balance, Income, and Expenses**
- Automatically updates based on transaction data

### 2. Transactions Section
- View all transactions with:
  - Date
  - Category
  - Amount
- Includes:
  - Search by category
  - Filter by income/expense

### 3. Role-Based UI (Frontend Simulation)
- Viewer → Can only view data
- Admin → Can access "Add Transaction" button

### 4. Charts
- Line Chart → Shows transaction trends
- Pie Chart → Shows category distribution

### 5. Insights
- Displays:
  - Highest spending category

### 6. Enhancements
- Dark mode toggle for better user experience
- Smooth UI transitions for improved interaction
- Charts dynamically update based on theme

---

## Tech Stack
- HTML
- CSS
- JavaScript
- Chart.js (for data visualization)

---

## Approach

- Used a global state object to manage:
  - Transactions
  - Filters
  - Search input
  - User role

- Created separate functions for:
  - Rendering dashboard cards
  - Rendering transactions
  - Generating insights
  - Displaying charts

- The UI updates dynamically whenever the state changes.

---

## Evaluation Criteria Coverage

### Design and Creativity
Clean and minimal UI with clearly separated sections for better readability.

### Responsiveness
Flexbox and responsive layout ensure adaptability across screen sizes.

### Functionality
- Financial summary (balance, income, expenses)
- Transaction listing with filtering and search
- Role-based UI behavior
- Data visualization using charts

### User Experience
- Simple and intuitive layout
- Easy navigation
- Interactive filtering and search
- Smooth transitions and dark mode

### Technical Quality
- Modular code structure
- Separate functions for each feature
- Clean and maintainable logic

---

## Notes
- This project uses mock/static data, which can be modified in `script.js`.
- The Add Transaction feature is simulated for demonstration purposes.


