import { Link } from 'react-router-dom'


function Login({
  usernameOrEmail,
  setUsernameOrEmail,
  password,
  setPassword,
  handleLogin,
  setShowRegister,
  setRegisterSubmitted,
  loginError,
  setLoginError,
  setRegisterSuccess,
  setRegisterError

}) {
  return (
    <div className="y2k-login-page">
    <div className="y2k-window">

      <div className="y2k-titlebar">
        <span>Taskie Login</span>

        <div className="y2k-window-controls">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <form onSubmit={handleLogin} className="y2k-window-body">
      {loginError&&(
        <div className="alert alert-danger">
          {loginError}
        </div>
      )}
      <div className="y2k-login-heading">
        <h2>Welcome Back</h2>
      </div>

      <div className="y2k-field">
        <label>Username or Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter username or email"
          value={usernameOrEmail}
          onChange={(event) => setUsernameOrEmail(event.target.value)}
        />
      </div>

      <div className="y2k-field">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className="y2k-links">
        <Link to="/forgot-password">
          Forgot Password?
        </Link>

        <Link to="/resend-verification">
          Resend Verification
        </Link>
      </div>

      <div className="y2k-actions">
        <button type="submit" className="y2k-button y2k-button-primary">
          Login
        </button>

        <button
          type="button"
          className="y2k-button y2k-button-secondary"
          onClick={() => {
            setLoginError('')
            setRegisterSuccess('')
            setRegisterError('')
            setRegisterSubmitted(false)
            setShowRegister(true)
          }}
        >
          Create an Account
        </button>
      </div>
      
    </form>
    </div>
  </div>
  )
}

export default Login