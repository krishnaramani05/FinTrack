function FinancialGoal ({title, target, saved, percentage, date}) {

    return(
        <>
            <div className="p-3 rounded-4 bg-dark border border-secondary mb-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <span className="fw-bold text-white d-block">{title}</span>
                        <small className="text-white">Target: {date}</small>
                    </div>
                    <span className="fs-5 fw-bold text-secondary">{percentage}% Done</span>
                </div>
                <div className="budget-header small text-white mb-1">
                    <span>Current: ${saved}</span>
                    <span>Target: ${target}</span>
                </div>
                <div className="progress-bar-custom mb-3">
                    <div className="progress-fill" style={{width: `${percentage}%`, background: 'var(--accent-secondary)'}}></div>
                </div>
                <button className="btn btn-sm btn-outline-custom w-100" data-bs-toggle="modal" data-bs-target="#editGoalModal">
                    <i className="fa-solid fa-coins me-1"></i>Deposit Funds / Adjust Goal
                </button>
            </div>
        </>
    )
}


export default FinancialGoal;