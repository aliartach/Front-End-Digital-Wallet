import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer id="About" className="footer">
      <section className="contact">
        <div className="content"></div>
        <div className="container">
          <div className="contactInfo">
            <div className="box">
              <div className="text">
                <h3>Address</h3>
                <p>
                  402671 Sugar Camp Road,
                  <br />
                  Owatonna, Minnesota,
                  <br />
                  55025060
                </p>
              </div>
            </div>
            <div className="box">
              <div className="text">
                <h3>Phone</h3>
                <p>000-000-0000</p>
              </div>
            </div>
            <div className="box">
              <div className="text">
                <h3>Email</h3>
                <p>wrub7d78i0e@temporary-mail</p>
              </div>
            </div>
          </div>

          <div id="Contact" className="contactForm">
            <h2>Contact Us</h2>
            <form>
              <h2>Send Message</h2>
              <div className="inputBox">
                <input type="text" name="" required="required" />
                <span>Full Name</span>
              </div>
              <div className="inputBox">
                <input type="text" name="" required="required" />
                <span>Email</span>
              </div>
              <div className="inputBox">
                <textarea required="required" />
                <span>Type your Message...</span>
              </div>
              <div className="inputBox">
                <input type="submit" value="Send" />
              </div>
            </form>
          </div>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
