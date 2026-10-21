import { useState } from 'react'
import { Link } from 'react-router-dom'

function ResendVerification({ setLoginError }) {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setSuccess('')
    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        'https://stake-meeting-enemies-purple.trycloudflare.com/api/auth/resend-verification',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      )

      const message = await response.text()

      if (!response.ok) {
        throw new Error(message || 'Failed to resend verification email')
      }

      setSuccess(message || 'Verification email sent successfully.')
      setEmail('')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
     <div className="y2k-login-page">
    <div className="y2k-window">

      <div className="y2k-titlebar">
        <span>Todo_ing Verification</span>

        <div className="y2k-window-controls">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="y2k-window-body">

      <div className="y2k-login-heading">
        <h2>Resend Verification</h2>
        <p>Enter your email and we’ll send you a new verification link</p>
      </div>

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="y2k-field">
        <label>Email</label>

        <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
        />
        </div>

        <div className="y2k-actions">
        <button
            type="submit"
            className="y2k-button y2k-button-primary"
            disabled={loading}
        >
            {loading ? 'Sending...' : 'Resend Verification'}
        </button>
        </div>
      </form>

      <div className="y2k-links y2k-single-link">
       <Link
        to="/"
        onClick={() => setLoginError('')}
        >
        Back to Login
         </Link>
      </div>

      
      </div>
    </div>
  </div>
)
}

export default ResendVerification