import {NavLink} from 'react-router-dom';
import profile from '../assets/images/avatar-1.jpg'



function Sidebar () {

    return (
        <>
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
                        <img src={profile} alt="User Avatar" className="user-avatar" id="sidebarAvatar"/>
                        <div className="overflow-hidden">
                            <h6 className="m-0 text-truncate text-white" id="sidebarName">Sophia Miller</h6>
                            <small className="text-muted text-truncate d-block" id="sidebarPlan">Premium Plan</small>
                        </div>
                    </div>
                    <NavLink to="/login" className="nav-item-link p-2 text-danger bg-transparent" style={{ border: "none" }}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>Logout</span>
                    </NavLink>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;