import {NavLink} from 'react-router-dom';
import '../assets/css/base.css'
import '../assets/css/dashboard.css'


function Dashboard () {
     return(
        <>
            <h1>Dashboard</h1>
            {/* iOS-Style "Screen Time" Toast Notification Container */}
            <div className="iphone-notification-container" id="iphoneNotificationContainer">
                {/* iOS Notification Toast (Triggered on Load) */}
                <div className="iphone-toast" id="screenTimeToast">
                    <div className="iphone-app-icon">
                        <i className="fa-solid fa-clock"></i>
                    </div>
                    <div className="flex-grow-1">
                        <div className="iphone-toast-title">
                            <span>Screen Time spending</span>
                            <span className="text-muted">now</span>
                        </div>
                        <div className="iphone-toast-body">
                            You've spent $54.20 on Dining & Dining Out in the past 2 hours. This is 15% above your daily average limit.
                        </div>
                        <div className="iphone-toast-footer">
                            Tap to set a category limit or adjust budget.
                        </div>
                    </div>
                    <button className="iphone-toast-close" onclick="closeNotification('screenTimeToast')">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* iOS Notification Toast 2 (Triggered 2s later for visual demonstration) */}
                <div className="iphone-toast" id="monthlySummaryToast" style={{display: 'none'}}>
                    <div className="iphone-app-icon" style={{background: 'linear-gradient(135deg, #ffaa00, #ff5500)'}}>
                        <i className="fa-solid fa-brain"></i>
                    </div>
                    <div className="flex-grow-1">
                        <div className="iphone-toast-title">
                            <span>FinTrack AI</span>
                            <span className="text-muted">1m ago</span>
                        </div>
                        <div className="iphone-toast-body">
                            Your monthly financial statement is ready. AI detected you saved $620 more than last month!
                        </div>
                        <div className="iphone-toast-footer">
                            Tap to view your detailed AI-generated reports.
                        </div>
                    </div>
                    <button className="iphone-toast-close" onclick="closeNotification('monthlySummaryToast')">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>

            {/* Mobile Header (Visible on small screens) */}
            <div className="mobile-header">
                <div className="d-flex align-items-center gap-2">
                    <div className="logo-icon" style={{width: '32px', height: '32px', borderRadius: '8px'}}>
                        <i className="fa-solid fa-wallet text-white fs-6"></i>
                    </div>
                    <span className="logo-text m-0 fs-5">FinTrack</span>
                </div>
                <button className="btn btn-outline-custom p-2" id="sidebarToggle">
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>

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
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="User Avatar" className="user-avatar" id="sidebarAvatar"/>
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

                {/* MAIN LAYOUT */}
                <main className="main-content">
                    {/* Topbar Row */}
                    <header className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 animate-fade-in">
                        <div>
                            <h1 className="m-0 fs-3" id="welcomeMessage">Welcome back, Sophia!</h1>
                            <p className="text-muted m-0">Here's a breakdown of your finances today.</p>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-custom" onclick="triggerNotificationSim()">
                                <i className="fa-solid fa-bell me-2"></i>Test Notifications
                            </button>
                            <NavLink to="/transactions" className="btn btn-primary">
                                <i className="fa-solid fa-plus me-2"></i>Add Transaction
                            </NavLink>
                        </div>
                    </header>

                    {/* Stat Summary Cards Grid */}
                    <section className="row g-4 mb-4 animate-fade-in">
                        {/* Card 1: Balance */}
                        <div className="col-md-4">
                            <div className="glass-card stat-card balance-theme">
                                <div className="stat-icon-wrapper">
                                    <i className="fa-solid fa-vault"></i>
                                </div>
                                <small className="text-muted d-block text-uppercase fw-semibold tracking-wider">Total Balance</small>
                                <div className="card-amount">$14,240.50</div>
                                <span className="small text-success"><i className="fa-solid fa-arrow-trend-up me-1"></i>+4.2% from last month</span>
                            </div>
                        </div>
                        {/* Card 2: Income */}
                        <div className="col-md-4">
                            <div className="glass-card stat-card income-theme">
                                <div className="stat-icon-wrapper">
                                    <i className="fa-solid fa-arrow-down-long"></i>
                                </div>
                                <small className="text-muted d-block text-uppercase fw-semibold tracking-wider">Monthly Income</small>
                                <div className="card-amount">$5,800.00</div>
                                <span className="small text-muted">Fixed salary & freelancing</span>
                            </div>
                        </div>
                        {/* Card 3: Expenses */}
                        <div className="col-md-4">
                            <div className="glass-card stat-card expense-theme">
                                <div className="stat-icon-wrapper">
                                    <i className="fa-solid fa-arrow-up-long"></i>
                                </div>
                                <small className="text-muted d-block text-uppercase fw-semibold tracking-wider">Monthly Expenses</small>
                                <div className="card-amount">$2,410.20</div>
                                <span className="small text-danger"><i className="fa-solid fa-arrow-trend-up me-1"></i>+8.5% dining increase</span>
                            </div>
                        </div>
                    </section>

                    {/* Chart Row */}
                    <section className="row g-4 mb-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
                        {/* Chart 1: Cash Flow Line Chart */}
                        <div className="col-lg-8">
                            <div className="glass-card-no-hover p-4 h-100">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="m-0 fs-5">Income vs Expenses Flow</h4>
                                    <select className="form-select w-auto py-1 px-2 fs-7 bg-dark border-secondary text-white">
                                        <option>Last 6 Months</option>
                                        <option>Last Year</option>
                                    </select>
                                </div>
                                <div style={{position: 'relative', height: '300px', width: '100%'}}>
                                    <canvas id="cashFlowChart"></canvas>
                                </div>
                            </div>
                        </div>
                        {/* Chart 2: Category Doughnut Chart */}
                        <div className="col-lg-4">
                            <div className="glass-card-no-hover p-4 h-100">
                                <h4 className="m-0 fs-5 mb-3">Expense Distribution</h4>
                                <div style={{position: 'relative', height: '260px', width: '100%', margin: '0 auto'}}>
                                    <canvas id="categoryChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Grid Bottom Row: AI Insights & Recent Transactions */}
                    <section className="row g-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
                        {/* Financial Calendar Panel */}
                        <div className="col-xl-6">
                            <div className="glass-card-no-hover p-4 h-100">
                                <div className="calendar-header mb-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="logo-icon" style={{width: '32px', height: '32px', borderRadius: '8px'}}>
                                            <i className="fa-solid fa-calendar-days text-white fs-6"></i>
                                        </div>
                                        <h4 className="m-0 fs-5" id="monthYearDisplay">July 2026</h4>
                                    </div>
                                    <div className="d-flex gap-1">
                                        <button className="btn btn-sm btn-outline-custom p-1" onclick="changeMonth(-1)" title="Previous Month">
                                            <i className="fa-solid fa-chevron-left px-1"></i>
                                        </button>
                                        <button className="btn btn-sm btn-outline-custom py-1 px-2" onclick="goToToday()">Today</button>
                                        <button className="btn btn-sm btn-outline-custom p-1" onclick="changeMonth(1)" title="Next Month">
                                            <i className="fa-solid fa-chevron-right px-1"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Calendar Weekdays Header */}
                                <div className="calendar-grid-header mt-2">
                                    <div>Sun</div>
                                    <div>Mon</div>
                                    <div>Tue</div>
                                    <div>Wed</div>
                                    <div>Thu</div>
                                    <div>Fri</div>
                                    <div>Sat</div>
                                </div>

                                {/* Calendar Grid days */}
                                <div className="calendar-grid" id="calendarDays">
                                    {/* Days will be generated by JS */}
                                </div>
                            </div>
                        </div>

                        {/* Recent Transactions Summary List */}
                        <div className="col-xl-6">
                            <div className="glass-card-no-hover p-4 h-100">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="m-0 fs-5">Recent Transactions</h4>
                                    <a href="transactions.html" className="small text-decoration-none">View All</a>
                                </div>
                                <div className="table-responsive">
                                    <table className="table custom-table mb-0">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Details</th>
                                                <th>Category</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Jul 15, 2026</td>
                                                <td>
                                                    <span className="fw-bold d-block">Whole Foods Market</span>
                                                    <small className="text-muted">Debit Card Purchase</small>
                                                </td>
                                                <td><span className="badge-expense text-uppercase">Food</span></td>
                                                <td className="text-danger fw-bold">-$84.20</td>
                                            </tr>
                                            <tr>
                                                <td>Jul 14, 2026</td>
                                                <td>
                                                    <span className="fw-bold d-block">Monthly Freelance Salary</span>
                                                    <small className="text-muted">Direct Deposit</small>
                                                </td>
                                                <td><span className="badge-income text-uppercase">Income</span></td>
                                                <td className="text-success fw-bold">+$1,500.00</td>
                                            </tr>
                                            <tr>
                                                <td>Jul 12, 2026</td>
                                                <td>
                                                    <span className="fw-bold d-block">Netflix Subscription</span>
                                                    <small className="text-muted">Recurring Payment</small>
                                                </td>
                                                <td><span className="badge-expense text-uppercase">Utility</span></td>
                                                <td className="text-danger fw-bold">-$15.49</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            {/* Date Details Modal popup */}
            <div className="modal fade" id="dateDetailsModal" tabindex="-1" aria-labelledby="dateDetailsModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content glass-card-no-hover border-light-subtle" style={{background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(25px)', border: '1px solid rgba(255,255,255,0.15)'}}>
                        <div className="modal-header border-bottom border-light-subtle">
                            <div>
                                <h5 className="modal-title fw-bold text-dark" id="dateDetailsModalLabel">July 15, 2026</h5>
                                <small className="text-muted" id="modalDayOfWeek">Wednesday</small>
                            </div>
                            <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* List of Transactions */}
                            <div className="modal-trans-list" id="modalTransList">
                                {/* Injected by JS */}
                            </div>
                        </div>
                        {/* Day Financial Summary Footer */}
                        <div className="modal-footer border-top border-light-subtle bg-light-subtle d-flex flex-column align-items-stretch p-3 rounded-bottom-4">
                            <div className="d-flex justify-content-between mb-1">
                                <span className="text-muted small">Total Income:</span>
                                <span className="text-success fw-bold small" id="modalSumIncome">+$0.00</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted small">Total Expenses:</span>
                                <span className="text-danger fw-bold small" id="modalSumExpense">-$0.00</span>
                            </div>
                            <div className="d-flex justify-content-between border-top pt-2">
                                <span className="fw-bold text-dark">Net Flow:</span>
                                <span className="fw-bold" id="modalSumNet">$0.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Dashboard   
