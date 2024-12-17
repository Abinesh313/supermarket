import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import './UserPage.css'; // Ensure you have this CSS file

// Example data related to user metrics
const spendingLineData = [
  { name: 'Jan', spending: 200, savings: 50 },
  { name: 'Feb', spending: 300, savings: 60 },
  { name: 'Mar', spending: 250, savings: 40 },
  { name: 'Apr', spending: 350, savings: 80 },
  { name: 'May', spending: 300, savings: 70 },
  { name: 'Jun', spending: 400, savings: 90 },
];

const purchasesBarData = [
  { name: 'Jan', items: 20, returns: 2 },
  { name: 'Feb', items: 30, returns: 3 },
  { name: 'Mar', items: 25, returns: 1 },
  { name: 'Apr', items: 35, returns: 4 },
  { name: 'May', items: 30, returns: 2 },
  { name: 'Jun', items: 40, returns: 3 },
];

const favoriteProductsPieData = [
  { name: 'Apples', value: 150 },
  { name: 'Bananas', value: 100 },
  { name: 'Milk', value: 200 },
  { name: 'Bread', value: 50 },
];

const COLORS = ['#FF6347', '#3CB371', '#FFD700', '#1E90FF'];

const UserPage = () => {
  const handleHomeClick = () => {
    // Logic for navigating to the home page
    // Example using React Router
    window.location.href = '/'; // Replace with your routing logic
  };

  return (
    <div className="dashboard">
      {/* <button className="home-button" onClick={handleHomeClick}>Home</button> */}
      <h1>User Dashboard</h1>
      <h2>Track Your Spending and Discover Your Favorite Products</h2>
      <div className="overview">
        <div className="overview-item">
          <h3>Total Spending</h3>
          <p>$1,800</p>
        </div>
        <div className="overview-item">
          <h3>Total Savings</h3>
          <p>$390</p>
        </div>
        <div className="overview-item">
          <h3>Total Items Purchased</h3>
          <p>180</p>
        </div>
        <div className="overview-item">
          <h3>Total Returns</h3>
          <p>15</p>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-item">
          <h3>Spending and Savings (Line Chart)</h3>
          <LineChart width={600} height={300} data={spendingLineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="spending" stroke="#8884d8" />
            <Line type="monotone" dataKey="savings" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div className="chart-item">
          <h3>Items Purchased and Returns (Bar Chart)</h3>
          <BarChart width={600} height={300} data={purchasesBarData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="items" fill="#8884d8" />
            <Bar dataKey="returns" fill="#82ca9d" />
          </BarChart>
        </div>
        <div className="chart-item">
          <h3>Favorite Products (Pie Chart)</h3>
          <PieChart width={600} height={300}>
            <Pie
              data={favoriteProductsPieData}
              cx={300}
              cy={150}
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {favoriteProductsPieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
