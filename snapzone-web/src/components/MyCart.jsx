import { useState } from "react"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const MyCart = () => {
  const { cartItems, loading, updateQuantity, removeFromCart, getCartTotal } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const total = getCartTotal()
  const shippingCost = total > 0 ? 100 : 0

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          @keyframes slideOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-100%); }
          }
          
          .item-removing {
            animation: slideOut 0.3s ease forwards;
          }
          
          .empty-cart-message {
            text-align: center;
            padding: 40px;
            color: #888;
            font-size: 18px;
          }
        `}
      </style>

      <h2 style={styles.heading}>My Shopping Cart</h2>

      {!user ? (
        <div className="empty-cart-message">
          <p>Please sign in to view your cart</p>
          <button style={styles.browseButton} onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      ) : loading ? (
        <div style={styles.loadingContainer}>
          {[1, 2, 3].map((_, index) => (
            <div key={index} style={styles.loadingItem}>
              <div style={styles.loadingImage}></div>
              <div style={styles.loadingContent}>
                <div style={styles.loadingText}></div>
                <div style={styles.loadingText}></div>
              </div>
            </div>
          ))}
        </div>
      ) : cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is empty</p>
          <button style={styles.browseButton} onClick={() => navigate("/")}>
            Browse Products
          </button>
        </div>
      ) : (
        <div style={styles.cartItemsContainer}>
          {cartItems.map((item, index) => (
            <div
              key={item.id}
              id={`cart-item-${item.id}`}
              style={{
                ...styles.cartItem,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div style={styles.itemImage}>
                <img src={item.image_url || "/placeholder.svg"} alt="Frame" style={styles.image} />
              </div>

              <div style={styles.itemDetails}>
                <h3 style={styles.itemTitle}>{item.product_name}</h3>
                <p style={styles.itemColor}>Color: {item.color}</p>
                <p style={styles.itemPrice}>₹{item.price}</p>
                <div style={styles.quantityControls}>
                  <button style={styles.quantityButton} onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <span style={styles.quantityValue}>{item.quantity}</span>
                  <button style={styles.quantityButton} onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
              </div>

              <div style={styles.itemActions}>
                <p style={styles.itemSubtotal}>₹{item.price * item.quantity}</p>
                <button style={styles.removeButton} onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && cartItems.length > 0 && user && (
        <div style={styles.cartSummary}>
          <div style={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>₹{total}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping:</span>
            <span>₹{shippingCost}</span>
          </div>
          <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
            <span>Total:</span>
            <span>₹{total + shippingCost}</span>
          </div>

          <button style={styles.checkoutButton} onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center",
    color: "#2c3e50",
    position: "relative",
    paddingBottom: "10px",
  },
  cartItemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "30px",
  },
  cartItem: {
    display: "flex",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    animation: "fadeIn 0.5s ease forwards",
    position: "relative",
    overflow: "hidden",
  },
  itemImage: {
    width: "120px",
    height: "120px",
    marginRight: "20px",
    borderRadius: "4px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  itemDetails: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#2c3e50",
  },
  itemColor: {
    fontSize: "14px",
    color: "#7f8c8d",
    marginBottom: "8px",
  },
  itemPrice: {
    fontSize: "16px",
    color: "#7f8c8d",
    marginBottom: "15px",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
  },
  quantityButton: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#f1f1f1",
    color: "#333",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s ease",
  },
  quantityValue: {
    margin: "0 15px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  itemActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: "100px",
  },
  itemSubtotal: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#2c3e50",
  },
  removeButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#e74c3c",
    cursor: "pointer",
    fontSize: "14px",
    padding: "5px",
    transition: "color 0.2s ease",
  },
  cartSummary: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
    fontSize: "16px",
  },
  totalRow: {
    fontWeight: "bold",
    fontSize: "18px",
    marginTop: "10px",
    paddingTop: "10px",
    borderTop: "2px solid #ddd",
    borderBottom: "none",
  },
  checkoutButton: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "15px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  browseButton: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "15px",
    transition: "background-color 0.3s ease",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  loadingItem: {
    display: "flex",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  loadingImage: {
    width: "120px",
    height: "120px",
    marginRight: "20px",
    borderRadius: "4px",
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
  },
  loadingContent: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "15px",
  },
  loadingText: {
    height: "20px",
    borderRadius: "4px",
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
  },
}

export default MyCart

