import {NavLink} from 'react-router-dom';
import "../assets/css/base.css";
import "../assets/css/settings.css";
import avatar1 from "../assets/images/avatar-1.jpg";
import avatar2 from "../assets/images/avatar-2.jpg";
import avatar3 from "../assets/images/avatar-3.jpg";
import avatar4 from "../assets/images/avatar-4.jpg";



function Settings () {
    
    return (
        <>
            {/* Hidden CSS Toggle Checkboxes & Radio Tabs */}
            <input type="checkbox" id="sidebarToggleCheck" className="d-none"/>
            <input type="radio" id="tab-account" name="settings-tabs" className="tab-input" checked/>
            <input type="radio" id="tab-security" name="settings-tabs" className="tab-input"/>
            <input type="radio" id="tab-preferences" name="settings-tabs" className="tab-input"/>
            <input type="radio" id="tab-data" name="settings-tabs" className="tab-input"/>

            {/* iOS-Style Toast Notification Container */}
            <div className="iphone-notification-container" id="iphoneNotificationContainer"></div>

            {/* Mobile Header (Visible on small screens) */}
            <div className="mobile-header">
                <div className="d-flex align-items-center gap-2">
                    <div className="logo-icon" style={{width: '32px', height: '32px', borderRadius: '8px'}}>
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
                            <img src={avatar1} alt="User Avatar" className="user-avatar" id="sidebarAvatar"/>
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
                    {/* Header Row */}
                    <header className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 animate-fade-in">
                        <div>
                            <h1 className="m-0 fs-3">Settings</h1>
                            <p className="text-muted m-0">Customize your account, application preferences, and settings.</p>
                        </div>
                    </header>

                    {/* Settings Sub-Navigation tabs */}
                    <div className="d-flex gap-2 border-bottom border-secondary-subtle pb-2 mb-4 animate-fade-in" style={{animationDelay: '0.05s'}}>
                        <label htmlFor="tab-account" id="btn-account" className="settings-tab-btn cursor-pointer">
                            <i className="fa-regular fa-user me-2"></i>Account Details
                        </label>
                        <label htmlFor="tab-security" id="btn-security" className="settings-tab-btn cursor-pointer">
                            <i className="fa-solid fa-lock me-2"></i>Security
                        </label>
                        <label htmlFor="tab-preferences" id="btn-preferences" className="settings-tab-btn cursor-pointer">
                            <i className="fa-solid fa-sliders me-2"></i>Preferences
                        </label>
                        <label htmlFor="tab-data" id="btn-data" className="settings-tab-btn cursor-pointer">
                            <i className="fa-solid fa-triangle-exclamation me-2"></i>Data Control
                        </label>
                    </div>

                    {/* SETTINGS PANELS CONTAINER */}
                    <div className="row animate-fade-in" style={{animationDelay: '0.1s'}}>
                        <div className="col-lg-8 col-md-12 col-12">
                            
                            {/* TAB 1: Account Details */}
                            <section id="account-details" className="settings-panel">
                                <div className="settings-card mb-4">
                                    <h4 className="mb-4"><i className="fa-regular fa-id-card text-primary me-2"></i>Profile Information</h4>
                                    <form id="profileForm">
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-6 col-12">
                                                <label htmlFor="profileName" className="form-label">Full Name</label>
                                                <input type="text" className="form-control" id="profileName" placeholder="Enter Full Name" value="Sophia Miller" required/>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <label htmlFor="profileEmail" className="form-label">Email Address</label>
                                                <input type="email" className="form-control" id="profileEmail" placeholder="name@example.com" value="sophia.miller@example.com" required/>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label d-block">Choose Profile Avatar</label>
                                            <div className="avatar-select-grid mb-3" id="avatarGrid">
                                                <div className="avatar-option selected">
                                                    <img src={avatar1} alt="Avatar Option 1"/>
                                                    <div className="avatar-check-icon">
                                                        <i className="fa-solid fa-check"></i>
                                                    </div>
                                                </div>
                                                <div className="avatar-option">
                                                    <img src={avatar2} alt="Avatar Option 2"/>
                                                    <div className="avatar-check-icon">
                                                        <i className="fa-solid fa-check"></i>
                                                    </div>
                                                </div>
                                                <div className="avatar-option">
                                                    <img src={avatar3} alt="Avatar Option 3"/>
                                                    <div className="avatar-check-icon">
                                                        <i className="fa-solid fa-check"></i>
                                                    </div>
                                                </div>
                                                <div className="avatar-option">
                                                    <img src={avatar4} alt="Avatar Option 4"/>
                                                    <div className="avatar-check-icon">
                                                        <i className="fa-solid fa-check"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <label htmlFor="customAvatarUrl" className="form-label small text-muted">Or enter a custom Avatar image URL</label>
                                            <input type="url" className="form-control" id="customAvatarUrl" placeholder="https://images.unsplash.com/photo-..."/>
                                        </div>

                                        <div className="border-top pt-3 text-end">
                                            <button type="submit" className="btn btn-primary">
                                                <i className="fa-regular fa-floppy-disk me-2"></i>Save Account Settings
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </section>

                            {/* TAB 2: Security (Password Update) */}
                            <section id="security-settings" className="settings-panel">
                                <div className="settings-card mb-4">
                                    <h4 className="mb-4"><i className="fa-solid fa-shield-halved text-primary me-2"></i>Update Password</h4>
                                    <form id="passwordForm">
                                        <div className="mb-3">
                                            <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                            <input type="password" className="form-control" id="currentPassword" placeholder="Enter current password" required/>
                                        </div>
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-6 col-12">
                                                <label htmlFor="newPassword" className="form-label">New Password</label>
                                                <input type="password" className="form-control" id="newPassword" placeholder="Minimum 8 characters" required/>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                                                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm new password" required/>
                                            </div>
                                        </div>

                                        <div className="border-top pt-3 text-end">
                                            <button type="submit" className="btn btn-primary">
                                                <i className="fa-solid fa-key me-2"></i>Update Password
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </section>

                            {/* TAB 3: Preferences */}
                            <section id="app-preferences" className="settings-panel">
                                <div className="settings-card mb-4">
                                    <h4 className="mb-4"><i className="fa-solid fa-sliders text-primary me-2"></i>App Preferences</h4>
                                    <form id="preferencesForm">
                                        <div className="mb-4">
                                            <label htmlFor="appCurrency" className="form-label">Primary Currency</label>
                                            <select className="form-select" id="appCurrency">
                                                <option value="USD">USD ($) - United States Dollar</option>
                                                <option value="EUR">EUR (€) - Euro</option>
                                                <option value="GBP">GBP (£) - British Pound Sterling</option>
                                                <option value="INR">INR (₹) - Indian Rupee</option>
                                                <option value="JPY">JPY (¥) - Japanese Yen</option>
                                            </select>
                                        </div>

                                        <h5 className="mb-3 mt-4"><i className="fa-regular fa-bell text-secondary me-2"></i>Notification Alerts</h5>
                                        <div className="glass-card-no-hover p-3 mb-3">
                                            <div className="form-check form-switch d-flex justify-content-between align-items-center p-0">
                                                <div>
                                                    <label className="form-check-label h6 m-0" htmlFor="notifyScreenTime">Screen Time Alerts</label>
                                                    <p className="text-muted small m-0">Send instant browser toast warnings when daily category spending limit is exceeded.</p>
                                                </div>
                                                <input className="form-check-input ms-3" type="checkbox" role="switch" id="notifyScreenTime" checked/>
                                            </div>
                                        </div>

                                        <div className="glass-card-no-hover p-3 mb-4">
                                            <div className="form-check form-switch d-flex justify-content-between align-items-center p-0">
                                                <div>
                                                    <label className="form-check-label h6 m-0" htmlFor="notifyAI">AI Financial Coach Insights</label>
                                                    <p className="text-muted small m-0">Receive monthly personalized smart statement updates.</p>
                                                </div>
                                                <input className="form-check-input ms-3" type="checkbox" role="switch" id="notifyAI" checked/>
                                            </div>
                                        </div>

                                        <div className="border-top pt-3 text-end">
                                            <button type="submit" className="btn btn-primary">
                                                <i className="fa-regular fa-floppy-disk me-2"></i>Save Preferences
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </section>

                            {/* TAB 4: Data Control */}
                            <section id="data-control" className="settings-panel">
                                <div className="settings-card border-danger mb-4">
                                    <h4 className="text-danger mb-4"><i className="fa-solid fa-triangle-exclamation me-2"></i>Danger Zone</h4>
                                    <p className="text-muted">Once you perform any of these actions, there is no going back. Please be absolutely certain.</p>
                                    
                                    <div className="glass-card-no-hover p-3 border-danger-subtle d-flex justify-content-between align-items-center flex-wrap gap-3">
                                        <div>
                                            <h6 className="text-danger m-0">Reset Account Configuration Data</h6>
                                            <p className="text-muted small m-0">Restores profile data, avatars, and configuration options back to defaults.</p>
                                        </div>
                                        <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmResetModal">
                                            <i className="fa-solid fa-rotate-left me-2"></i>Reset Settings
                                        </button>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </main>
            </div>

            {/* Confirm Reset Data Modal */}
            <div className="modal fade" id="confirmResetModal" tabindex="-1" aria-labelledby="confirmResetModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content glass-card-no-hover border-danger" style={{ background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(25px)" }}>
                        <div className="modal-header border-bottom border-danger-subtle">
                            <h5 className="modal-title text-danger" id="confirmResetModalLabel"><i className="fa-solid fa-triangle-exclamation me-2"></i>Reset Configuration Data?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-dark">
                            This will clear all changes to your Name, Email, Custom Avatar, and Preferences, reverting them to defaults.
                        </div>
                        <div className="modal-footer border-top-0 d-flex gap-2">
                            <button type="button" className="btn btn-outline-custom flex-grow-1" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger flex-grow-1" data-bs-dismiss="modal">Confirm Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Settings
