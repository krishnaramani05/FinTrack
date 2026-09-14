import {NavLink} from 'react-router-dom';
import React from "react";
import { useState, useEffect } from "react";
import "../assets/css/base.css";
import "../assets/css/settings.css";
import avatar1 from "../assets/images/avatar-1.jpg";
import avatar2 from "../assets/images/avatar-2.jpg";
import avatar3 from "../assets/images/avatar-3.jpg";
import avatar4 from "../assets/images/avatar-4.jpg";
import Sidebar from "../components/Sidebar.jsx";



function Settings () {

    const [profileName, setProfileName] = useState("Sophia Miller");
    const [profileEmail, setProfileEmail] = useState("sophia.miller@example.com");
    const [selectedAvatar, setSelectedAvatar] = useState(avatar1);
    const [customAvatarUrl, setCustomAvatarUrl] = useState("");
    const [activeTab, setActiveTab] = useState("account");

    // Security Tab
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Preferences Tab
    const [currency, setCurrency] = useState("USD");
    const [screenTimeAlerts, setScreenTimeAlerts] = useState(true);
    const [aiInsights, setAiInsights] = useState(true);

    useEffect(() => {
        const savedProfile = localStorage.getItem("fintrackProfile");

        if (savedProfile) {
            const profile = JSON.parse(savedProfile);

            setProfileName(profile.name);
            setProfileEmail(profile.email);
            setSelectedAvatar(profile.avatar);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        localStorage.setItem(
            "fintrackProfile",
            JSON.stringify({
                name: profileName,
                email: profileEmail,
                avatar: selectedAvatar
            })
        );
        window.dispatchEvent(new Event("profileUpdated"));
    }

    // Security Tab
    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert("Please fill in all password fields.");
            return;
        }

         const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/;

        if (!passwordRegex.test(newPassword)) {
            alert("Password must contain a letter, number, and special character.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }
        alert("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    // Preferences tab
    const handleSavePreferences = (e) => {
        e.preventDefault();

        localStorage.setItem(
            "fintrackPreferences",
            JSON.stringify({
                currency: currency,
                screenTimeAlerts: screenTimeAlerts,
                aiInsights: aiInsights
            })
        );

        alert("Preferences saved!");
    };

    useEffect(() => {
        const savedPreferences = localStorage.getItem("fintrackPreferences");

        if (savedPreferences) {
            const preferences = JSON.parse(savedPreferences);

            setCurrency(preferences.currency);
            setScreenTimeAlerts(preferences.screenTimeAlerts);
            setAiInsights(preferences.aiInsights);
        }
    }, []);
        
    return (
        <>
            {/* iOS-Style Toast Notification Container */}
            {/* <div className="iphone-notification-container" id="iphoneNotificationContainer"></div> */}

            {/* Mobile Header (Visible on small screens) */}
            {/* <div className="mobile-header">
                <div className="d-flex align-items-center gap-2">
                    <div className="logo-icon" style={{width: '32px', height: '32px', borderRadius: '8px'}}>
                        <i className="fa-solid fa-wallet text-white fs-6"></i>
                    </div>
                    <span className="logo-text m-0 fs-5">FinTrack</span>
                </div>
                <label htmlFor="sidebarToggleCheck" className="btn btn-outline-custom p-2 cursor-pointer" id="sidebarToggle">
                    <i className="fa-solid fa-bars"></i>
                </label>
            </div> */}

            <div className="app-container">
                {/* SIDEBAR */}
                <Sidebar/>

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
                        <button onClick={() => setActiveTab("account")}
                            className={`settings-tab-btn ${activeTab === "account" ? "active" : ""}`}
                        >
                            <i className="fa-regular fa-user me-2"></i>
                            Account Details
                        </button>

                        <button
                            onClick={() => setActiveTab("security")}
                            className={`settings-tab-btn ${ activeTab === "security" ? "active" : "" }`}
                        >
                            <i className="fa-solid fa-lock me-2"></i>
                            Security
                        </button>

                        <button
                            onClick={() => setActiveTab("preferences")}
                            className={`settings-tab-btn ${ activeTab === "preferences" ? "active" : "" }`}
                        >
                            <i className="fa-solid fa-sliders me-2"></i>
                            Preferences
                        </button>
                    </div>

                    {/* SETTINGS PANELS CONTAINER */}
                    <div className="row animate-fade-in" style={{animationDelay: '0.1s'}}>
                        <div className="col-lg-8 col-md-12 col-12">
                            
                            {/* TAB 1: Account Details */}
                            {activeTab === "account" && (
                                <section id="account-details" className="settings-panel">
                                    <div className="settings-card mb-4">
                                        <h4 className="mb-4"><i className="fa-regular fa-id-card text-primary me-2"></i>Profile Information</h4>
                                        <form id="profileForm" onSubmit={handleSubmit}>
                                            <div className="row g-3 mb-4">
                                                <div className="col-md-6 col-12">
                                                    <label htmlFor="profileName" className="form-label">Full Name</label>
                                                    <input type="text" className="form-control" id="profileName" placeholder="Enter Full Name" value={profileName} onChange={(e) => setProfileName(e.target.value)} required/>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <label htmlFor="profileEmail" className="form-label">Email Address</label>
                                                    <input type="email" className="form-control" id="profileEmail" placeholder="name@example.com" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} required/>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label d-block">Choose Profile Avatar</label>
                                                <div className="avatar-select-grid mb-3" id="avatarGrid">
                                                    <div className={`avatar-option ${selectedAvatar === avatar1 ? "selected" : ""}`}
                                                        onClick={() => setSelectedAvatar(avatar1)}>
                                                        <img src={avatar1} alt="Avatar Option 1"/>
                                                        <div className="avatar-check-icon">
                                                            <i className="fa-solid fa-check"></i>
                                                        </div>
                                                    </div>
                                                    <div className={`avatar-option ${selectedAvatar === avatar2 ? "selected" : ""}`}
                                                        onClick={() => setSelectedAvatar(avatar2)}>
                                                        <img src={avatar2} alt="Avatar Option 2"/>
                                                        <div className="avatar-check-icon">
                                                            <i className="fa-solid fa-check"></i>
                                                        </div>
                                                    </div>
                                                    <div className={`avatar-option ${selectedAvatar === avatar3 ? "selected" : ""}`}
                                                        onClick={() => setSelectedAvatar(avatar3)}>
                                                        <img src={avatar3} alt="Avatar Option 3"/>
                                                        <div className="avatar-check-icon">
                                                            <i className="fa-solid fa-check"></i>
                                                        </div>
                                                    </div>
                                                    <div className={`avatar-option ${selectedAvatar === avatar4 ? "selected" : ""}`}
                                                        onClick={() => setSelectedAvatar(avatar4)}>
                                                        <img src={avatar4} alt="Avatar Option 4"/>
                                                        <div className="avatar-check-icon">
                                                            <i className="fa-solid fa-check"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <label htmlFor="customAvatarUrl" className="form-label small text-muted">Or enter a custom Avatar image URL</label>
                                                <input 
                                                    type="url"
                                                    className="form-control"
                                                    id="customAvatarUrl"
                                                    value={customAvatarUrl} 
                                                    onChange={(e) => {setCustomAvatarUrl(e.target.value); setSelectedAvatar(e.target.value);}} 
                                                    placeholder="https://images.unsplash.com/photo-..." />
                                            </div>

                                            <div className="border-top pt-3 text-end">
                                                <button type="submit" className="btn btn-primary">
                                                    <i className="fa-regular fa-floppy-disk me-2"></i>Save Account Settings
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </section>
                            )}

                            {/* TAB 2: Security (Password Update) */}
                            {activeTab === "security" && (
                                <section id="security-settings" className="settings-panel">
                                    <div className="settings-card mb-4">
                                        <h4 className="mb-4"><i className="fa-solid fa-shield-halved text-primary me-2"></i>Update Password</h4>
                                        <form onSubmit={handlePasswordUpdate}>
                                            <div className="mb-3">
                                                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                                <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" className="form-control" id="currentPassword" placeholder="Enter current password" required/>
                                            </div>
                                            <div className="row g-3 mb-4">
                                                <div className="col-md-6 col-12">
                                                    <label htmlFor="newPassword" className="form-label">New Password</label>
                                                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" className="form-control" id="newPassword" placeholder="Minimum 8 characters" required/>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                                                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" id="confirmPassword" placeholder="Confirm new password" required/>
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
                            )}

                            {/* TAB 3: Preferences */}
                            {activeTab === "preferences" && (
                                <section id="app-preferences" className="settings-panel">
                                    <div className="settings-card mb-4">
                                        <h4 className="mb-4"><i className="fa-solid fa-sliders text-primary me-2"></i>App Preferences</h4>
                                        <form onSubmit={handleSavePreferences}>
                                            <div className="mb-4">
                                                <label htmlFor="appCurrency" className="form-label">Primary Currency</label>
                                                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="form-select" id="appCurrency">
                                                    <option value="USD">USD ($) - United States Dollar</option>
                                                    <option value="INR">INR (₹) - Indian Rupee</option>
                                                </select>
                                            </div>

                                            <h5 className="mb-3 mt-4"><i className="fa-regular fa-bell text-secondary me-2"></i>Notification Alerts</h5>
                                            <div className="glass-card-no-hover p-3 mb-3">
                                                <div className="form-check form-switch d-flex justify-content-between align-items-center p-0">
                                                    <div>
                                                        <label className="form-check-label h6 m-0" htmlFor="notifyScreenTime">Screen Time Alerts</label>
                                                        <p className="text-muted small m-0">Send instant browser toast warnings when daily category spending limit is exceeded.</p>
                                                    </div>
                                                    <input checked={screenTimeAlerts} onChange={(e) => setScreenTimeAlerts(e.target.checked)} className="form-check-input ms-3" type="checkbox"/>
                                                </div>
                                            </div>

                                            <div className="glass-card-no-hover p-3 mb-4">
                                                <div className="form-check form-switch d-flex justify-content-between align-items-center p-0">
                                                    <div>
                                                        <label className="form-check-label h6 m-0" htmlFor="notifyAI">AI Financial Coach Insights</label>
                                                        <p className="text-muted small m-0">Receive monthly personalized smart statement updates.</p>
                                                    </div>
                                                    <input  checked={aiInsights} onChange={(e) => setAiInsights(e.target.checked)} className="form-check-input ms-3" type="checkbox"/>
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
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}


export default Settings
