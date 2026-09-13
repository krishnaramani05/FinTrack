function GoalForm ({ formData, handleChange, handleSubmit, isEditing }) {
    return(
        <>
            <div className="modal fade" id="addGoalModal" aria-labelledby="addGoalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content glass-card-no-hover" style={{border: '1px solid rgba(255, 255, 255, 0.15)'}}>
                        <div className="modal-header border-bottom border-secondary">
                            <h5 className="modal-title" id="addGoalLabel">{isEditing ? "Edit Goal / Deposit Funds" : "Add Savings Goal"}</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form method='post' onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Goal Name</label>
                                    <input type="text" name="title" onChange={handleChange} value={formData.title} className="form-control" id="title" placeholder="e.g. Dream Vacation" required/>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="targetAmount" className="form-label">Target Amount ($)</label>
                                        <input type="number" name="targetAmount" onChange={handleChange} value={formData.targetAmount} step="1" min="1" className="form-control" id="targetAmount" required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="currentAmount" className="form-label">Current Balance ($)</label>
                                        <input type="number" name="currentAmount" onChange={handleChange} value={formData.currentAmount} step="1" min="1" className="form-control" id="currentAmount" required/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Target Completion Date</label>
                                    <input type="date" name="date" onChange={handleChange} value={formData.date} className="form-control" id="date" required/>
                                </div>
                            </div>
                            <div className="modal-footer border-top border-secondary">
                                <button type="button" className="btn btn-outline-custom" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary">{isEditing ? "Save Changes" : "Create Goal"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default GoalForm;
