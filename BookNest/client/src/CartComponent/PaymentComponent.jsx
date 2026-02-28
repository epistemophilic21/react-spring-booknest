import { PiWarningCircleDuotone } from "../imports";

function PaymentComponent({ payment, handleChange, error }) {
  return (
    <>
      <h6 className="order-label">Choose Payment Method</h6>
      <select
        id="payment-method"
        name="paymentMethod"
        value={payment}
        onChange={handleChange}
        className="order-select"
      >
        <option value="">Payment Method</option>
        <option value="Google Pay">Google Pay</option>
        <option value="PayPal">PayPal</option>
      </select>

      {error && (
        <div className="order-alert" role="alert">
          <span>{error} is required</span>
          <PiWarningCircleDuotone className="order-alert-icon" />
        </div>
      )}
    </>
  );
}

export default PaymentComponent;
