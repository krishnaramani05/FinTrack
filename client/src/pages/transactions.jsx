import {NavLink} from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../assets/css/base.css'
import '../assets/css/transactions.css'
import profile from '../assets/images/avatar-1.jpg'
import Records from '../db.js'
import TransactionRecords from '../components/TransactionRecords.jsx'

function Transactions () {

    const [transactionRecords, setTransactionRecords] = useState(Records);

    const [formData, setFormData] = useState({
        title: '',
        type: 'expense',
        category: 'food',
        amount: '',
        date: '',
        notes: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransaction = {
            id: Date.now(),
            date: formData.date,
            title: formData.title,
            category: formData.category,
            type: formData.type,
            amount: Number(formData.amount),
            notes: formData.notes
        };

        setTransactionRecords((previousRecords) => [
            ...previousRecords,
            newTransaction
        ]);

        console.log("New transaction:", newTransaction);
    };

    const handleDelete = (id) => {
        setTransactionRecords((previousRecords) => 
            previousRecords.filter((record) => record.id !== id)
        );
    }

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
                {/* SIDEBAR */}
                <aside className="sidebar" id="sidebar">
                    <div className="logo-area">
                        <div className="logo-icon">
                            <i className="fa-solid fa-wallet text-white fs-5"></i>
                        </div>
                        <h2 className="logo-text m-0">FinTrack</h2>
                    </div>

                    <nav className="w-100 mb-4">
                        <ul className="nav-menu p-0 m-0">
                            <li>
                                <NavLink to="/dashboard" className="nav-item-link">
                                    <i className="fa-solid fa-chart-pie"></i>
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/transactions" className="nav-item-link">
                                    <i className="fa-solid fa-list-check"></i>
                                    <span>Transactions</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/budget" className="nav-item-link">
                                    <i className="fa-solid fa-wallet"></i>
                                    <span>Budgets & Goals</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/reports" className="nav-item-link">
                                    <i className="fa-solid fa-circle-nodes"></i>
                                    <span>Reports & AI</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/settings" className="nav-item-link">
                                    <i className="fa-solid fa-gear"></i>
                                    <span>Settings</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <div className="user-profile-section">
                        <div className="user-card mb-3">
                            <img src={profile} alt="User Avatar" className="user-avatar" id="sidebarAvatar"/>
                            <div className="overflow-hidden">
                                <h6 className="m-0 text-truncate text-white" id="sidebarName">Sophia Miller</h6>
                                <small className="text-muted text-truncate d-block" id="sidebarPlan">Premium Plan</small>
                            </div>
                        </div>
                        <NavLink to="/login" className="nav-item-link p-2 text-danger bg-transparent" style={{ border: "none" }}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <span>Logout</span>
                        </NavLink>
                    </div>
                </aside>

                {/* MAIN LAYOUT */}
                <main className="main-content">
                    {/* Header Row */}
                    <header className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 animate-fade-in">
                        <div>
                            <h1 className="m-0 fs-3">Transactions</h1>
                            <p className="text-muted m-0">Manage, search, and filter your financial cash flow logs.</p>
                        </div>
                        <div>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTransactionModal">
                                <i className="fa-solid fa-plus me-2"></i>Add Transaction
                            </button>
                        </div>
                    </header>

                    {/* Search and Filter Panel */}
                    <section className="glass-card-no-hover p-3 mb-4 animate-fade-in" style={{ animationDelay: "0.05s" }}>
                        <div className="row g-3">
                            {/* Search Input */}
                            <div className="col-lg-4 col-md-12 col-12">
                                <div className="input-group">
                                    <span className="input-group-text border-end-0">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input type="text" className="form-control border-start-0" placeholder="Search transactions (e.g. Foods, Salary...)"/>
                                </div>
                            </div>
                            {/* Type Filter */}
                            <div className="col-lg-2 col-md-4 col-6">
                                <select className="form-select" title="Transaction Type">
                                    <option value="">All Types</option>
                                    <option value="income">Income Only</option>
                                    <option value="expense">Expenses Only</option>
                                </select>
                            </div>
                            {/* Category Filter */}
                            <div className="col-lg-3 col-md-4 col-6">
                                <select className="form-select" title="Category">
                                    <option value="">All Categories</option>
                                    <option value="food">Food & Dining</option>
                                    <option value="rent">Rent / Housing</option>
                                    <option value="utility">Utilities</option>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="shopping">Shopping</option>
                                    <option value="salary">Salary / Income</option>
                                </select>
                            </div>
                            {/* Date Filter */}
                            <div className="col-lg-3 col-md-4 col-12">
                                <input type="date" className="form-control" title="Filter by date range"/>  
                            </div>
                        </div>
                    </section>

                    {/* Main Data Table */}
                    <section className="glass-card-no-hover p-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                        <div className="table-responsive">
                            <table className="table custom-table mb-0">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <TransactionRecords records={transactionRecords} onDelete={handleDelete} />
                            </table>
                        </div>

                        {/* Styled Custom Pagination */}
                        <nav className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
                            <span className="small text-muted">Showing 1 to 5 of 32 entries</span>
                            <ul className="pagination pagination-sm m-0">
                                <li className="page-item disabled"><a className="page-link bg-transparent border-secondary text-muted" href="#">Prev</a></li>
                                <li className="page-item active"><a className="page-link border-secondary" href="#" style={{ backgroundColor: "var(--accent-primary)", borderColor: "var(--accent-primary)" }}>1</a></li>
                                <li className="page-item"><a className="page-link bg-transparent border-secondary text-white" href="#">2</a></li>
                                <li className="page-item"><a className="page-link bg-transparent border-secondary text-white" href="#">3</a></li>
                                <li className="page-item"><a className="page-link bg-transparent border-secondary text-white" href="#">Next</a></li>
                            </ul>
                        </nav>
                    </section>
                </main>
            </div>

            {/* ADD TRANSACTION MODAL */}
            <div className="modal fade" id="addTransactionModal" tabIndex="-1" aria-labelledby="addTransactionLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content glass-card-no-hover" style={{ border: "1px solid rgba(255, 255, 255, 0.15)" }}>
                        <div className="modal-header border-bottom border-secondary">
                            <h5 className="modal-title" id="addTransactionLabel">Add Transaction</h5>
                            <button type="button" className="btn-close btn-close-black" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" name="title" onChange={handleChange} value={formData.title} className="form-control" id="title" placeholder="e.g. Whole Foods, Freelance Salary" required/>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="type" className="form-label">Transaction Type</label>
                                        <select name="type" onChange={handleChange} value={formData.type} className="form-select" id="type">
                                            <option value="expense">Expense</option>
                                            <option value="income">Income</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="category" className="form-label">Category</label>
                                        <select name="category" onChange={handleChange} value={formData.category} className="form-select" id="category">
                                            <option value="food">Food & Dining</option>
                                            <option value="rent">Rent / Housing</option>
                                            <option value="utility">Utilities</option>
                                            <option value="entertainment">Entertainment</option>
                                            <option value="shopping">Shopping</option>
                                            <option value="salary">Income / Salary</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="amount" className="form-label">Amount ($)</label>
                                        <input type="number" name="amount" onChange={handleChange} value={formData.amount} step="1" min="1" className="form-control" id="amount" placeholder="1" required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="date" className="form-label">Transaction Date</label>
                                        <input type="date" name="date" onChange={handleChange} value={formData.date} className="form-control" id="date" required/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="notes" className="form-label">Additional Notes</label>
                                    <textarea name="notes" onChange={handleChange} value={formData.notes} className="form-control" id="notes" placeholder="Brief payment notes or references..."></textarea>
                                </div>
                            </div>
                            <div className="modal-footer border-top border-secondary">
                                <button type="button" className="btn btn-outline-custom" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary">Add Log</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* EDIT TRANSACTION MODAL */}
            {/* <div className="modal fade" id="editTransactionModal" tabIndex="-1" aria-labelledby="editTransactionLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content glass-card-no-hover" style={{ border: "1px solid rgba(255, 255, 255, 0.15)" }}>
                        <div className="modal-header border-bottom border-secondary">
                            <h5 className="modal-title" id="editTransactionLabel">Edit Transaction</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="editTitle" className="form-label">Description / Merchant</label>
                                    <input type="text" className="form-control" id="editTitle" value="Whole Foods Market" required/>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="editType" className="form-label">Transaction Type</label>
                                        <select className="form-select" id="editType">
                                            <option value="expense" selected>Expense</option>
                                            <option value="income">Income</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="editCategory" className="form-label">Category</label>
                                        <select className="form-select" id="editCategory">
                                            <option value="food" selected>Food & Dining</option>
                                            <option value="rent">Rent / Housing</option>
                                            <option value="utility">Utilities</option>
                                            <option value="entertainment">Entertainment</option>
                                            <option value="shopping">Shopping</option>
                                            <option value="salary">Income / Salary</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="editAmount" className="form-label">Amount ($)</label>
                                        <input type="number" step="0.01" className="form-control" id="editAmount" value="84.20" required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="editDate" className="form-label">Transaction Date</label>
                                        <input type="date" className="form-control" id="editDate" value="2026-07-15" required/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editNotes" className="form-label">Additional Notes</label>
                                    <textarea className="form-control" id="editNotes" rows="2">Debit Card Purchase - Weekly Grocery Shopping</textarea>
                                </div>
                            </div>
                            <div className="modal-footer border-top border-secondary">
                                <button type="button" className="btn btn-outline-custom" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-secondary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> */}

            {/* DELETE TRANSACTION CONFIRMATION MODAL */}
            {/* <div className="modal fade" id="deleteTransactionModal" tabIndex="-1" aria-labelledby="deleteTransactionLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content glass-card-no-hover" style={{ border: "1px solid rgba(255, 255, 255, 0.15)" }}>
                        <div className="modal-header border-bottom border-secondary">
                            <h5 className="modal-title" id="deleteTransactionLabel">Confirm Delete</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center py-4">
                            <i className="fa-solid fa-circle-exclamation text-danger fs-1 mb-3"></i>
                            <p className="m-0">Are you sure you want to permanently delete this transaction record?</p>
                        </div>
                        <div className="modal-footer border-top border-secondary d-flex justify-content-between">
                            <button type="button" className="btn btn-outline-custom flex-grow-1" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger flex-grow-1" data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )

}

export default Transactions
