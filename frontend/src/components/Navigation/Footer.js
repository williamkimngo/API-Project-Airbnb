import React from "react";
import './Footer.css'

function Footer() {
  return (
    <div className="footer-main">
      <div className="footer-inner">
        <div className="footer-left">© 2022 ballbnb; for demonstration purposes only.</div>
        <div className="footer-right">
          <span className="social-link"><a href='https://williamkimngo-personal-site.netlify.app/' target='blank'><i className="fa-solid fa-globe"></i>&nbsp; William Ngo</a></span>
          <span className="social-link"><a href='https://github.com/williamkimngo' target='blank'><i className="fa-brands fa-github"></i>&nbsp; Github</a></span>
          <span className="social-link"><a href='https://www.linkedin.com/in/williamkimngo/' target='blank'><i className="fa-brands fa-linkedin"></i>&nbsp; LinkedIn</a></span>
        </div>
      </div>
    </div>
  )
}

export default Footer
