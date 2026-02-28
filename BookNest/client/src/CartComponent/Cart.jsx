import {
  useContext,
  useState,
  CartContext,
  RiDeleteBin6Fill,
  NavigationBar,
  AuthContext,
  OrderComponent,
  LocationNotFound,
  getCustomAPI,
  Link,
} from "../imports";
import "./Cart.css";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [checkoutData, setCheckoutData] = useState(null);
  const [isLocation, setLocation] = useState(false);
  const [showOrder, setOrder] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const { cart, removeFromCart, updateQuantity, grandTotal } =
    useContext(CartContext);

  const handleCheckout = async () => {
    if (isCheckingOut) return;
    setIsCheckingOut(true);
    const result = await getCustomAPI(
      user,
      cart,
      setCheckoutData,
      setLocation,
      setOrder,
      grandTotal
    );
    if (!result?.ok) {
      alert("Unable to proceed to checkout right now. Please try again.");
    }
    setIsCheckingOut(false);
  };

  return (
    <>
      <NavigationBar />

      <div className="cart-page">
        <div className="cart-shell">
          <div className="cart-header">
            <h2>Your Cart</h2>
            <p>Review your books and update quantities before checkout.</p>
          </div>

          {cart.length === 0 ? (
            <div className="cart-empty-card" role="alert">
              <h5>Your cart is empty</h5>
              <p>Add a few books and come back here to checkout.</p>
              <Link className="cart-link-btn" to="/home">
                Explore Books
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-table-card">
                <div className="table-responsive">
                  <table className="table cart-table align-middle mb-0">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Book Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Price</th>
                        <th scope="col" className="text-center">
                          Quantity
                        </th>
                        <th scope="col">Amt./Qty</th>
                        <th scope="col" className="text-center">
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td className="cart-title-cell">{item.title}</td>
                          <td>{item.authors}</td>
                          <td>{item.price}</td>
                          <td>
                            {item.price !== "FREE" ? (
                              <div className="cart-qty-control">
                                <button
                                  className="cart-qty-btn"
                                  onClick={() =>
                                    updateQuantity(item.id, -1, setOrder)
                                  }
                                >
                                  -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                  className="cart-qty-btn"
                                  onClick={() =>
                                    updateQuantity(item.id, +1, setOrder)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <div className="cart-qty-free">1</div>
                            )}
                          </td>
                          <td className="cart-total-cell">{item.totalPrice}</td>
                          <td className="text-center">
                            <button
                              className="cart-delete-btn"
                              onClick={() => removeFromCart(item.id, setOrder)}
                              aria-label={`Remove ${item.title}`}
                            >
                              <RiDeleteBin6Fill />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="cart-summary-row">
                  <span>Grand Total</span>
                  <strong>{grandTotal}</strong>
                </div>
              </div>

              <div className="cart-actions">
                <Link className="cart-secondary-btn" to="/home">
                  Continue Shopping
                </Link>
                <button
                  type="button"
                  className="cart-primary-btn"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Checking..." : "Proceed to Checkout"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showOrder &&
        (isLocation ? (
          <OrderComponent
            checkoutData={checkoutData}
            user={user}
            setOrder={setOrder}
          />
        ) : (
          <LocationNotFound />
        ))}
    </>
  );
};

export default Cart;
