import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Page d'inscription
const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const { register, error, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Rediriger si déjà connecté
  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      return
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        role: formData.role
      })
      navigate('/dashboard')
    } catch (err) {
      // L'erreur est gérée dans le contexte
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      formData.password.length >= 8 
    )
  }

  return (
    <div className="form-container">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
        📝 Register
      </h2>
      
      {error && (
        <div className="alert alert-error">
          <strong>Erreur:</strong> {error}
          {error.details && (
            <ul style={{ marginTop: '0.5rem', marginBottom: '0' }}>
              {error.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          )}
          {error.password_received && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
              <strong>Mot de passe testé:</strong> {error.password_received}
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemple@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={showPassword ? "Enter your password" : "••••••••"}
              required
              minLength={8}
              style={{ 
                paddingRight: '3rem',
                width: '100%'
              }}
            />
            <button
              type="button"
              onClick={togglePassword}
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: '#666',
                padding: '0.25rem'
              }}
              title={showPassword ? "Hide your password" : "Show yourpqssword"}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {formData.password && (
            <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              <div style={{ 
                color: formData.password.length >= 8 ? '#28a745' : '#dc3545' 
              }}>
                ✓ {formData.password.length >= 8 ? '8+ caracters' : 'Minimum 8 caracters'}
              </div>
              
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm your password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={showConfirmPassword ? "Confirm your password" : "••••••••"}
              required
              minLength={8}
              style={{ 
                paddingRight: '3rem',
                width: '100%'
              }}
            />
            <button
              type="button"
              onClick={toggleConfirmPassword}
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: '#666',
                padding: '0.25rem'
              }}
              title={showConfirmPassword ? "Hide your password" : "Show your password"}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Passwords Not corresponding
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="student">👨‍🎓 Student</option>
            <option value="vendor">🏪 Vendor</option>
          </select>
          <div style={{ 
            fontSize: '0.75rem', 
            color: '#666', 
            marginTop: '0.25rem' 
          }}>
            💡 The role admin cannot be attributed on register
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary btn-block"
          disabled={loading || !isFormValid()}
        >
          {loading ? 'Register in progress...' : 'Register'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <p>
          Already have an account ?{' '}
          <Link to="/login" style={{ color: '#007bff' }}>
            Login
          </Link>
        </p>
      </div>

    </div>
  )
}

export default Register
