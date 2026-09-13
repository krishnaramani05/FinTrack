import {NavLink} from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../assets/css/base.css'
import '../assets/css/budget.css'
import Sidebar from '../components/Sidebar.jsx'
import profile from '../assets/images/avatar-1.jpg'
import {BudgetRecords, Records, GoalRecords} from '../db.js'
import CategoryBudget from '../components/CategoryBudget.jsx'
import FinancialGoal from '../components/FinancialGoal.jsx'
import GoalForm from '../components/GoalForm.jsx'
import MonthlyBudget from '../components/MonthlyBudget.jsx'



function Budget () {

    const [selectedMonth, setSelectedMonth] = useState("2026-07");
    const [goals, setGoals] = useState(GoalRecords);
    const [editingGoal, setEditingGoal] = useState(null);
    const [budgetForm, setBudgetForm] = useState({});
    const [budgetRecords, setBudgetRecords] = useState(BudgetRecords);
    const [formData, setFormData] = useState({
        title: '',
        targetAmount: '',
        currentAmount: 0,
        date: ''
    });

    const months = budgetRecords.filter(
        (budget) => budget.month === selectedMonth
    );

    const records = Records.filter(
        (record) => record.date.startsWith(selectedMonth)
    );

    // Monthly Budget Calculation
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

    // Category Budgets
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

    const budgetCategories = [
        "food",
        "house",
        "utility",
        "entertainment",
        "shopping",
        "traveling",
        "salary",
        "other"
    ];

    // Financial Goals 
    const financial = goals.map((goal) => {

        const percentage = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
        return {
            id: goal.id,
            title: goal.title,
            targetAmount: goal.targetAmount,
            currentAmount: goal.currentAmount,
            date: goal.date,
            percentage: percentage.toFixed(0),
        };
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingGoal === null) {
            //create
            const newGoal = {
                id: Date.now(),
                title: formData.title,
                targetAmount: parseFloat(formData.targetAmount),
                currentAmount: parseFloat(formData.currentAmount),
                date: formData.date,
            };
            setGoals((previousGoals) => [...previousGoals, newGoal]);
        }
        else{
            const updatedGoal = {
                id: editingGoal,
                title: formData.title,
                targetAmount: parseFloat(formData.targetAmount),
                currentAmount: parseFloat(formData.currentAmount),
                date: formData.date,
            };
            setGoals(previousGoals => previousGoals.map(goal => goal.id === editingGoal ? updatedGoal : goal));
            console.log("Updated goal:", updatedGoal);
        }
    }

    const handleEdit = (id) => {
        const edit = goals.find((goal) => goal.id === id);
        if (!edit) return;
        setEditingGoal(id);

        setFormData({
            title: edit.title,
            targetAmount: edit.targetAmount,
            currentAmount: edit.currentAmount,
            date: edit.date,
        });
    }

    const handleNewGoal = () => {
        setEditingGoal(null);

        setFormData({
            title: '',
            targetAmount: '',
            currentAmount: 0,
            date: ''
        });
    };


    // Budget Form
    const handleBudgetChange = (e) => {
        setBudgetForm({
            ...budgetForm,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const newBudgetForm = {};

        budgetCategories.forEach((category) => {
            const existingBudget = months.find(
                (budget) =>
                    budget.category.toLowerCase() === category
            );

            newBudgetForm[category] = existingBudget
                ? existingBudget.limit
                : "";
        });

        setBudgetForm(newBudgetForm);
    }, [selectedMonth]);


    const handleBudgetSubmit = (e) => {
        e.preventDefault();
        const updatedBudgets = budgetRecords.map((budget) => {
            if (budget.month === selectedMonth) {
                const newLimit = budgetForm[budget.category];
                return {
                    ...budget,
                    limit: parseFloat(newLimit) || 0
                };
            }
            return budget;
        });

        setBudgetRecords(updatedBudgets);
        const closeButton = document.getElementById("closeBudgetModal");
        if (closeButton) {
            closeButton.click();
        }
    };

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
                                <button onClick={handleNewGoal} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addGoalModal">
                                    <i className="fa-solid fa-plus me-2"></i>New Goal
                                </button>
                            </div>
                        </header>

                        {/* Stat Summary Cards Grid */} 
                        <section className="row g-4 mb-4 animate-fade-in" style={{animationDelay: '0.05s'}}>
                            <MonthlyBudget
                                icon="fa-wallet"
                                title="Monthly Budget"
                                amount={monthlyBudget}
                                description="Total monthly limit"
                                theme="balance-theme"
                            />
                            
                            <MonthlyBudget
                                icon="fa-credit-card"
                                title="Total Spent"
                                amount={totalSpent}
                                description="Total spent this month"
                                theme="expense-theme"
                            />

                            <MonthlyBudget
                                icon="fa-piggy-bank"
                                title="Remaining Budget"
                                amount={remainingBudget}
                                description="Healthy balance"
                                theme="income-theme"
                            />
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
                                            selectedMonth={selectedMonth}
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
                                            key={goal.id}
                                            id={goal.id}
                                            title = {goal.title}
                                            targetAmount = {goal.targetAmount}
                                            currentAmount = {goal.currentAmount}
                                            percentage = {goal.percentage}
                                            date = {goal.date}
                                            onEdit={handleEdit}
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>
                    </main>
                </div>

                {/* CONFIGURE BUDGET MODAL */}
                <div className="modal fade" id="manageBudgetModal" tabIndex="-1" aria-labelledby="manageBudgetLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content glass-card-no-hover" style={{border: '1px solid rgba(255, 255, 255, 0.15)'}}>
                            <div className="modal-header border-bottom border-secondary">
                                <h5 className="modal-title" id="manageBudgetLabel">Configure Category Budgets</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={handleBudgetSubmit}>
                                {budgetCategories.map((category) => (
                                    <div className="mb-3" key={category}>
                                        <label htmlFor={category} className="form-label"> {category} Limit ($) </label>
                                        <input
                                            type="number"
                                            name={category}
                                            className="form-control"
                                            id={category}
                                            value={budgetForm[category] ?? ""}
                                            onChange={handleBudgetChange}
                                            step="1" min="1"
                                            required
                                        />
                                    </div>
                                ))}
                                <div className="modal-footer border-top border-secondary">
                                    <button type="button" className="btn btn-outline-custom" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Save Limits</button>
                                    <button type="button" id="closeBudgetModal" data-bs-dismiss="modal" className="d-none"></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>  

                {/* NEW GOAL MODAL */}
                <GoalForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    isEditing={editingGoal !== null}
                />
        </>
    )
}

export default Budget