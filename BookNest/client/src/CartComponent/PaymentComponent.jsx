import { PiWarningCircleDuotone } from "../imports";
function PaymentComponent({ payment, handleChange, error }) {
  return (
    <>
      <div className="mb-3 ">
        <h6 className="mini-heading">CHOOSE PAYMENT METHOD</h6>
        <select
          id="payment-method"
          name="paymentMethod"
          value={payment}
          onChange={handleChange}
          className="form-select inputBox"
          style={{ width: "14rem " }}
        >
          <option value="">Payment Method</option>
          <option value="Google Pay">Google Pay</option>
          <option value="PayPal">PayPal</option>
        </select>
        {error && (
          <div
            className="alert alert-danger mt-2"
            role="alert"
            style={{ width: "14rem " }}
          >
            {error}{" "}
            <span>
              <PiWarningCircleDuotone style={{ fontSize: "22px" }} />
            </span>
          </div>
        )}
      </div>
    </>
  );
}
export default PaymentComponent;
