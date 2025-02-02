import { postCustomAPI } from "../API/AuthAPICall";

function OrderComponent({ checkoutData, user, setOrder }) {
  console.log(checkoutData);
  const postOrderData = async () => {
    await postCustomAPI(checkoutData, user);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Order Details</h5>
          <div className="mb-3">
            <h6>Address:</h6>
            <p>{checkoutData.address || undefined}</p>
          </div>
          <div className="mb-3">
            <h6>Phone Number:</h6>
            <p>{checkoutData.mobileNumber}</p>
          </div>

          <div className="mb-3">
            <h6>Date:</h6>
            <p>{checkoutData.date}</p>
          </div>

          <div className="mb-3">
            <h6>Total Amount:</h6>
            <p>{checkoutData.totalPrice}</p>
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
