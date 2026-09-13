function MonthlyBudget ({ icon, title, amount, description, theme }) {
    return(
        <>
            <div className="col-md-4">
                <div className={`glass-card stat-card ${theme}`}>
                    <div className="stat-icon-wrapper">
                        <i className={`fa-solid ${icon}`}></i>
                    </div>
                    <small className="text-muted d-block text-uppercase fw-semibold tracking-wider">{title}</small>
                    <div className="card-amount" id="monthlyBudgetAmount">${amount.toFixed(2)}</div>
                    <span className="small text-muted">{description}</span>
                </div>
            </div>
        </>
    )
}


export default MonthlyBudget;