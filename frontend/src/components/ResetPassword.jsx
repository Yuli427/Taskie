import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'


function ResetPassword(){
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [newPassword, setNewPassword] = useState('')
  const [success, setSuccess] = useState('')
const [error, setError] = useState('')

async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')
    try{
        const response= await fetch(
           'https://stake-meeting-enemies-purple.trycloudflare.com/api/auth/reset-password',
        {
             method: 'POST',
             headers: {
          'Content-Type': 'application/json',
           },
          body: JSON.stringify({
          token: token,
          newPassword: newPassword,
           }),
        }
        )
            const message = await response.text()

            if (!response.ok) {
            throw new Error(message || 'Password reset failed')
            }

        setSuccess(message)
        setNewPassword('')
        } catch (error) {
            setError(error.message)
            }

  }
    return(
        
        <div className="container mt-5">
           <h2 className="mb-3">Reset Password</h2>
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
            <input
                type="password"
                className="form-control mb-3"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                />
            <button
            type="submit"
            className="btn btn-primary"
            >
            Reset Password
            </button>
           </form>

        </div>
    )
}

export default ResetPassword
