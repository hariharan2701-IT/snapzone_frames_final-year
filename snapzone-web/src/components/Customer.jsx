import React from "react";


const Customer = () => {
  return (
    <a
      href="https://wa.me/7708554879"
      target="_blank"
      rel="noopener noreferrer"
      className="customer-support"
    >
      <div className="customer-support-button">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp Logo"
          className="whatsapp-logo"
        />
        <span>Customer Support</span>
      </div>
    </a>
  );
};

export default Customer;
