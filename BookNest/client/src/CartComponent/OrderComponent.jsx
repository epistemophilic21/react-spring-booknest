import { useState, postCustomAPI, PaymentComponent } from "../imports";
import "./OrderComponent.css";

function OrderComponent({ checkoutData, user, setOrder }) {
  const [payment, setPayment] = useState("");
  const [error, setError] = useState("");

  const postOrderData = async () => {
    if (!payment) {
      setError("Payment Method");
    } else {
      const response = await postCustomAPI(
        { ...checkoutData, paymentMethod: payment },
        user
      );
      if (response.status === 200) {
        setOrder(false);
      }
    }
  };

  const handleChange = (e) => {
    setPayment(e.target.value);
    setError("");
  };

  return (
    <div className="order-wrap">
      <div className="order-card">
        <h4 className="order-title">Order Details</h4>

        <div className="order-grid">
          <div className="order-column">
            <div className="order-info-box">
              <h6>Address</h6>
              <p>{checkoutData.address || "Address not available"}</p>
            </div>

            <div className="order-info-box">
              <h6>Contact</h6>
              <p>{checkoutData.mobileNumber}</p>
            </div>

            <div className="order-info-box">
              <h6>Date</h6>
              <p>{checkoutData.date}</p>
            </div>
          </div>

          <div className="order-column">
            <div className="order-info-box">
              <PaymentComponent
                payment={payment}
                handleChange={handleChange}
                error={error}
              />
            </div>

            <div className="order-info-box order-total-box">
              <h6>Total Amount</h6>
              <p className="order-total-value">{checkoutData.totalPrice}</p>
            </div>
          </div>
        </div>

        <div className="order-actions">
          <button type="button" className="order-primary-btn" onClick={postOrderData}>
            Place Order
          </button>
          <button
            type="button"
            className="order-danger-btn"
            onClick={() => setOrder(false)}
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderComponent;
