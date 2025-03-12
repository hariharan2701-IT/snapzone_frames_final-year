import { useState } from "react";

const Frame = ({ frame }) => {
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const addToCart = async (frame) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "hari123", frameData: frame }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      setMessage("Successfully added to cart!");
      setIsError(false);
    } catch (error) {
      setMessage("Error adding to cart: " + error.message);
      setIsError(true);
    }

    // Hide the message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="frame">
      <img src={frame.image} alt={`${frame.size} frame`} />
      <h3>{frame.size}</h3>
      <p>Colors: {frame.colors.join(" | ")}</p>
      <p>Price: ₹{frame.price}</p>
      <div className="button-container">
        <button onClick={() => addToCart(frame)} className="order-now-btn">
          <i className="bi bi-cart"></i> Add To Cart
        </button>
      </div>

      {/* ✅ Show success/error message */}
      {message && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            borderRadius: "5px",
            color: "white",
            backgroundColor: isError ? "red" : "green",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Frame;
