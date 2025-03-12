import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Frame from "./Frame";
import Customer from "./Customer";
import Categories from "./Categories";
import framesData from "../frames.json";
import MirrorFrames from "../mirrorframes.json";
import MyCart from "./MyCart";
import flowers from "../flower.json";
import polaroid from "../polaroid.json";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Frames");
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [showCart, setShowCart] = useState(false); // State to toggle MyCart

  const handleCategorySelect = (category) => {
    console.log("Category selected:", category);
    setSelectedCategory(category);
    setSelectedFrame(null);
  };

  const handleFrameClick = (frame) => {
    console.log("Frame selected:", frame);
    setSelectedFrame(frame);
  };

  const handleCartClick = () => {
    setShowCart(true); // Show the cart page when button is clicked
  };

  return (
    <div>
      <Header />
      <div className="sale-container">
        <div className="sale-text">Please choose your favorite category ❤️</div>
      </div>

      <div className="main-container">
        {/* Cart Button */}
        <button className="cart-btn" onClick={handleCartClick}>Cart</button>

        {/* Show MyCart when showCart is true */}
        {showCart ? (
          <MyCart />
        ) : (
          <>
            <Categories onCategorySelect={handleCategorySelect} />
            <main>
              {selectedCategory === "Frames" && (
                <section className="frame-section p-4">
                  <h2 className="text-2xl font-semibold mb-4">All Frame Sizes</h2>
                  {["small", "medium", "large"].map((size) => (
                    framesData[size]?.length > 0 && (
                      <div key={size} className="frames-section mt-8">
                        <h3 className="text-xl font-semibold mb-4 capitalize">{size} Frames</h3>
                        <div className="frames grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {framesData[size].map((frame, index) => (
                            <Frame key={index} frame={frame} onClick={() => handleFrameClick(frame)} />
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </section>
              )}

              {selectedCategory === "Magic Mirror Frame" && (
                <section className="frame-section p-4">
                  <h2 className="text-2xl font-semibold mb-4">Magic Mirror Frames</h2>
                  {MirrorFrames["Various"]?.length > 0 && (
                    <div className="frames-section mt-8">
                      <h3 className="text-xl font-semibold mb-4 capitalize">Various Collection</h3>
                      <div className="frames grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {MirrorFrames["Various"].map((frame, index) => (
                          <Frame key={index} frame={frame} onClick={() => handleFrameClick(frame)} />
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {selectedCategory === "Bouquets" && (
                <section className="frame-section p-4">
                  <h2 className="text-2xl font-semibold mb-4">All Types of Bouquets</h2>
                  {["Flower", "Cholocate", "Polaroid"].map((size) => (
                    flowers[size]?.length > 0 && (
                      <div key={size} className="frames-section mt-8">
                        <h3 className="text-xl font-semibold mb-4 capitalize">{size} Bouquets</h3>
                        <div className="frames grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {flowers[size].map((frame, index) => (
                            <Frame key={index} frame={frame} onClick={() => handleFrameClick(frame)} />
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </section>
              )}

              {selectedCategory === "Polaroid" && (
                <section className="frame-section p-4">
                  <h2 className="text-2xl font-semibold mb-4">Polaroids</h2>
                  {polaroid["Polarids"]?.length > 0 && (
                    <div className="frames-section mt-8">
                      <h3 className="text-xl font-semibold mb-4 capitalize">Polaroid Collection</h3>
                      <div className="frames grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {polaroid["Polarids"].map((frame, index) => (
                          <Frame key={index} frame={frame} onClick={() => handleFrameClick(frame)} />
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {selectedFrame && (
                <section className="frame-details p-4 mt-4 border-t-2">
                  <h3 className="text-2xl font-semibold mb-4">Frame Details</h3>
                  <div className="details">
                    <p><strong>Name:</strong> {selectedFrame.size}</p>
                    <p><strong>Price :</strong> ₹{selectedFrame.price}</p>
                    {selectedFrame.colors?.length > 0 && (
                      <p><strong>Colors:</strong> {selectedFrame.colors.join(" | ")}</p>
                    )}
                    {selectedFrame.shapes?.length > 0 && (
                      <p><strong>Shapes:</strong> {selectedFrame.shapes.join(" | ")}</p>
                    )}
                  </div>
                </section>
              )}
            </main>
          </>
        )}
      </div>

      <Footer />
      <Customer />
    </div>
  );
};

export default Home;
