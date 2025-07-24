import { useState, postCustomAPI, PaymentComponent } from "../imports";

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

  console.log({ ...checkoutData, paymentMethod: payment });
  console.log(payment);
  return (
    <div className="container mt-5">
      <div className="card border-0">
        <div className="card-body ">
          <h5 className="card-title mb-3 heading" style={{ fontSize: "20px" }}>
            ORDER DETAILS
          </h5>
          <div className="mb-3">
            <h6 className="mini-heading">ADDRESS</h6>
            <p>{checkoutData.address || undefined}</p>
          </div>
          <div className="mb-3">
            <h6 className="mini-heading">CONTACT</h6>
            <p>{checkoutData.mobileNumber}</p>
          </div>

          <div className="mb-3">
            <h6 className="mini-heading">DATE</h6>
            <p>{checkoutData.date}</p>
          </div>
          <PaymentComponent
            payment={payment}
            handleChange={handleChange}
            error={error}
          />

          <div className="mb-3">
            <h6 className="mini-heading">TOTAL AMOUNT</h6>
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>
              {checkoutData.totalPrice}
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={postOrderData}
          >
            Order
          </button>
          <button
            type="button"
            className="btn  ms-2"
            onClick={() => setOrder(false)}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderComponent;
