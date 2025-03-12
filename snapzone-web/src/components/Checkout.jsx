"use client"

import { useState } from "react"

const Checkout = () => {
  const [form, setForm] = useState({ name: "", email: "", address: "", Phoneno: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCheckout = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "hari123", ...form }),
      })

      const data = await response.json()
      if (response.ok) {
        setOrderComplete(true)
      } else {
        alert("Error: " + data.error)
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("An error occurred during checkout. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes checkmark {
            0% { height: 0; width: 0; opacity: 0; }
            40% { height: 0; width: 10px; opacity: 1; }
            100% { height: 20px; width: 10px; opacity: 1; }
          }
          
          @keyframes checkmarkCircle {
            0% { transform: scale(0); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          .input-field {
            width: 100%;
            padding: 15px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s, box-shadow 0.3s;
          }
          
          .input-field:focus {
            border-color: #3498db;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
            outline: none;
          }
          
          .spinner {
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
            margin-right: 10px;
          }
        `}
      </style>

      {orderComplete ? (
        <div style={styles.successContainer}>
          <div style={styles.checkmarkCircle}>
            <div style={styles.checkmark}></div>
          </div>
          <h2 style={styles.successHeading}>Order Placed Successfully!</h2>
          <p style={styles.successText}>
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
          <p style={styles.successText}>
            A confirmation email has been sent to {form.email}
          </p>
          <button
            style={styles.continueButton}
            onClick={() => (window.location.href = "/")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div style={styles.checkoutForm}>
          <h2 style={styles.heading}>Checkout</h2>

          <div style={styles.formContainer}>
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Name"
              onChange={handleChange}
              className="input-field"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Email"
              onChange={handleChange}
              className="input-field"
            />

            <input
              type="text"
              name="address"
              value={form.address}
              placeholder="Address"
              onChange={handleChange}
              className="input-field"
            />

            <input
              type="number"
              name="number"
              value={form.number}
              placeholder="Phone Number"
              onChange={handleChange}
              className="input-field"
            />

            <button
              style={{
                ...styles.placeOrderButton,
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
              onClick={handleCheckout}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  checkoutForm: {
    animation: "fadeIn 0.5s ease",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "25px",
    textAlign: "center",
    color: "#2c3e50",
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
  placeOrderButton: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  successContainer: {
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 0.5s ease",
  },
  checkmarkCircle: {
    width: "80px",
    height: "80px",
    margin: "0 auto 25px",
    borderRadius: "50%",
    backgroundColor: "#2ecc71",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "checkmarkCircle 0.5s ease-in-out",
  },
  checkmark: {
    transformOrigin: "bottom left",
    height: "40px",
    width: "20px",
    display: "block",
    borderRight: "7px solid white",
    borderBottom: "7px solid white",
    transform: "rotate(45deg)",
    marginTop: "-10px",
    marginLeft: "6px",
    animation: "checkmark 0.8s ease-in-out forwards",
  },
  successHeading: {
    fontSize: "24px",
    color: "#2c3e50",
    marginBottom: "15px",
  },
  successText: {
    fontSize: "16px",
    color: "#7f8c8d",
    marginBottom: "10px",
  },
  continueButton: {
    padding: "15px 30px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "25px",
    transition: "background-color 0.3s",
  },
}

export default Checkout

