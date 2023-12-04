import React from "react";
import "./notFound.css";
import Footer from "../../../client side/components/Footer/Footer";
import { Link } from "react-router-dom";
import AlertLogo from "../../../assets/alertLogo.svg";

const NotFoundPage = () => {
  return (
    <div>
      <div className="pnf-abc">
        <img className="pnf-logo-abc" src={AlertLogo} alt="alert-logo" />
        <h1 className="pnf-title-abc">404</h1>
        <h2 className="pnf-desc-abc">Page Not Found</h2>
        <Link to="/" className="pnf-btn-abc">
          Go Back
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
