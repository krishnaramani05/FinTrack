import {NavLink} from 'react-router-dom';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from "recharts";
import '../assets/css/base.css'
import '../assets/css/dashboard.css'
import { useState } from 'react';
import {Records} from '../db.js'
import Sidebar from '../components/Sidebar.jsx'
import MonthlyDashboard from '../components/MonthlyDashboard.jsx'
import Calendar from '../components/Calendar.jsx'



function Dashboard () {

    const [selectedMonth, setSelectedMonth] = useState("2026-09");

    const monthlyIncome = Records.filter((record) =>
            record.date.startsWith(selectedMonth) &&
            record.type.toLowerCase() === "income"
        ).reduce((total, record) => total + record.amount, 0);
    

    const monthlyExpenses = Records.filter((record) =>
        record.date.startsWith(selectedMonth) &&
        record.type.toLowerCase() === "expense"
    ).reduce((total, record) => total + record.amount, 0);

    const totalBalance = monthlyIncome - monthlyExpenses;


    // Donut Chart
    const months = [];

    for (let i = 5; i >= 0; i--) {
        const date = new Date(selectedMonth + "-01");
        date.setMonth(date.getMonth() - i);

        months.push({
            value: date.toISOString().slice(0, 7),
            name: date.toLocaleString("en-US", { month: "short" })
        });
    }

    const expenseData = Records
        .filter(record =>
            record.type.toLowerCase() === "expense" &&
            months.some(month => record.date.startsWith(month.value))
        )
        .reduce((data, record) => {
            const existing = data.find(
                item => item.category === record.category
            );

            if (existing) {
                existing.amount += record.amount;
            } else {
                data.push({
                    category: record.category,
                    amount: record.amount,
                    fill: ["#7c3aed", "#06b6d4", "#ff3b5c", "#f59e0b", "#10b981"][data.length]
                });
            }

            return data;
        },[]);
        console.log(
            "Records:",
            Records.map(record => ({
                date: record.date,
                type: record.type,
                category: record.category,
                amount: record.amount
            }))
        );
        console.log("Months:", months);
        console.log("Expense Data:", expenseData
    );

    const totalExpenses = expenseData.reduce(
        (total, item) => total + item.amount,0
    );

    // Flowchart
    const flowData = months.map((month) => {
        const income = Records
            .filter(record =>
            record.date.startsWith(month.value) &&
            record.type.toLowerCase() === "income"
            )
            .reduce((total, record) => total + record.amount, 0);

        const expenses = Records
            .filter(record =>
            record.date.startsWith(month.value) &&
            record.type.toLowerCase() === "expense"
            )
            .reduce((total, record) => total + record.amount, 0);

        return {
            month: month.name,
            income,
            expenses
        };
    });


     return(
        <>
            {/* iOS-Style "Screen Time" Toast Notification Container */}
            {/* <div className="iphone-notification-container" id="iphoneNotificationContainer"> */}
                {/* iOS Notification Toast (Triggered on Load) */}
                {/* <div className="iphone-toast" id="screenTimeToast">
                    <div className="iphone-app-icon">
                        <i className="fa-solid fa-clock"></i>
                    </div>
                    <div className="flex-grow-1">
                        <div className="iphone-toast-title">
                            <span>Screen Time spending</span>
                            <span className="text-muted">now</span>
                        </div>
                        <div className="iphone-toast-body">
                            You've spent $54.20 on Dining & Dining Out in the past 2 hours. This is 15% above your daily average limit.
                        </div>
                        <div className="iphone-toast-footer">
                            Tap to set a category limit or adjust budget.
                        </div>
                    </div>
                    <button className="iphone-toast-close" onclick="closeNotification('screenTimeToast')">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div> */}

                {/* iOS Notification Toast 2 (Triggered 2s later for visual demonstration) */}
                {/* <div className="iphone-toast" id="monthlySummaryToast" style={{display: 'none'}}>
                    <div className="iphone-app-icon" style={{background: 'linear-gradient(135deg, #ffaa00, #ff5500)'}}>
                        <i className="fa-solid fa-brain"></i>
                    </div>
                    <div className="flex-grow-1">
                        <div className="iphone-toast-title">
                            <span>FinTrack AI</span>
                            <span className="text-muted">1m ago</span>
                        </div>
                        <div className="iphone-toast-body">
                            Your monthly financial statement is ready. AI detected you saved $620 more than last month!
                        </div>
                        <div className="iphone-toast-footer">
                            Tap to view your detailed AI-generated reports.
                        </div>
                    </div>
                    <button className="iphone-toast-close" onclick="closeNotification('monthlySummaryToast')">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div> */}
            {/* </div> */}

            {/* Mobile Header (Visible on small screens) */}
            <div className="mobile-header">
                <div className="d-flex align-items-center gap-2">
                    <div className="logo-icon" style={{width: '32px', height: '32px', borderRadius: '8px'}}>
                        <i className="fa-solid fa-wallet text-white fs-6"></i>
                    </div>
                    <span className="logo-text m-0 fs-5">FinTrack</span>
                </div>
                <button className="btn btn-outline-custom p-2" id="sidebarToggle">
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>

            <div className="app-container">
                {/* SIDEBAR */}
                <Sidebar />

                {/* MAIN LAYOUT */}
                <main className="main-content">
                    {/* Topbar Row */}
                    <header className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 animate-fade-in">
                        <div>
                            <h1 className="m-0 fs-3" id="welcomeMessage">Welcome back, Sophia!</h1>
                            <p className="text-muted m-0">Here's a breakdown of your finances today.</p>
                        </div>
                        <div className="d-flex gap-2">
                            <div className="d-flex align-items-center bg-white border rounded-4 px-2 py-1 shadow-sm" style={{borderColor: 'rgba(124, 34, 229, 0.15) !important'}}>
                                <i className="fa-solid fa-calendar-days text-primary px-2"></i>
                                <input type='month' value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="form-control border-0 bg-transparent py-1 px-1 fs-6 fw-bold" />
                            </div>
                            <button className="btn btn-outline-custom" onclick="triggerNotificationSim()">
                                <i className="fa-solid fa-bell me-2"></i>Test Notifications
                            </button>
                            <NavLink to="/transactions" className="btn btn-primary">
                                <i className="fa-solid fa-plus me-2"></i>Add Transaction
                            </NavLink>
                        </div>
                    </header>

                    {/* Stat Summary Cards Grid */}
                    <section className="row g-4 mb-4 animate-fade-in">
                        <MonthlyDashboard
                            icon="fa-solid fa-vault"
                            title="Total Balance"
                            amount={totalBalance}
                            theme="balance-theme"
                        />
                        <MonthlyDashboard
                            icon="fa-solid fa-arrow-down-long"
                            title="Monthly Income"
                            amount={monthlyIncome}
                            theme="income-theme"
                        />
                        <MonthlyDashboard
                            icon="fa-solid fa-arrow-up-long"
                            title="Monthly Expenses"
                            amount={monthlyExpenses}
                            theme="expense-theme"
                        />

                        
                    </section>

                    {/* Chart Row */}
                    <section className="row g-4 mb-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
                        {/* Chart 1: Cash Flow Line Chart */}
                        <div className="col-lg-8">
                            <div className="glass-card-no-hover p-4 h-100">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="m-0 fs-5">Income vs Expenses Flow</h4>
                                    <select className="form-select w-auto py-1 px-2 fs-7 bg-dark border-secondary text-white">
                                        <option>Last 6 Months</option>
                                        <option>Last Year</option>
                                    </select>
                                </div>
                                <div style={{ width: "100%", height: "300px" }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={flowData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Area
                                                type="linear"
                                                dataKey="income"
                                                fill="#10b981"
                                                fillOpacity={0.10}
                                                stroke="none"
                                                tooltipType="none"
                                                legendType="none"
                                            />
                                            <Area
                                                type="linear"
                                                dataKey="expenses"
                                                fill="#ff3b5c"
                                                fillOpacity={0.15}
                                                stroke="none"
                                                tooltipType="none"
                                                legendType="none"
                                            />
                                            <Line
                                                type="linear"
                                                dataKey="income"
                                                name="Income"
                                                stroke="#10b981"
                                                strokeWidth={3}
                                            />

                                            <Line
                                                type="linear"
                                                dataKey="expenses"
                                                name="Expenses"
                                                stroke="#ff3b5c"
                                                strokeWidth={3}
                                            />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                        {/* Chart 2: Category Doughnut Chart */}
                        <div className="col-lg-4">
                            <div className="glass-card-no-hover p-4 h-100">
                                <h4 className="m-0 fs-5 mb-3">Expense Distribution</h4>
                                <div style={{ position: "relative", width: "100%", height: "300px" }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={expenseData}
                                                dataKey="amount"
                                                nameKey="category"
                                                cx="50%"
                                                cy="40%"
                                                outerRadius={90}
                                                innerRadius={60}
                                            />
                                            <Tooltip />
                                            <Legend
                                                formatter={(value, entry) =>
                                                `${value} ($${entry.payload.amount.toLocaleString()})`
                                                }
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>

                                    <div
                                        style={{
                                        position: "absolute",
                                        top: "40%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        textAlign: "center"
                                        }}
                                    >
                                        <small className="text-muted">Total Spent</small>
                                        <div className="fw-bold fs-5">${totalExpenses.toLocaleString()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Grid Bottom Row: AI Insights & Recent Transactions */}
                    <section className="row g-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
                        {/* Financial Calendar Panel */}
                        <Calendar />
                    </section>
                </main>
            </div>

            {/* Date Details Modal popup */}
            <div className="modal fade" id="dateDetailsModal" tabindex="-1" aria-labelledby="dateDetailsModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content glass-card-no-hover border-light-subtle" style={{background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(25px)', border: '1px solid rgba(255,255,255,0.15)'}}>
                        <div className="modal-header border-bottom border-light-subtle">
                            <div>
                                <h5 className="modal-title fw-bold text-dark" id="dateDetailsModalLabel">July 15, 2026</h5>
                                <small className="text-muted" id="modalDayOfWeek">Wednesday</small>
                            </div>
                            <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* List of Transactions */}
                            <div className="modal-trans-list" id="modalTransList">
                                {/* Injected by JS */}
                            </div>
                        </div>
                        {/* Day Financial Summary Footer */}
                        <div className="modal-footer border-top border-light-subtle bg-light-subtle d-flex flex-column align-items-stretch p-3 rounded-bottom-4">
                            <div className="d-flex justify-content-between mb-1">
                                <span className="text-muted small">Total Income:</span>
                                <span className="text-success fw-bold small" id="modalSumIncome">+$0.00</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted small">Total Expenses:</span>
                                <span className="text-danger fw-bold small" id="modalSumExpense">-$0.00</span>
                            </div>
                            <div className="d-flex justify-content-between border-top pt-2">
                                <span className="fw-bold text-dark">Net Flow:</span>
                                <span className="fw-bold" id="modalSumNet">$0.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Dashboard   
