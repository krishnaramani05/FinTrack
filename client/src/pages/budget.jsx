import {NavLink} from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../assets/css/base.css'
import '../assets/css/budget.css'
import Sidebar from '../components/Sidebar.jsx'
import profile from '../assets/images/avatar-1.jpg'
import {BudgetRecords, Records, GoalRecords} from '../db.js'
import CategoryBudget from '../components/CategoryBudget.jsx'
import FinancialGoal from '../components/FinancialGoal.jsx'


function Budget () {

    const [selectedMonth, setSelectedMonth] = useState("2026-07");
    const [goals, setGoals] = useState(GoalRecords);

    const months = BudgetRecords.filter(
        (budget) => budget.month === selectedMonth
    );

    const records = Records.filter(
        (record) => record.date.startsWith(selectedMonth)
    );

    const monthlyBudget = months.reduce(
        (total, budget) => total + budget.limit,0
    );


    const monthlyExpenses = Records.filter((record) => {
            const date = record.date.startsWith(selectedMonth)
            const type = record.type.toLowerCase() === "expense"
            return date && type;
    });

    const totalSpent = monthlyExpenses.reduce((total, expense) => total + expense.amount, 0);

    const remainingBudget = monthlyBudget - totalSpent;

    const categories = [
        ...new Set(
            records.filter(record => record.category && record.type.toLowerCase() === "expense")
            .map(record => record.category.toLowerCase())
        )
    ];


    const category = categories.map((categoryName) => {

        const budget = months.find(
            (item) => item.category.toLowerCase() === categoryName
        );

        const categoryExpenses = records.filter((record) => {
            return (
                // record.date.startsWith(selectedMonth) &&
                record.type.toLowerCase() === "expense" &&
                record.category.toLowerCase() === categoryName
            );
        });

        const categorySpent = categoryExpenses.reduce(
            (total, record) => total + record.amount,
            0
        );

        const limit = budget ? budget.limit : 0;

        const percentage = limit > 0 ? (categorySpent / limit) * 100 : 0;

        let status;
        if (!budget) {
            status = "no_budget";
        } else if (percentage >= 100) {
            status = "danger";
        } else if (percentage >= 70) {
            status = "warning";
        } else {
            status = "healthy";
        }
    
        return {
            category: categoryName,
            spent: categorySpent,
            limit: budget ? budget.limit : 0,
            percentage,
            status,
        };
    })


    const financial = goals.map((goal) => {

        const percentage = (goal.saved / goal.target) * 100;
        return {
                title: goal.title,
                target: goal.target,
                saved: goal.saved,
                date: goal.targetDate,
                percentage: percentage.toFixed(0),
        };
    })

    return (
        <>
            {/* Hidden CSS Toggle Checkboxes */}
                {/* <input type="checkbox" id="sidebarToggleCheck" className="d-none"/> */}

                {/* Mobile Header (Visible on small screens) */}
                {/* <div className="mobile-header">
                    <div className="d-flex align-items-center gap-2">
                        <div className="logo-icon" style={{ width: "32px", height: "32px", borderRadius: "8px" }}>
                            <i className="fa-solid fa-wallet text-white fs-6"></i>
                        </div>
                        <span className="logo-text m-0 fs-5">FinTrack</span>
                    </div>
                    <label htmlFor="sidebarToggleCheck" className="btn btn-outline-custom p-2 cursor-pointer" id="sidebarToggle">
                        <i className="fa-solid fa-bars"></i>
                    </label>
                </div> */}

                <div className="app-container">
                    <Sidebar />                    
                    {/* Main Layout */}
                    <main className="main-content">
                        {/* Header Row */}
                        <header className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 animate-fade-in">
                            <div>
                                <h1 className="m-0 fs-3">Budgets & Goals</h1>
                                <p className="text-muted m-0">Define monthly limits and monitor progress on your savings targets.</p>
                            </div>
                            <div className="d-flex gap-2 align-items-center flex-wrap">
                                <div className="d-flex align-items-center bg-white border rounded-4 px-2 py-1 shadow-sm" style={{borderColor: 'rgba(124, 34, 229, 0.15) !important'}}>
                                    <i className="fa-solid fa-calendar-days text-primary px-2"></i>
                                    <input type='month' value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="form-control border-0 bg-transparent py-1 px-1 fs-6 fw-bold" />
                                </div>
                                <button className="btn btn-outline-custom" data-bs-toggle="modal" data-bs-target="#manageBudgetModal">
                                    <i className="fa-solid fa-gear me-2"></i>Configure Budgets
                                </button>
                                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addGoalModal">
                                    <i className="fa-solid fa-plus me-2"></i>New Goal
                                </button>
                            </div>
                        </header>

                        {/* Stat Summary Cards Grid */} 
                        <section className="row g-4 mb-4 animate-fade-in" style={{animationDelay: '0.05s'}}>
                            {/* Card 1: Monthly Budget */}
                            <div className="col-md-4">
                                <div className="glass-card stat-card balance-theme">
                                    <div className="stat-icon-wrapper">
                                        <i className="fa-solid fa-wallet"></i>
                                    </div>
                                    <small className="text-muted d-block text-uppercase fw-semibold tracking-wider">Monthly Budget</small>
                                    <div className="card-amount" id="monthlyBudgetAmount">${monthlyBudget.toFixed(2)}</div>
                                    <span className="small text-muted">Total monthly limit</span>
                                </div>
                            </div>
                            {/* Card 2: Total Spent */}
                            <div className="col-md-4">
                                <div className="glass-card stat-card expense-theme">
                                    <div className="stat-icon-wrapper">
                                        <i className="fa-solid fa-credit-card"></i>
                                    </div>
                                    <small className="text-muted d-block text-uppercase fw-semibold tracking-wider">Total Spent</small>
                                    <div className="card-amount" id="totalSpentAmount">${totalSpent.toFixed(2)}</div>
                                    <span className="small text-danger" id="totalSpentIndicator"><i className="fa-solid fa-circle-exclamation me-1"></i>53% Utilized</span>
                                </div>
                            </div>
                            {/* Card 3: Remaining Budget */}
                            <div className="col-md-4">
                                <div className="glass-card stat-card income-theme">
                                    <div className="stat-icon-wrapper">
                                        <i className="fa-solid fa-piggy-bank"></i>
                                    </div>
                                    <small className="text-muted d-block text-uppercase fw-semibold tracking-wider">Remaining Budget</small>
                                    <div className="card-amount" id="remainingBudgetAmount">${remainingBudget.toFixed(2)}</div>
                                    <span className="small text-success" id="remainingBudgetIndicator"><i className="fa-solid fa-circle-check me-1"></i>Healthy balance</span>
                                </div>
                            </div>
                        </section>

                        {/* Main Split Layout: Budgets (Left) and Goals (Right) */}
                        <section className="row g-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
                            {/* Category Budgets Column */}
                            <div className="col-lg-7">
                                <div className="glass-card-no-hover p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4 className="m-0 fs-5">Category Budgets</h4>
                                        <span className="small text-muted">July 2026 Limits</span>
                                    </div>

                                    {category.map((budget) => (
                                        <CategoryBudget
                                            spent = {budget.spent}
                                            percentage = {budget.percentage}
                                            category = {budget.category}
                                            limit = {budget.limit}
                                            status = {budget.status}
                                        />
                                    ))}   
                                </div>
                            </div>

                            {/* Savings Goals Tracker Column */}
                            <div className="col-lg-5">
                                <div className="glass-card-no-hover p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4 className="m-0 fs-5">Active Financial Goals</h4>
                                        <span className="small text-muted">Tracking</span>
                                    </div>
                                    {financial.map((goal) => (
                                        <FinancialGoal
                                            title = {goal.title}
                                            target = {goal.target}
                                            saved = {goal.saved}
                                            percentage = {goal.percentage}
                                            date = {goal.date}
                                        />
                                    ))}

                                    {/* Goal Item 1: Emergency Fund */}
                                    {/* <div className="p-3 rounded-4 bg-dark border border-secondary mb-3">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <span className="fw-bold text-white d-block">Emergency Fund Goal</span>
                                                <small className="text-muted">Target: Oct 2026</small>
                                            </div>
                                            <span className="fs-5 fw-bold text-secondary">65% Done</span>
                                        </div>
                                        <div className="budget-header small text-muted mb-1">
                                            <span>Current: $6,500.00</span>
                                            <span>Target: $10,000.00</span>
                                        </div>
                                        <div className="progress-bar-custom mb-3">
                                            <div className="progress-fill" style={{width: '65%', background: 'var(--accent-secondary)'}}></div>
                                        </div>
                                        <button className="btn btn-sm btn-outline-custom w-100" data-bs-toggle="modal" data-bs-target="#editGoalModal">
                                            <i className="fa-solid fa-coins me-1"></i>Deposit Funds / Adjust Goal
                                        </button>
                                    </div> */}

                                    {/* Goal Item 2: Macbook Pro */}
                                    {/* <div className="p-3 rounded-4 bg-dark border border-secondary mb-0">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <span className="fw-bold text-white d-block">New Macbook Pro M3</span>
                                                <small className="text-muted">Target: Dec 2026</small>
                                            </div>
                                            <span className="fs-5 fw-bold text-secondary">80% Done</span>
                                        </div>
                                        <div className="budget-header small text-muted mb-1">
                                            <span>Current: $1,200.00</span>
                                            <span>Target: $1,500.00</span>
                                        </div>
                                        <div className="progress-bar-custom mb-3">
                                            <div className="progress-fill" style={{width: '80%', background: 'var(--accent-secondary)'}}></div>
                                        </div>
                                        <button className="btn btn-sm btn-outline-custom w-100" data-bs-toggle="modal" data-bs-target="#editGoalModal">
                                            <i className="fa-solid fa-coins me-1"></i>Deposit Funds / Adjust Goal
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </section>
                    </main>
                </div>

                {/* CONFIGURE BUDGET MODAL */}
                <div className="modal fade" id="manageBudgetModal" tabindex="-1" aria-labelledby="manageBudgetLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content glass-card-no-hover" style={{border: '1px solid rgba(255, 255, 255, 0.15)'}}>
                            <div className="modal-header border-bottom border-secondary">
                                <h5 className="modal-title" id="manageBudgetLabel">Configure Category Budgets</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <p className="text-muted small">Update your monthly spending thresholds for each primary category below:</p>
                                    <div className="mb-3">
                                        <label htmlFor="budFood" className="form-label">Food & Dining Limit ($)</label>
                                        <input type="number" className="form-control" id="budFood" value="500"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="budRent" className="form-label">Rent / Housing Limit ($)</label>
                                        <input type="number" className="form-control" id="budRent" value="1200"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="budUtil" className="form-label">Utilities Limit ($)</label>
                                        <input type="number" className="form-control" id="budUtil" value="300"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="budEnt" className="form-label">Entertainment Limit ($)</label>
                                        <input type="number" className="form-control" id="budEnt" value="400"/>
                                    </div>
                                </div>
                                <div className="modal-footer border-top border-secondary">
                                    <button type="button" className="btn btn-outline-custom" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save Limits</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* NEW GOAL MODAL */}
                <div className="modal fade" id="addGoalModal" tabindex="-1" aria-labelledby="addGoalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content glass-card-no-hover" style={{border: '1px solid rgba(255, 255, 255, 0.15)'}}>
                            <div className="modal-header border-bottom border-secondary">
                                <h5 className="modal-title" id="addGoalLabel">Add New Savings Goal</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="goalTitle" className="form-label">Goal Name</label>
                                        <input type="text" className="form-control" id="goalTitle" placeholder="e.g. Dream Vacation, Down Payment" required/>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="goalTarget" className="form-label">Target Amount ($)</label>
                                            <input type="number" className="form-control" id="goalTarget" placeholder="0.00" required/>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="goalStart" className="form-label">Initial Balance ($)</label>
                                            <input type="number" className="form-control" id="goalStart" placeholder="0" value="0"/>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="goalDate" className="form-label">Target Completion Date</label>
                                        <input type="date" className="form-control" id="goalDate" required/>
                                    </div>
                                </div>
                                <div className="modal-footer border-top border-secondary">
                                    <button type="button" className="btn btn-outline-custom" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-primary">Create Goal</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* EDIT GOAL MODAL */}
                <div className="modal fade" id="editGoalModal" tabindex="-1" aria-labelledby="editGoalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content glass-card-no-hover" style={{border: '1px solid rgba(255, 255, 255, 0.15)'}}>
                            <div className="modal-header border-bottom border-secondary">
                                <h5 className="modal-title" id="editGoalLabel">Deposit Funds / Edit Goal</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className="p-3 bg-dark border border-secondary rounded-4 mb-3 text-center">
                                        <span className="text-muted d-block small mb-1">Emergency Fund Goal</span>
                                        <span className="fs-3 fw-bold text-white">$6,500.00 / $10,000.00</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="depositAmount" className="form-label">Deposit Amount ($)</label>
                                        <input type="number" className="form-control" id="depositAmount" placeholder="e.g. 200.00"/>
                                        <small className="text-muted">This amount will be added to the current savings goal progress.</small>
                                    </div>
                                    <hr className="border-secondary my-3"/>
                                    <div className="mb-3">
                                        <label htmlFor="editGoalName" className="form-label">Adjust Goal Name</label>
                                        <input type="text" className="form-control" id="editGoalName" value="Emergency Fund Goal"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editGoalTarget" className="form-label">Adjust Target ($)</label>
                                        <input type="number" className="form-control" id="editGoalTarget" value="10000"/>
                                    </div>
                                </div>
                                <div className="modal-footer border-top border-secondary">
                                    <button type="button" className="btn btn-outline-custom" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-secondary">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Budget