import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react'
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
      <div className="footer-top">
        <div className="brand">
          <img src="/assets/SEA-Tech-logo.png" alt="loading.." />
          <p className="footer-brand-tagline">Sustainability Meets Strategic Innovation</p>

        </div>
        <div className="contact-items">
          <div className="contact-item"> <a href="tel:8828208244" className="contact__link">
            <div className="contact__link-icon">
              <Phone size={17} color="#7FB069" />
            </div>
            <div>
              <div className="contact__link-label">Call</div>
              <div className="contact__link-value">8828208244</div>
            </div>
          </a></div>
          <div className="contact-item"> <a
            href="https://wa.me/9969608290"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link"
          >
            <div className="contact__link-icon">
              <FaWhatsapp size={17} color="#7FB069" />
            </div>
            <div>
              <div className="contact__link-label">WhatsApp</div>
              <div className="contact__link-value">9969608290</div>
            </div>
          </a></div>
          <div className="contact-item"> <a href="mailto:office@seatech-innovations.com" className="contact__link">
            <div className="contact__link-icon">
              <Mail size={17} color="#7FB069" />
            </div>
            <div>
              <div className="contact__link-label">Email</div>
              <div className="contact__link-value">office@seatech-innovations.com</div>
            </div>
          </a></div>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 SEA-Tech Innovations LLP. All rights reserved.</span>
      </div>
    </footer>
  )
}
