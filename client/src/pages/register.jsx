import '../assets/css/base.css'
import '../assets/css/register.css'

function Register () {

    return (
        <>
            {/* Floating Orbs Background */}
            <div className="glowing-orbs">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
            </div>

            <div className="auth-wrapper">
                <div className="auth-container" id="authContainer">
                    {/* FinTrack Branding Header */}
                    <div className="text-center mb-4 animate-fade-in">
                        <div className="d-inline-flex align-items-center justify-content-center logo-icon mb-2">
                            <i className="fa-solid fa-wallet text-white fs-4"></i>
                        </div>
                        <h2 className="logo-text m-0">FinTrack</h2>
                        <p className="text-muted mt-1">Smart Financial Insights & Spending Analytics</p>
                    </div>

                    {/* Register Card Container */}
                    <div className="auth-card-wrapper">
                        {/* REGISTER CARD */}
                        <div className="glass-card p-4 auth-form-card register-card animate-fade-in">
                            <div className="auth-tabs">
                                <a href="login.html" className="auth-tab-btn text-center text-decoration-none" id="tabLogin">Sign In</a>
                                <a href="register.html" className="auth-tab-btn active text-center text-decoration-none" id="tabRegister">Sign Up</a>
                            </div>

                            <form action="login.html">
                                <div className="mb-3">
                                    <label for="regName" className="form-label">Full Name</label>
                                    <div className="input-group">
                                        <span className="input-group-text border-end-0">
                                            <i className="fa-regular fa-user"></i>
                                        </span>
                                        <input type="text" className="form-control border-start-0" id="regName" placeholder="John Doe" required/>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label for="regEmail" className="form-label">Email Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text border-end-0">
                                            <i className="fa-regular fa-envelope"></i>
                                        </span>
                                        <input type="email" className="form-control border-start-0" id="regEmail" placeholder="name@example.com" required/>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label for="regPassword" className="form-label">Create Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text border-end-0">
                                            <i className="fa-solid fa-lock"></i>
                                        </span>
                                        <input type="password" className="form-control border-start-0" id="regPassword" placeholder="Minimum 8 characters" required/>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="form-check m-0">
                                        <input className="form-check-input" type="checkbox" id="termsCheck" required/>
                                        <label className="form-check-label text-muted small" for="termsCheck">
                                            I agree to the <a href="#" className="text-decoration-none">Terms of Service</a> & <a href="#" className="text-decoration-none">Privacy Policy</a>
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-secondary w-100 mb-3 py-2">
                                    Create Account <i className="fa-solid fa-user-plus ms-2"></i>
                                </button>
                                
                                <div className="text-center">
                                    <span className="text-muted small">Already have an account? </span>
                                    <a href="login.html" className="small font-weight-bold">Login Here</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Register