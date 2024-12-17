import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import styles from './AdminPage.module.css';

const salesLineData = [
  { name: 'Jan', sales: 1200, profits: 800, customers: 200 },
  { name: 'Feb', sales: 1500, profits: 900, customers: 220 },
  { name: 'Mar', sales: 1800, profits: 1000, customers: 250 },
  { name: 'Apr', sales: 2000, profits: 1200, customers: 270 },
  { name: 'May', sales: 1700, profits: 1100, customers: 240 },
  { name: 'Jun', sales: 1900, profits: 1300, customers: 260 },
  { name: 'Jul', sales: 2200, profits: 1500, customers: 300 },
];

const salesBarData = [
  { name: 'Jan', sales: 1200, expenses: 700, returns: 50 },
  { name: 'Feb', sales: 1500, expenses: 800, returns: 60 },
  { name: 'Mar', sales: 1800, expenses: 900, returns: 70 },
  { name: 'Apr', sales: 2000, expenses: 1000, returns: 80 },
  { name: 'May', sales: 1700, expenses: 800, returns: 65 },
  { name: 'Jun', sales: 1900, expenses: 900, returns: 70 },
];

const productPieData = [
  { name: 'Fruits', value: 500 },
  { name: 'Vegetables', value: 300 },
  { name: 'Dairy', value: 200 },
  { name: 'Snacks', value: 100 },
];

const COLORS = ['#FF6347', '#3CB371', '#FFD700', '#1E90FF'];

const AdminPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/login'); // Redirect to login if not an admin
    }
  }, [user, navigate]);

  if (user && user.role === 'ADMIN') {
    return (
      <div className={styles.adminPage}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTitle}>ADMIN</div>
          <nav className={styles.sidebarMenu}>
            <ul>
              <li><Link to="/" className={styles.sidebarLink}>Dashboard</Link></li>
              <li><Link to="/addproduct" className={styles.sidebarLink}>Add Product</Link></li>
            </ul>
          </nav>
        </aside>

        <main className={styles.mainContent}>
          <h2 className={styles.pageTitle}>Supermarket Dashboard</h2>
          <div className={styles.overview}>
            <div className={styles.overviewCard}>
              <h3 className={styles.cardTitle}>Total Sales</h3>
              <p className={styles.cardValue}>$11,600</p>
            </div>
            <div className={styles.overviewCard}>
              <h3 className={styles.cardTitle}>Total Profits</h3>
              <p className={styles.cardValue}>$7,300</p>
            </div>
            <div className={styles.overviewCard}>
              <h3 className={styles.cardTitle}>Total Expenses</h3>
              <p className={styles.cardValue}>$5,200</p>
            </div>
            <div className={styles.overviewCard}>
              <h3 className={styles.cardTitle}>Total Customers</h3>
              <p className={styles.cardValue}>1,740</p>
            </div>
          </div>
          <div className={styles.charts}>
            <div className={styles.chart}>
              <h3 className={styles.chartTitle}>Sales, Profits, and Customers (Line Chart)</h3>
              <LineChart width={600} height={300} data={salesLineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                <Line type="monotone" dataKey="profits" stroke="#82ca9d" />
                <Line type="monotone" dataKey="customers" stroke="#ff7300" />
              </LineChart>
            </div>
            <div className={styles.chart}>
              <h3 className={styles.chartTitle}>Sales, Expenses, and Returns (Bar Chart)</h3>
              <BarChart width={600} height={300} data={salesBarData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
                <Bar dataKey="expenses" fill="#82ca9d" />
                <Bar dataKey="returns" fill="#ff7300" />
              </BarChart>
            </div>
            <div className={styles.chart}>
              <h3 className={styles.chartTitle}>Product Distribution (Pie Chart)</h3>
              <PieChart width={600} height={300}>
                <Pie
                  data={productPieData}
                  cx={300}
                  cy={150}
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                >
                  {productPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
};

export default AdminPage;
