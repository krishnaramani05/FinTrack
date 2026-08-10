import {NavLink} from 'react-router-dom';
import '../assets/css/base.css'
import '../assets/css/budget.css'
import profile from '../assets/images/avatar-1.jpg'


function Budget () {

    return (
        <>
            {/* Hidden CSS Toggle Checkboxes */}
                <input type="checkbox" id="sidebarToggleCheck" className="d-none"/>

                {/* Mobile Header (Visible on small screens) */}
                <div className="mobile-header">
                    <div className="d-flex align-items-center gap-2">
                        <div className="logo-icon" style={{ width: "32px", height: "32px", borderRadius: "8px" }}>
                            <i className="fa-solid fa-wallet text-white fs-6"></i>
                        </div>
                        <span className="logo-text m-0 fs-5">FinTrack</span>
                    </div>
                    <label for="sidebarToggleCheck" className="btn btn-outline-custom p-2 cursor-pointer" id="sidebarToggle">
                        <i className="fa-solid fa-bars"></i>
                    </label>
                </div>

                <div className="app-container">
                    {/* Sidebar */}
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
                                    <NavLink to="/budget" className="nav-item-link active">
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
                            <NavLink to="/login" className="nav-item-link p-2 text-danger bg-transparent" style={{border: 'none'}}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <span>Logout</span>
                            </NavLink>
                        </div>
                    </aside>

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
                                    <select className="form-select border-0 bg-transparent py-1 px-1 fs-6 font-weight-bold" id="monthSelector" style={{width: 'auto', minWidth: '140px', fontWeight: '600', cursor: 'pointer', boxShadow: 'none'}}>
                                        <option value="june_2026">June 2026</option>
                                        <option value="july_2026" selected>July 2026</option>
                                        <option value="august_2026">August 2026</option>
                                    </select>
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
                                    <div className="card-amount" id="monthlyBudgetAmount">$4,500.00</div>
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
                                    <div className="card-amount" id="totalSpentAmount">$2,410.20</div>
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
                                    <div className="card-amount" id="remainingBudgetAmount">$2,089.80</div>
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

                                    {/* Budget Item 1: Food & Dining (Warning) */}
                                    <div className="budget-progress-container p-3 rounded-4 bg-dark-subtle border border-secondary mb-3">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="stat-icon-wrapper m-0" style={{width: '36px', height: '36px', background: 'rgba(255, 170, 0, 0.15)', border: '1px solid rgba(255, 170, 0, 0.3)', fontSize: '1rem', borderRadius: '8px'}}>
                                                    <i className="fa-solid fa-utensils text-warning"></i>
                                                </div>
                                                <span className="fw-bold text-white">Food & Dining</span>
                                            </div>
                                            <span className="badge text-bg-warning text-dark font-weight-bold">Warning (84%)</span>
                                        </div>
                                        <div className="budget-header small text-muted mb-1">
                                            <span>Spent: $420.00</span>
                                            <span>Limit: $500.00</span>
                                        </div>
                                        <div className="progress-bar-custom">
                                            <div className="progress-fill fill-warning" style={{width: '84%'}}></div>
                                        </div>
                                    </div>

                                    {/* Budget Item 2: Rent (Healthy) */}
                                    <div className="budget-progress-container p-3 rounded-4 bg-dark-subtle border border-secondary mb-3">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="stat-icon-wrapper m-0" style={{width: '36px', height: '36px', background: 'rgba(0, 230, 118, 0.15)', border: '1px solid rgba(0, 230, 118, 0.3)', fontSize: '1rem', borderRadius: '8px'}}>
                                                    <i className="fa-solid fa-house text-success"></i>
                                                </div>
                                                <span className="fw-bold text-white">Rent / Housing</span>
                                            </div>
                                            <span className="badge text-bg-success font-weight-bold">Healthy (83%)</span>
                                        </div>
                                        <div className="budget-header small text-muted mb-1">
                                            <span>Spent: $1,000.00</span>
                                            <span>Limit: $1,200.00</span>
                                        </div>
                                        <div className="progress-bar-custom">
                                            <div className="progress-fill fill-income" style={{width: '83.3%'}}></div>
                                        </div>
                                    </div>

                                    {/* Budget Item 3: Utilities (Exceeded) */}
                                    <div className="budget-progress-container p-3 rounded-4 bg-dark-subtle border border-secondary mb-3">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="stat-icon-wrapper m-0" style={{width: '36px', height: '36px', background: 'rgba(255, 61, 113, 0.15)', border: '1px solid rgba(255, 61, 113, 0.3)', fontSize: '1rem', borderRadius: '8px'}}>
                                                    <i className="fa-solid fa-plug text-danger"></i>
                                                </div>
                                                <span className="fw-bold text-white">Utilities & Bills</span>
                                            </div>
                                            <span className="badge text-bg-danger font-weight-bold">Over Limit (103%)</span>
                                        </div>
                                        <div className="budget-header small text-muted mb-1">
                                            <span>Spent: $310.00</span>
                                            <span>Limit: $300.00</span>
                                        </div>
                                        <div className="progress-bar-custom">
                                            <div className="progress-fill fill-expense" style={{width: '100%'}}></div>
                                        </div>
                                    </div>

                                    {/* Budget Item 4: Entertainment (Healthy) */}
                                    <div className="budget-progress-container p-3 rounded-4 bg-dark-subtle border border-secondary mb-0">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="stat-icon-wrapper m-0" style={{width: '36px', height: '36px', background: 'rgba(0, 230, 118, 0.15)', border: '1px solid rgba(0, 230, 118, 0.3)', fontSize: '1rem', borderRadius: '8px'}}>
                                                    <i className="fa-solid fa-circle-play text-success"></i>
                                                </div>
                                                <span className="fw-bold text-white">Entertainment</span>
                                            </div>
                                            <span className="badge text-bg-success font-weight-bold">Healthy (30%)</span>
                                        </div>
                                        <div className="budget-header small text-muted mb-1">
                                            <span>Spent: $120.00</span>
                                            <span>Limit: $400.00</span>
                                        </div>
                                        <div className="progress-bar-custom">
                                            <div className="progress-fill fill-income" style={{width: '30%'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Savings Goals Tracker Column */}
                            <div className="col-lg-5">
                                <div className="glass-card-no-hover p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4 className="m-0 fs-5">Active Financial Goals</h4>
                                        <span className="small text-muted">Tracking</span>
                                    </div>

                                    {/* Goal Item 1: Emergency Fund */}
                                    <div className="p-3 rounded-4 bg-dark border border-secondary mb-3">
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
                                    </div>

                                    {/* Goal Item 2: Macbook Pro */}
                                    <div className="p-3 rounded-4 bg-dark border border-secondary mb-0">
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
                                    </div>
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
                                        <label for="budFood" className="form-label">Food & Dining Limit ($)</label>
                                        <input type="number" className="form-control" id="budFood" value="500"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="budRent" className="form-label">Rent / Housing Limit ($)</label>
                                        <input type="number" className="form-control" id="budRent" value="1200"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="budUtil" className="form-label">Utilities Limit ($)</label>
                                        <input type="number" className="form-control" id="budUtil" value="300"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="budEnt" className="form-label">Entertainment Limit ($)</label>
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
                                        <label for="goalTitle" className="form-label">Goal Name</label>
                                        <input type="text" className="form-control" id="goalTitle" placeholder="e.g. Dream Vacation, Down Payment" required/>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label for="goalTarget" className="form-label">Target Amount ($)</label>
                                            <input type="number" className="form-control" id="goalTarget" placeholder="0.00" required/>
                                        </div>
                                        <div className="col-md-6">
                                            <label for="goalStart" className="form-label">Initial Balance ($)</label>
                                            <input type="number" className="form-control" id="goalStart" placeholder="0" value="0"/>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label for="goalDate" className="form-label">Target Completion Date</label>
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
                                        <label for="depositAmount" className="form-label">Deposit Amount ($)</label>
                                        <input type="number" className="form-control" id="depositAmount" placeholder="e.g. 200.00"/>
                                        <small className="text-muted">This amount will be added to the current savings goal progress.</small>
                                    </div>
                                    <hr className="border-secondary my-3"/>
                                    <div className="mb-3">
                                        <label for="editGoalName" className="form-label">Adjust Goal Name</label>
                                        <input type="text" className="form-control" id="editGoalName" value="Emergency Fund Goal"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="editGoalTarget" className="form-label">Adjust Target ($)</label>
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