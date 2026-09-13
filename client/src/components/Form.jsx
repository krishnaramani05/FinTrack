function Form ({ formData, handleChange, handleSubmit, isEditing }) {

    return (
        <>
            <div className="modal fade" id="transactionModal" aria-labelledby="transactionModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content glass-card-no-hover" style={{ border: "1px solid rgba(255, 255, 255, 0.15)" }}>
                        <div className="modal-header border-bottom border-secondary">
                            <h5 className="modal-title" id="transactionModalLabel">{isEditing ? "Edit Transaction" : "Add Transaction"}</h5>
                            <button type="button" className="btn-close btn-close-black" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" name="title" onChange={handleChange} value={formData.title} className="form-control" id="title" required/>
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
                                            <option value="rent">House</option>
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
                                        <input type="number" name="amount" onChange={handleChange} value={formData.amount} step="1" min="1" className="form-control" id="amount" required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="date" className="form-label">Transaction Date</label>
                                        <input type="date" name="date" onChange={handleChange} value={formData.date} className="form-control" id="date" required/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="notes" className="form-label">Additional Notes</label>
                                    <textarea name="notes" onChange={handleChange} value={formData.notes} className="form-control" id="notes"></textarea>
                                </div>
                            </div>
                            <div className="modal-footer border-top border-secondary">
                                <button type="button" className="btn btn-outline-custom" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary">{isEditing ? "Save Changes" : "Add Transaction"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Form;