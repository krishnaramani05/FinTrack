import { useState, useEffect } from 'react';
import '../assets/css/base.css'
import '../assets/css/transactions.css'
import { Records} from '../db.js'
import TransactionRecords from '../components/TransactionRecords.jsx'
import Form from '../components/Form.jsx'
import Sidebar from '../components/Sidebar.jsx'

function Transactions () {

    const [transactionRecords, setTransactionRecords] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        type: 'expense',
        category: 'food',
        amount: '',
        date: '',
    })

    useEffect(() => {
        fetch("http://localhost:5000/api/transactions")
            .then((response) => response.json())
            .then((data) => {
                setTransactionRecords(data);
            })
            .catch((error) => {
                console.log("Error fetching transactions:", error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId === null) {
            // Create
            try {
                const response = await fetch(
                    "http://localhost:5000/api/transactions",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            date: formData.date,
                            title: formData.title,
                            category: formData.category,
                            type: formData.type,
                            amount: Number(formData.amount)
                        })
                    }
                );

                const savedTransaction = await response.json();

                setTransactionRecords((previousRecords) => [
                    ...previousRecords,
                    savedTransaction
                ]);
                console.log("Transaction saved:", savedTransaction);
            } catch (error) {
                console.log("Error saving transaction:", error);
            }
        }
        else
        {
            // Update
            const response = await fetch(
                `http://localhost:5000/api/transactions/${editingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        amount: Number(formData.amount),
                        type: formData.type,
                        category: formData.category,
                        date: formData.date
                    })
                }
            );
            const updatedRecord = await response.json();
            setTransactionRecords((previousRecords) =>
                previousRecords.map((record) =>
                    record._id === updatedRecord._id
                        ? updatedRecord
                        : record
                )
            );
        }
        setEditingId(null);
        resetForm();
    };

    const handleDelete = async (id) => {
        try {
            await fetch(
                `http://localhost:5000/api/transactions/${id}`,
                {
                    method: "DELETE"
                }
            );

            setTransactionRecords(
                transactionRecords.filter((record) => record._id !== id)
            );
        } catch (error) {
            console.log("Error deleting transaction:", error);
        }
    };

    const confirmDelete = () => {
        setTransactionRecords((previousRecords) =>
            previousRecords.filter((record) => record._id !== deleteId)
        );
        setDeleteId(null);
    };

    const handleEdit = (id) => {
        const edit = transactionRecords.find((record) => record._id === id);
        setEditingId(id);

        setFormData({
            date: edit.date,
            title: edit.title,
            category: edit.category,
            type: edit.type,
            amount: edit.amount,
        });
    }

    const resetForm = () => {
        setFormData({
            title: '',
            type: 'expense',
            category: 'food',
            amount: '',
            date: '',
        });
    };

    const searchTransactions = (e) => {
        setSearch(e.target.value.toLowerCase());
    }     
    
    const handleType = (e) => {
        setType(e.target.value);
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
    }
    
    const filteredRecords = transactionRecords.filter((record) => {

        const matchesSearch = record.title.toLowerCase().includes(search);
        const matchesType = type === '' || record.type.toLowerCase() === type.toLowerCase();
        const matchesCategory = category === '' || record.category.toLowerCase() === category.toLowerCase();
        
        return matchesSearch && matchesType && matchesCategory;
    });
    
    
    
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

                {/* MAIN LAYOUT */}
                <main className="main-content">
                    {/* Header Row */}
                    <header className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 animate-fade-in">
                        <div>
                            <h1 className="m-0 fs-3">Transactions</h1>
                            <p className="text-muted m-0">Manage, search, and filter your financial cash flow logs.</p>
                        </div>
                        <div>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#transactionModal">
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
                                    <input type="text" id="search" name="search" onInput={searchTransactions} className="form-control border-start-0" placeholder="Search by title"/>
                                </div>
                            </div>
                            {/* Type Filter */}
                            <div className="col-lg-2 col-md-4 col-6">
                                <select onChange={handleType} className="form-select">
                                    <option value="">All Types</option>
                                    <option value="income">Income Only</option>
                                    <option value="expense">Expenses Only</option>
                                </select>
                            </div>
                            {/* Category Filter */}
                            <div className="col-lg-3 col-md-4 col-6">
                                <select onChange={handleCategory} className="form-select" title="Category">
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
                                <TransactionRecords records={filteredRecords} onDelete={handleDelete} onEdit={handleEdit} />
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

            {/* ADD / EDIT TRANSACTION MODAL */}
                <Form
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    isEditing={editingId !== null}
                />

            {/* DELETE TRANSACTION CONFIRMATION MODAL */}
            <div className="modal fade" id="deleteTransactionModal" tabIndex="-1" aria-labelledby="deleteTransactionLabel" aria-hidden="true">
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
                            <button onClick={confirmDelete} type="button" className="btn btn-danger flex-grow-1" data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Transactions
