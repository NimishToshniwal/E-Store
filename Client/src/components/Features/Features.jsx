import React from "react";
import "./Features.scss";

const Features = () => {
    return (
        <section id="feature">
            <div className="fe-box">
                <img src="features/f1.png" alt="" />
                <h6>Enjoy Online</h6>
            </div>
            <div className="fe-box">
                <img src="features/f2.png" alt="" />
                <h6>Online Order</h6>
            </div>
            <div className="fe-box">
                <img src="features/f3.png" alt="" />
                <h6>Save Money</h6>
            </div>
            <div className="fe-box">
                <img src="features/f4.png" alt="" />
                <h6>Promotions</h6>
            </div>
            <div className="fe-box">
                <img src="features/f5.png" alt="" />
                <h6>Happy Buying</h6>
            </div>
            <div className="fe-box">
                <img src="features/f6.png" alt="" />
                <h6>Support</h6>
            </div>
        </section>
    );
};

export default Features;
