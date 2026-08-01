import "../assets/css/base.css";
import "../assets/css/reports.css";
import profile from "../assets/images/avatar-1.jpg";


function Reports () {

    return (
        <>
            {/* Hidden CSS Toggle Checkboxes */}
            <input type="checkbox" id="sidebarToggleCheck" className="d-none"/>

            {/* Mobile Header (Visible on small screens) */}
            <div className="mobile-header">
                <div className="d-flex align-items-center gap-2">
                    <div className="logo-icon" style={{width: "32px", height: "32px", borderRadius: "8px"}}>
                        <i className="fa-solid fa-wallet text-white fs-6"></i>
                    </div>
                    <span className="logo-text m-0 fs-5">FinTrack</span>
                </div>
                <label htmlFor="sidebarToggleCheck" className="btn btn-outline-custom p-2 cursor-pointer" id="sidebarToggle">
                    <i className="fa-solid fa-bars"></i>
                </label>
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
                                <a href="dashboard.html" className="nav-item-link">
                                    <i className="fa-solid fa-chart-pie"></i>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="transactions.html" className="nav-item-link">
                                    <i className="fa-solid fa-list-check"></i>
                                    <span>Transactions</span>
                                </a>
                            </li>
                            <li>
                                <a href="budget.html" className="nav-item-link">
                                    <i className="fa-solid fa-wallet"></i>
                                    <span>Budgets & Goals</span>
                                </a>
                            </li>
                            <li>
                                <a href="reports.html" className="nav-item-link active">
                                    <i className="fa-solid fa-circle-nodes"></i>
                                    <span>Reports & AI</span>
                                </a>
                            </li>
                            <li>
                                <a href="settings.html" className="nav-item-link">
                                    <i className="fa-solid fa-gear"></i>
                                    <span>Settings</span>
                                </a>
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
                        <a href="login.html" className="nav-item-link p-2 text-danger bg-transparent" style={{border: "none"}}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <span>Logout</span>
                        </a>
                    </div>
                </aside>

                {/* MAIN LAYOUT */}
                <main className="main-content">
                    {/* Header Row */}
                    <header className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 animate-fade-in">
                        <div>
                            <h1 className="m-0 fs-3">AI Reports & Statements</h1>
                            <p className="text-muted m-0">Review comprehensive metrics and print custom AI generated reports.</p>
                        </div>
                        <div className="d-flex gap-2">
                            {/* PDF Export trigger using browser print + print media stylesheet rules */}
                            <button className="btn btn-secondary">
                                <i className="fa-solid fa-file-pdf me-2"></i>Export to PDF
                            </button>
                        </div>
                    </header>

                    {/* Report Analysis Configuration Card */}
                    <section className="glass-card-no-hover p-4 mb-4 animate-fade-in" style={{animationDelay: "0.05s"}}>
                        <div className="row g-3 align-items-center">
                            <div className="col-md-3">
                                <label className="form-label text-muted small text-uppercase">Report Period</label>
                                <select className="form-select">
                                    <option>June 2026 (Last Month)</option>
                                    <option>May 2026</option>
                                    <option>April 2026</option>
                                    <option>Q2 2026 Summary</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label text-muted small text-uppercase">Insight Focus</label>
                                <select className="form-select">
                                    <option>General Spending Audit</option>
                                    <option>Savings & Goals Optimization</option>
                                    <option>Subscription Clean-Up</option>
                                </select>
                            </div>
                            <div className="col-md-4 mt-md-4 pt-md-2">
                                <div className="form-check form-switch m-0 pt-2">
                                    <input className="form-check-input" type="checkbox" id="includeCharts" checked/>
                                    <label className="form-check-label text-white small" for="includeCharts">Include charts in printed statement</label>
                                </div>
                            </div>
                            <div className="col-md-2 text-md-end mt-md-4 pt-md-2">
                                <button className="btn btn-primary w-100 py-2">
                                    <i className="fa-solid fa-arrows-rotate me-2"></i>Regenerate
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Grid Layout: AI Text Output (Left) & Printing Chart (Right) */}
                    <section className="row g-4 animate-fade-in" style={{animationDelay: "0.1s"}}>
                        {/* AI Generated Monthly Statement Card */}
                        <div className="col-lg-7">
                            <div className="glass-card-no-hover p-4 h-100">
                                <div className="d-flex align-items-center justify-content-between mb-4 border-bottom border-secondary pb-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="logo-icon" style={{width: "36px", height: "36px", borderRadius: "8px"}}>
                                            <i className="fa-solid fa-brain text-white fs-6"></i>
                                        </div>
                                        <div>
                                            <h4 className="m-0 fs-5 text-white">FinTrack AI Financial Statement</h4>
                                            <small className="text-muted">Generated on Jul 01, 2026</small>
                                        </div>
                                    </div>
                                    <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2 border border-success-subtle">Audit Ready</span>
                                </div>

                                {/* Styled AI Document Body */}
                                <div className="ai-summary-box my-3">
                                    <h5 className="mb-2 fs-6">1. Executive Overview</h5>
                                    <p className="text-muted small">
                                        During the month of June 2026, you recorded a total gross income of <strong>$5,800.00</strong> and total expenses of <strong>$2,410.20</strong>, yielding a net savings rate of <strong>58.4%</strong>. This represents a solid month of saving, comfortably exceeding the recommended 20% standard savings rule.
                                    </p>
                                </div>

                                <div className="ai-summary-box border-info-subtle my-3" style={{borderLeftColor: "var(--color-info)"}}>
                                    <h5 className="mb-2 fs-6">2. Major Spend Drivers & Behavior</h5>
                                    <p className="text-muted small">
                                        Analysis of individual spending categories reveals that your largest discretionary expense was <strong>Rent / Housing ($1,000.00)</strong>, followed by <strong>Food & Dining ($420.00)</strong>. 
                                        Utilities and miscellaneous subscriptions experienced a minor swell ($310.00 total) which is 3.5% above your defined threshold. 
                                    </p>
                                    <p className="text-muted small mb-0">
                                        <em>Alert:</em> Our logs show shopping card triggers peaked between 8:00 PM and 10:00 PM on weekends. This suggests potential impulsive online buying habits.
                                    </p>
                                </div>

                                <div className="ai-summary-box border-warning-subtle my-3" style={{borderLeftColor: "var(--color-warning)"}}>
                                    <h5 className="mb-2 fs-6">3. Strategic Budget Optimization Recommendations</h5>
                                    <ul className="text-muted small ps-3 mb-0">
                                        <li className="mb-2"><strong>Trim Utilities:</strong> Consider canceling the unused premium sports streaming package to save $22.00/month.</li>
                                        <li className="mb-2"><strong>Smart Shopping:</strong> Set up a "24-hour cooling period" for online shopping carts on weekends to reduce impulse transactions by roughly $80.00/month.</li>
                                        <li><strong>Goal Redirection:</strong> Route $200.00 from your remaining salary directly to the <strong>Macbook Pro Goal</strong> to bring it to completion a month early.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Print-ready visual chart data */}
                        <div className="col-lg-5">
                            <div className="glass-card-no-hover p-4 h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <h4 className="fs-5 mb-1">Monthly Summary Analytics</h4>
                                    <p className="text-muted small mb-4">Visual chart tracking of June cash flow metrics.</p>
                                </div>
                                
                                {/* Print Visual Chart Canvas (Static SVG) */}
                                <div className="my-auto" style={{position: "relative", height: "250px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <svg viewBox="0 0 350 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                        {/* Grid Lines */}
                                        <line x1="60" y1="20" x2="330" y2="20" stroke="rgba(124, 34, 229, 0.05)" stroke-width="1" />
                                        <line x1="60" y1="70" x2="330" y2="70" stroke="rgba(124, 34, 229, 0.05)" stroke-width="1" />
                                        <line x1="60" y1="120" x2="330" y2="120" stroke="rgba(124, 34, 229, 0.05)" stroke-width="1" />
                                        <line x1="60" y1="170" x2="330" y2="170" stroke="rgba(124, 34, 229, 0.05)" stroke-width="1" />

                                        {/* Y Axis Labels */}
                                        <text x="50" y="24" font-family="'Outfit', sans-serif" font-size="11" fill="#6b7280" text-anchor="end">$6,000</text>
                                        <text x="50" y="74" font-family="'Outfit', sans-serif" font-size="11" fill="#6b7280" text-anchor="end">$4,000</text>
                                        <text x="50" y="124" font-family="'Outfit', sans-serif" font-size="11" fill="#6b7280" text-anchor="end">$2,000</text>
                                        <text x="50" y="174" font-family="'Outfit', sans-serif" font-size="11" fill="#6b7280" text-anchor="end">$0</text>

                                        {/* Bars */}
                                        <rect x="95" y="25" width="36" height="145" rx="6" fill="#10b981" opacity="0.85" />
                                        <rect x="175" y="110" width="36" height="60" rx="6" fill="#f43f5e" opacity="0.85" />
                                        <rect x="255" y="85" width="36" height="85" rx="6" fill="#00b4d8" opacity="0.85" />

                                        {/* Value Labels on Top of Bars */}
                                        <text x="113" y="18" font-family="'Outfit', sans-serif" font-size="10" font-weight="bold" fill="#10b981" text-anchor="middle">$5.8K</text>
                                        <text x="193" y="103" font-family="'Outfit', sans-serif" font-size="10" font-weight="bold" fill="#f43f5e" text-anchor="middle">$2.4K</text>
                                        <text x="273" y="78" font-family="'Outfit', sans-serif" font-size="10" font-weight="bold" fill="#00b4d8" text-anchor="middle">$3.4K</text>

                                        {/* X Axis Labels */}
                                        <text x="113" y="192" font-family="'Outfit', sans-serif" font-size="11" fill="#9ca3af" text-anchor="middle">Income</text>
                                        <text x="193" y="192" font-family="'Outfit', sans-serif" font-size="11" fill="#9ca3af" text-anchor="middle">Expenses</text>
                                        <text x="273" y="192" font-family="'Outfit', sans-serif" font-size="11" fill="#9ca3af" text-anchor="middle">Savings</text>
                                    </svg>
                                </div>

                                <div className="mt-4 pt-3 border-top border-secondary">
                                    <div className="d-flex justify-content-between text-muted small mb-2">
                                        <span>Savings Rate</span>
                                        <span className="fw-bold">58.4%</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Invested Amount</span>
                                        <span className="fw-bold">$1,200.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}


export default Reports;