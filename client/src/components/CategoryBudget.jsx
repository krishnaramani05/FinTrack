// import '../assets/css/CategoryBudget.css'

function CategoryBudget ({category, limit, spent, percentage, status}) {

    const statusClass = {
        healthy: "text-bg-success",
        warning: "text-bg-warning",
        danger: "text-bg-danger",
        no_budget: "text-bg-dark",
    };

    const categoryIcons = {
        food: "fa-utensils",
        house: "fa-house",
        utility: "fa-plug",
        entertainment: "fa-circle-play",
        shopping: "fa-bag-shopping",
        traveling: "fa-plane",
        salary: "fa-money-bill"
    };

    return(
        <>
            <div className="budget-progress-container p-3 rounded-4 bg-dark-subtle border border-secondary mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center gap-2">
                        <div className="stat-icon-wrapper m-0" style={{width: '36px', height: '36px', background: 'rgba(255, 170, 0, 0.15)', border: '1px solid rgba(255, 170, 0, 0.3)', fontSize: '1rem', borderRadius: '8px'}}>
                            <i className={`fa-solid ${categoryIcons[category.toLowerCase()]}`}></i>
                        </div>
                        <span className="fw-bold text-black">{category}</span>
                    </div>
                    <span className={`badge ${statusClass[status]}`}>
                        {status === "danger"
                            ? `Over Limit (${percentage.toFixed(0)}%)`
                            : status === "warning"
                            ? `Warning (${percentage.toFixed(0)}%)`
                            : status === "healthy"
                            ? `Healthy (${percentage.toFixed(0)}%)`
                            : status === "no_budget"
                            ? "No Budget"
                            : ""
                        }
                    </span>
                </div>
                <div className="budget-header small text-muted mb-1">
                    <span>Spent: ${spent}</span>
                    <span>Limit: ${limit}</span>
                </div>
                <div className="progress-bar-custom">
                    <div className={`progress-fill fill-${status}`} style={{width: `${percentage}%`}}></div>
                </div>
            </div>
        </>
    )
}


export default CategoryBudget;