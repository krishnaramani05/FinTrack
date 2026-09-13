function MonthlyDashboard({ icon, title, amount, theme }) {
    return(
        <>
            <div className="col-md-4">
                <div className={`glass-card stat-card ${theme}`}>
                    <div className="stat-icon-wrapper">
                        <i className={icon}></i>
                    </div>
                    <small className="text-muted d-block text-uppercase fw-semibold tracking-wider">{title}</small>
                    <div className="card-amount">${amount.toFixed(2)}</div>
                    {/* <span className="small text-success"><i className="fa-solid fa-arrow-trend-up me-1"></i>+4.2% from last month</span> */}
                </div>
            </div>
        </>
    )
}


export default MonthlyDashboard;