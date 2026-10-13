import { useState } from "react"
import { Link } from "react-router-dom"

function AuthPage({ mode }) {
  const isRegister = mode === "register"
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (isRegister && formData.get("password") !== formData.get("confirmPassword")) {
      setStatus("Your passwords do not match. Please check and try again.")
      return
    }

    setStatus("Authentication is not connected yet. Your information has not been sent or saved.")
  }

  return (
    <main className="auth-page">
      <header className="auth-topbar">
        <Link to="/" className="auth-brand">Service Market</Link>
        <Link to="/" className="auth-back-link">← Back to marketplace</Link>
      </header>

      <div className={`auth-layout${isRegister ? " is-register" : ""}`}>
        <section className="auth-form-panel">
          <div className="auth-form-wrap">
            <p className="eyebrow">{isRegister ? "JOIN THE MARKETPLACE" : "WELCOME BACK"}</p>
            <h1>{isRegister ? "Create your account" : "Sign in to your account"}</h1>
            <p className="auth-intro">
              {isRegister
                ? "Find trusted professionals and keep your projects moving."
                : "Pick up where you left off and get back to your projects."}
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              {isRegister && (
                <div className="auth-field">
                  <label htmlFor="auth-name">Full name</label>
                  <input id="auth-name" name="name" type="text" placeholder="Your full name" autoComplete="name" required maxLength={80} />
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="auth-email">Email address</label>
                <input id="auth-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
              </div>

              <div className="auth-field">
                <label htmlFor="auth-password">Password</label>
                <div className="auth-password-field">
                  <input
                    id="auth-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isRegister ? "At least 8 characters" : "Enter your password"}
                    autoComplete={isRegister ? "new-password" : "current-password"}
                    required
                    minLength={isRegister ? 8 : undefined}
                  />
                  <button type="button" onClick={() => setShowPassword((shown) => !shown)}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {isRegister && (
                <div className="auth-field">
                  <label htmlFor="auth-confirm-password">Confirm password</label>
                  <input
                    id="auth-confirm-password"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password again"
                    autoComplete="new-password"
                    required
                    minLength={8}
                  />
                </div>
              )}

              {isRegister ? (
                <label className="auth-checkbox">
                  <input type="checkbox" name="terms" required />
                  <span>I agree to the terms of service and privacy policy.</span>
                </label>
              ) : (
                <div className="auth-options">
                  <label className="auth-checkbox">
                    <input type="checkbox" name="remember" />
                    <span>Remember me</span>
                  </label>
                  <span className="auth-muted">Password recovery unavailable</span>
                </div>
              )}

              {status && <p className="auth-status" role="status">{status}</p>}

              <button className="auth-submit" type="submit">
                {isRegister ? "Create account" : "Sign in"}
              </button>
            </form>

            <p className="auth-switch">
              {isRegister ? "Already have an account?" : "New to Service Market?"}{" "}
              <Link to={isRegister ? "/login" : "/register"}>
                {isRegister ? "Sign in" : "Create an account"}
              </Link>
            </p>
            <p className="auth-notice">Account access will be enabled once authentication is connected.</p>
          </div>
        </section>

        <aside className="auth-visual" aria-label="A photographer at work">
          <div className="auth-visual-copy">
            <p className="eyebrow">GOOD WORK STARTS HERE</p>
            <h2>Make room for your next great project.</h2>
            <p>Meet talented professionals, share your ideas, and bring your plans to life.</p>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default AuthPage
