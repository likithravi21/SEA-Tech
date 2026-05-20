import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Phone, Mail, MessageCircle, ArrowRight, MapPin } from 'lucide-react'
import '../styles/Footer.css'
import { FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 320)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="footer-top-container">

      <div className="footer-top">

        <div className="brand">
          <div className="brand-logo-row">
            <img src="/assets/SEA-Tech-logo.png" alt="SEA-Tech" className="footer-logo" />
          </div>
          <p className="brand-tagline">Sustainability Meets Strategic Innovation</p>
        </div>

        <div className="footer-center">
          <span>Sustainability · Agriculture · Energy</span>
        </div>

        <div className="location">
          <MapPin size={20} color="#7FB069" />
          <div>
            <p className="loc-label">Location</p>
            <p className="loc-value">Bangalore, Karnataka, India</p>
          </div>
        </div>
      </div>

      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 SEA-Tech Innovations LLP. All rights reserved.</span>
      </div>

    </footer>
  )

}
