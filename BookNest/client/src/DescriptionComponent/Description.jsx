import {
  Link,
  useParams,
  BiSolidCartAdd,
  MdVerified,
  NavigationBar,
  useBookDetail,
} from "../imports";
import "./Description.css";

function Description() {
  const { bookId } = useParams();
  const { book, customizedData, addToCart, toggleButton } =
    useBookDetail(bookId);

  const hasBook = book && book.volumeInfo;

  return (
    <>
      <NavigationBar />
      <div className="description-page">
        <div className="description-shell">
          {hasBook ? (
            <>
              <section className="description-main-card">
                <h2 className="description-title">
                  {book.volumeInfo.title}
                  <MdVerified className="description-verified" />
                </h2>

                <p className="description-subtitle">
                  By {book.volumeInfo.authors?.join(", ") || "Unknown"}
                </p>

                <div className="description-pill">
                  <span>Price</span>
                  <strong>
                    {book.saleInfo?.listPrice?.amount
                      ? `${book.saleInfo.listPrice.amount}`
                      : "FREE"}
                  </strong>
                </div>

                <div className="description-actions">
                  <button
                    className="description-primary-btn"
                    onClick={() => addToCart(customizedData)}
                    disabled={toggleButton(book)}
                  >
                    <BiSolidCartAdd />
                    Add to Cart
                  </button>

                  <Link className="description-secondary-btn" to="/home">
                    Back
                  </Link>
                </div>
              </section>

              <section className="description-detail-card">
                {book.volumeInfo.publisher && (
                  <div className="description-meta-row">
                    <p>Publisher</p>
                    <h6>{book.volumeInfo.publisher}</h6>
                  </div>
                )}

                {book.volumeInfo.publishedDate && (
                  <div className="description-meta-row">
                    <p>Published Date</p>
                    <h6>{book.volumeInfo.publishedDate}</h6>
                  </div>
                )}

                <div className="description-meta-row description-body">
                  <p>Description</p>
                  {book.volumeInfo.description ? (
                    <div
                      className="description-text"
                      dangerouslySetInnerHTML={{
                        __html: book.volumeInfo.description,
                      }}
                    />
                  ) : (
                    <p className="description-empty">No description available</p>
                  )}
                </div>
              </section>
            </>
          ) : (
            <div className="description-loader-card">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Description;
