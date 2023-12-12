import React, { useRef, useState } from "react";
import "../Footer/Footer.css";
import emailjs from '@emailjs/browser';

const Footer = () => {
  const form = useRef();

  const [isMessageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_pd98twe', 'template_utnvs9n', form.current, 'PuCdCBN6lOG2qgfMX')
      .then((result) => {
        console.log(result.text);
        console.log("success");
      }, (error) => {
        console.log(error.text);
      });

    setMessageSent(true);
    setFormData({
      from_name: "",
      from_email: "",
      message: "",
    });
  };

  return (
    <footer id="About" className="footer">
      <section className="contact">
        <div className="content"></div>
        <div className="container">
          <div className="contactInfo">
            <div className="box">
              <div className="text">
                <h3>Phone</h3>
                <p>78839841</p>
                <h3>Email</h3>
                <p>Coinify@gmail.com</p>
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
          </div>

          <div id="Contact" className="contactForm">
            <h2>Contact Us</h2>
            <form ref={form} onSubmit={sendEmail}>
              <div className="inputBox">
                <input
                  value={formData.from_name}
                  onChange={handleInputChange}
                  type="text"
                  name="from_name"
                  required="required"
                />
                <span>Full Name</span>
              </div>
              <div className="inputBox">
                <input
                  value={formData.from_email}
                  onChange={handleInputChange}
                  type="text"
                  name="from_email"
                  required="required"
                />
                <span>Email</span>
              </div>
              <div className="inputBox">
                <textarea
                  value={formData.message}
                  onChange={handleInputChange}
                  name="message"
                  required="required"
                />
                <span>Type your Message...</span>
              </div>
              <div className="inputBox">
                <input type="submit" value="Send" />
                {isMessageSent && <p>Message sent successfully!</p>}
              </div>
            </form>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;