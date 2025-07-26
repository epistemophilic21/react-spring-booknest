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

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [checkoutData, setCheckoutData] = useState(null);
  const [isLocation, setLocation] = useState(false);
  const [showOrder, setOrder] = useState(false);

  const { cart, removeFromCart, updateQuantity, grandTotal } =
    useContext(CartContext);

  const handleCheckout = async () =>
    await getCustomAPI(
      user,
      cart,
      setCheckoutData,
      setLocation,
      setOrder,
      grandTotal
    );

  return (
    <>
      <NavigationBar />
      <div className="container mt-5">
        <h3 className="mb-4 card-heading">YOUR CART</h3>
        {cart.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            Your cart is empty.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Book Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Price</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Quantity
                  </th>
                  <th scope="col">Amt./Qty</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.title}</td>
                    <td>{item.authors}</td>
                    <td>{item.price}</td>
                    <td>
                      {item.price !== "FREE" ? (
                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            className="btn btn-sm btn-primary"
                            style={{ fontWeight: "bold", fontSize: "15px" }}
                            onClick={() =>
                              updateQuantity(item.id, -1, setOrder)
                            }
                          >
                            -
                          </button>
                          <span className="mx-3" style={{ width: "6px" }}>
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-sm btn-primary"
                            style={{
                              fontWeight: "bold",
                              fontSize: "15px",
                            }}
                            onClick={() =>
                              updateQuantity(item.id, +1, setOrder)
                            }
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center align-items-center">
                          <span className="mx-3">1</span>
                        </div>
                      )}
                    </td>
                    <td>{item.totalPrice}</td>
                    <td>
                      {" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(item.id, setOrder)}
                      >
                        <RiDeleteBin6Fill />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="container"
              style={{
                textAlign: "end",
                fontWeight: "bold",
              }}
            >
              Total. {grandTotal}
            </div>
          </div>
        )}

        {cart.length != 0 ? (
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4">
            <button className="btn btn-secondary mb-2 mb-sm-0">
              <Link
                to="/home"
                style={{ textDecoration: "none", color: "white" }}
              >
                Continue Shopping
              </Link>
            </button>
            <button className="btn btn-primary" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        ) : null}
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
