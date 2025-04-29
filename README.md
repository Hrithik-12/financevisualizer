# 📊 Personal Finance Visualizer

A minimalist personal finance tracker built with **Next.js 14**, **Tailwind CSS**, and **MongoDB**.  
Easily track your income and expenses with clean charts, transaction history, and budgeting tools.

---

## 🚀 Project Stages

### **Stage 1: Basic Transaction Tracking**
- Add, Edit, and Delete transactions (amount, date, description)
- View transaction list
- Display a monthly expenses bar chart
- Basic form validation to ensure all fields are filled properly

---

### **Stage 2: Categories**
- All Stage 1 features, plus:
  - Predefined categories for transactions (e.g., Food, Rent, Salary, etc.)
  - Category-wise spending breakdown with an interactive **Pie Chart**
  - Dashboard with **summary cards**:
    - Total expenses
    - Category breakdown
    - Most recent transactions

---

### **Stage 3: Budgeting**
- All Stage 2 features, plus:
  - Set monthly category budgets
  - Budget vs actual comparison chart to track spending vs allocated budget
  - Simple spending insights to highlight trends or unusual spending patterns

---

## ✨ Features

This application includes all features from Stages 1–3:

- **Transaction Management**
  - Add, edit, and delete transactions with amount, date, description, and category.
  - Transaction list view with edit/delete functionality.
- **Charts & Visualization**
  - **Monthly Expenses Bar Chart** shows total spend per month.
  - **Category Pie Chart** displays spending distribution by category.
  - **Budget vs Actual Chart** compares budgeted vs actual spending per category.
- **Dashboard**
  - Summary cards for:
    - Total expenses (current month).
    - Most recent transactions.
    - Category breakdown overview.
- **Budgeting Tools**
  - Set and update monthly budgets per category.
  - Visualize budget adherence with comparison charts.
  - Automated spending insights (warnings for overruns, daily average, highest category, etc.).
- **UX & Utilities**
  - Responsive layout and dynamic resizing for mobile and desktop.
  - Form validation to prevent invalid entries.
  - Toast notifications for success/error feedback.
  - Clean, minimalist design using Tailwind CSS.
  - Real-time data fetching from MongoDB via Next.js API routes.

---

## 🚀 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Recharts
- **Backend:** API Routes (Next.js App Router) + MongoDB (Mongoose)
- **Animations:** Framer Motion
- **Notifications:** React Hot Toast
- **UI Components:** Custom cards, forms, and charts

---

## 📦 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root with your MongoDB URI:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   App will be running at: [http://localhost:3000](http://localhost:3000)

---

## 📸 Screenshots
**Stage 2 Images**
<img width="1470" alt="Dashboard Overview" src="https://github.com/user-attachments/assets/616d8714-7ae0-4ac5-9f14-a8f076ad3c5b" />
<img width="1470" alt="Monthly Chart" src="https://github.com/user-attachments/assets/5f93c130-3f6a-43b6-bba3-d8d1af2e6370" />
<img width="1470" alt="Pie Chart" src="https://github.com/user-attachments/assets/01b1a959-d303-4500-a36d-1715a64fabb3" />

**Stage 3 images**
<img width="1470" alt="Screenshot 2025-04-29 at 11 20 10 AM" src="https://github.com/user-attachments/assets/4c9d98ee-3125-47bc-8f54-e4b227aedb99" />
<img width="1470" alt="Screenshot 2025-04-29 at 11 20 28 AM" src="https://github.com/user-attachments/assets/6a4ea55a-9bc0-45e1-ad19-da606263a8d6" /><img width="1470" alt="Screenshot 2025-04-29 at 11 20 43 AM" src="https://github.com/user-attachments/assets/6fcbb541-1c12-4d43-a7cf-40dc974ef9cf" />

---

## 📈 Future Improvements

- Add transaction type indicators (income vs expense) with color coding.
- User authentication (NextAuth.js) for multi-user support.
- Recurring transactions and reminders.
- Dark mode toggle.
- Push notifications for budget limits (80%, 100% thresholds).
- Export data as CSV or PDF reports.




## 🧑‍💻 Author

- Hrithik Garg  
- GitHub: [Hrithik-12](https://github.com/Hrithik-12)

---

## 📜 License

This project is open source and free to use. 🎉

