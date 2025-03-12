import { useEffect, useState } from "react"

const MyCart = () => {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    //instead of hari123 use userid after auth
    fetch("http://localhost:5000/api/cart/hari123")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data)
        calculateTotal(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error)
        setIsLoading(false)
      })
  }, [])

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.frameData.price * (item.quantity || 1), 0)
    setTotal(sum)
  }

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return

    const updatedItems = [...cartItems]
    updatedItems[index] = {
      ...updatedItems[index],
      quantity: newQuantity,
    }

    setCartItems(updatedItems)
    calculateTotal(updatedItems)
  }

  const removeItem = (index) => {
    const itemElement = document.getElementById(`cart-item-${index}`)
    itemElement.classList.add("item-removing")

    setTimeout(() => {
      const updatedItems = cartItems.filter((_, i) => i !== index)
      setCartItems(updatedItems)
      calculateTotal(updatedItems)
    }, 300)
  }

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

      {isLoading ? (
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
          <button style={styles.browseButton} onClick={() => (window.location.href = "/")}>
            Browse Products
          </button>
        </div>
      ) : (
        <div style={styles.cartItemsContainer}>
          {cartItems.map((item, index) => (
            <div
              key={index}
              id={`cart-item-${index}`}
              style={{
                ...styles.cartItem,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div style={styles.itemImage}>
                <img src={item.frameData.image || "/placeholder.svg"} alt="Frame" style={styles.image} />
              </div>

              <div style={styles.itemDetails}>
                <h3 style={styles.itemTitle}>{item.frameData.size}</h3>
                <p style={styles.itemPrice}>₹{item.frameData.price}</p>
                <div style={styles.quantityControls}>
                  <button style={styles.quantityButton} onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}>
                    -
                  </button>
                  <span style={styles.quantityValue}>{item.quantity || 1}</span>
                  <button style={styles.quantityButton} onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}>
                    +
                  </button>
                </div>
              </div>

              <div style={styles.itemActions}>
                <p style={styles.itemSubtotal}>₹{item.frameData.price * (item.quantity || 1)}</p>
                <button style={styles.removeButton} onClick={() => removeItem(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && cartItems.length > 0 && (
        <div style={styles.cartSummary}>
          <div style={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>₹{total}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping:</span>
            <span>₹{total > 0 ? 100 : 0}</span>
          </div>
          <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
            <span>Total:</span>
            <span>₹{total > 0 ? total + 100 : 0}</span>
          </div>

          <button style={styles.checkoutButton} onClick={() => (window.location.href = "/checkout")}>
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

