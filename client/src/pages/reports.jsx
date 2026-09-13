import {NavLink} from 'react-router-dom';
import { BarChart, Bar, Area, XAxis, YAxis, CartesianGrid, LabelList, Legend, ResponsiveContainer, PieChart, Pie } from "recharts";
import {useState} from "react";
import "../assets/css/base.css";
import "../assets/css/reports.css";
import profile from "../assets/images/avatar-1.jpg";
import {Records, GoalRecords} from "../db.js" 
import Sidebar from '../components/Sidebar.jsx';


function Reports () {

    const [selectedMonth, setSelectedMonth] = useState("2026-06");
    const [includeCharts, setIncludeCharts] = useState(true);
    const [insightFocus, setInsightFocus] = useState("General Spending Audit");

    const handleInsightFocus = (e) => {
        setInsightFocus(e.target.value);
    }

    const monthlyRecords = Records.filter((record) =>
        record.date.startsWith(selectedMonth)
    );

    const totalIncome = monthlyRecords
        .filter((record) => record.type.toLowerCase() === "income")
        .reduce((total, record) => total + record.amount, 0);

    const totalExpenses = monthlyRecords
        .filter((record) => record.type.toLowerCase() === "expense")
        .reduce((total, record) => total + record.amount, 0);

    const savings = totalIncome - totalExpenses;

    const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;

    const months = [];

    for (let i = 5; i >= 0; i--) {
        const date = new Date(selectedMonth + "-01");
        date.setMonth(date.getMonth() - i);

        months.push({
            value: date.toISOString().slice(0, 7),
            name: date.toLocaleString("en-US", { month: "short" })
        });
    }

    const monthlyAnalytics = months.map((month) => {
        const income = Records
            .filter(
            (record) =>
                record.date.startsWith(month.value) &&
                record.type.toLowerCase() === "income"
            )
            .reduce((total, record) => total + record.amount, 0);

        const expenses = Records
            .filter(
            (record) =>
                record.date.startsWith(month.value) &&
                record.type.toLowerCase() === "expense"
            )
            .reduce((total, record) => total + record.amount, 0);

        return {
            month: month.name,
            income,
            expenses,
            savings: income - expenses
        };
    });

    const totalGoalSavings = GoalRecords.reduce(
        (total, goal) => total + goal.currentAmount,0
    );

    

    return (
        <>
            {/* Hidden CSS Toggle Checkboxes */}
            {/* <input type="checkbox" id="sidebarToggleCheck" className="d-none"/> */}

            {/* Mobile Header (Visible on small screens) */}
            {/* <div className="mobile-header">
                <div className="d-flex align-items-center gap-2">
                    <div className="logo-icon" style={{width: "32px", height: "32px", borderRadius: "8px"}}>
                        <i className="fa-solid fa-wallet text-white fs-6"></i>
                    </div>
                    <span className="logo-text m-0 fs-5">FinTrack</span>
                </div>
                <label htmlFor="sidebarToggleCheck" className="btn btn-outline-custom p-2 cursor-pointer" id="sidebarToggle">
                    <i className="fa-solid fa-bars"></i>
                </label>
            </div> */}

            <div className="app-container">
                {/* SIDEBAR */}
                <Sidebar />

                {/* MAIN LAYOUT */}
                <main className="main-content">
                    {/* Header Row */}
                    <header className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 animate-fade-in">
                        <div>
                            <h1 className="m-0 fs-3">AI Reports & Statements</h1>
                            <p className="text-muted m-0">Review comprehensive metrics and print custom AI generated reports.</p>
                        </div>
                        <div className="d-flex gap-2">
                            {/* PDF Export trigger using browser print + print media stylesheet rules */}
                            <button className="btn btn-info report-export-btn" onClick={() => window.print()}>
                                <i className="fa-solid fa-file-pdf me-2"></i>Export to PDF
                            </button>
                        </div>
                    </header>

                    {/* Report Analysis Configuration Card */}
                    <section className="glass-card-no-hover p-4 mb-4 animate-fade-in" style={{animationDelay: "0.05s"}}>
                        <div className="row g-3 align-items-center">
                            <div className="col-md-3">
                                <label className="form-label text-muted small text-uppercase">Report Period</label>
                                <div className="d-flex align-items-center bg-white border rounded-4 px-2 py-1 shadow-sm" style={{borderColor: 'rgba(124, 34, 229, 0.15) !important'}}>
                                    <i className="fa-solid fa-calendar-days text-primary px-2"></i>
                                    <input type='month' value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="form-control border-0 bg-transparent py-1 px-1 fs-6 fw-bold" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label text-muted small text-uppercase">Insight Focus</label>
                                <select onChange={handleInsightFocus} title="InsightFocus" className="form-select">
                                    <option>General Spending Audit</option>
                                    <option>Savings & Goals Optimization</option>
                                </select>
                            </div>
                            <div className="col-md-4 mt-md-4 pt-md-2">
                                <div className="form-check form-switch m-0 pt-2">
                                    <input className="form-check-input" type="checkbox" id="includeCharts"  checked={includeCharts} onChange={(e) => setIncludeCharts(e.target.checked)}/>
                                    <label className="form-check-label text-dark small" for="includeCharts">Include charts in printed statement</label>
                                </div>
                            </div>
                            <div className="col-md-2 text-md-end mt-md-4 pt-md-2">
                                <button className="btn btn-primary w-100 py-2">
                                    <i className="fa-solid fa-arrows-rotate me-2"></i>Regenerate
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Grid Layout: AI Text Output (Left) & Printing Chart (Right) */}
                    <section className="row g-4 animate-fade-in" style={{animationDelay: "0.1s"}}>
                        {/* AI Generated Monthly Statement Card */}
                        <div className="col-lg-7">
                            <div className="glass-card-no-hover p-4 h-100">
                                <div className="d-flex align-items-center justify-content-between mb-4 border-bottom border-secondary pb-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="logo-icon" style={{width: "36px", height: "36px", borderRadius: "8px"}}>
                                            <i className="fa-solid fa-brain text-white fs-6"></i>
                                        </div>
                                        <div>
                                            <h4 className="m-0 fs-5 text-white">FinTrack AI Financial Statement</h4>
                                            <small className="text-muted">Generated on Jul 01, 2026</small>
                                        </div>
                                    </div>
                                    <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2 border border-success-subtle">Audit Ready</span>
                                </div>

                                {/* Styled AI Document Body */}
                                <div className="ai-summary-box my-3">
                                    <h5 className="mb-2 fs-6">1. Executive Overview</h5>
                                    <p className="text-muted small">
                                        During the month of {selectedMonth}, you recorded a total gross income of <strong>${totalIncome}</strong> and total expenses of <strong>${totalExpenses}</strong>, yielding a net savings rate of <strong>58.4%</strong>. This represents a solid month of saving, comfortably exceeding the recommended 20% standard savings rule.
                                    </p>
                                </div>

                                <div className="ai-summary-box border-info-subtle my-3" style={{borderLeftColor: "var(--color-info)"}}>
                                    <h5 className="mb-2 fs-6">2. Major Spend Drivers & Behavior</h5>
                                    <p className="text-muted small">
                                        Analysis of individual spending categories reveals that your largest discretionary expense was <strong>Rent / Housing ($1,000.00)</strong>, followed by <strong>Food & Dining ($420.00)</strong>. 
                                        Utilities and miscellaneous subscriptions experienced a minor swell ($310.00 total) which is 3.5% above your defined threshold. 
                                    </p>
                                    <p className="text-muted small mb-0">
                                        <em>Alert:</em> Our logs show shopping card triggers peaked between 8:00 PM and 10:00 PM on weekends. This suggests potential impulsive online buying habits.
                                    </p>
                                </div>

                                <div className="ai-summary-box border-warning-subtle my-3" style={{borderLeftColor: "var(--color-warning)"}}>
                                    <h5 className="mb-2 fs-6">3. Strategic Budget Optimization Recommendations</h5>
                                    <ul className="text-muted small ps-3 mb-0">
                                        <li className="mb-2"><strong>Trim Utilities:</strong> Consider canceling the unused premium sports streaming package to save $22.00/month.</li>
                                        <li className="mb-2"><strong>Smart Shopping:</strong> Set up a "24-hour cooling period" for online shopping carts on weekends to reduce impulse transactions by roughly $80.00/month.</li>
                                        <li><strong>Goal Redirection:</strong> Route $200.00 from your remaining salary directly to the <strong>Macbook Pro Goal</strong> to bring it to completion a month early.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Print-ready visual chart data */}
                        <div className="col-lg-5">
                            <div className={includeCharts ? "print-chart" : "print-hide-chart"}>
                                <div className="glass-card-no-hover p-4 h-100 d-flex flex-column justify-content-between">
                                    <div>
                                        <h4 className="fs-5 mb-1">Monthly Summary Analytics</h4>
                                        <p className="text-muted small mb-4">Monthly income, expenses, and savings for the selected period.</p>
                                    </div>
                                    
                                    {/* Graph */}
                                    <div className="my-auto" style={{ width: "100%", height: "300px" }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={[
                                                    {
                                                        name: "Income",
                                                        amount: totalIncome,
                                                        fill: "#10b981"
                                                    },
                                                    {
                                                        name: "Expenses",
                                                        amount: totalExpenses,
                                                        fill: "#ff3b5c"
                                                    },
                                                    {
                                                        name: "Savings",
                                                        amount: Math.max(savings, 0),
                                                        fill: "#06b6d4"
                                                    }
                                                ]}
                                                margin={{
                                                    top: 30,
                                                    right: 20,
                                                    left: 10,
                                                    bottom: 10
                                                }}
                                            >
                                                <CartesianGrid
                                                    strokeDasharray="3 3"
                                                    vertical={false}
                                                />

                                                <XAxis
                                                    dataKey="name"
                                                    axisLine={false}
                                                    tickLine={false}
                                                />

                                                <YAxis
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                                                />

                                                <Bar
                                                    dataKey="amount"
                                                    radius={[8, 8, 0, 0]}
                                                    barSize={50}
                                                    shape={(props) => (
                                                        <rect
                                                            x={props.x}
                                                            y={props.y}
                                                            width={props.width}
                                                            height={props.height}
                                                            rx={8}
                                                            fill={props.payload.fill}
                                                        />
                                                    )}
                                                >
                                                    <LabelList
                                                        dataKey="amount"
                                                        position="top"
                                                        formatter={(value) =>
                                                            `$${Number(value).toLocaleString()}`
                                                        }
                                                    />
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="mt-4 pt-3 border-top border-secondary">
                                        <div className="d-flex justify-content-between text-muted small mb-2">
                                            <span>Savings Rate</span>
                                            <span className="fw-bold">{savingsRate.toFixed(1)}%</span>
                                        </div>
                                        <div className="d-flex justify-content-between text-muted small">
                                            <span>Total Saved Toward Goals</span>
                                            <span className="fw-bold">${totalGoalSavings}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}


export default Reports;