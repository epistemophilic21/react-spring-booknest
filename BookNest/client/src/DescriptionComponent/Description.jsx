import {
  Link,
  useParams,
  TbArrowBackUpDouble,
  BiSolidCartAdd,
  MdVerified,
  NavigationBar,
  useBookDetail,
} from "../imports";

function Description() {
  const { bookId } = useParams();
  const { book, customizedData, addToCart, toggleButton } =
    useBookDetail(bookId);

  return (
    <>
      <NavigationBar />
      {/* First Section: Book Details */}
      <div className="container mt-5">
        <div
          className="card border-0 shadow-lg rounded-4"
          style={{ maxWidth: "100%", margin: "auto" }}
        >
          {book && book.volumeInfo ? (
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body p-5">
                  <h3 className="card-title fw-bold mb-3" >
                    {book.volumeInfo.title}
                    <MdVerified style={{ color: "#1c7ed6", marginLeft: "8px", verticalAlign: "middle" }} />
                  </h3>

                  <h6 className="card-subtitle mb-3 text-muted fw-medium">
                    By {book.volumeInfo.authors?.join(", ") || "Unknown"}
                  </h6>
                  <p className="card-text mb-4 fs-5">
                    <strong>Price:</strong>{" "}
                    <span className="text-success fw-semibold">
                      {book.saleInfo?.listPrice?.amount
                        ? `${book.saleInfo.listPrice.amount}`
                        : "FREE"}
                    </span>
                  </p>

                  <div className="d-flex gap-3">
                    <button
                      className="btn btn-success btn-lg rounded-3 px-4"
                      onClick={() => addToCart(customizedData)}
                      disabled={toggleButton(book)}
                    >
                      <BiSolidCartAdd style={{ fontSize: "24px" }} />
                    </button>

                    <button className="btn btn-secondary btn-lg rounded-3 px-4">
                      <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
                        <TbArrowBackUpDouble style={{ fontSize: "24px" }} />
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* Second Section: Book Description */}
      <div className="container mt-4">
        <div
          className="card p-4 border-0 shadow-sm rounded-4 bg-light"
          style={{ maxWidth: "100%", margin: "auto" }}
        >
          {book && book.volumeInfo ? (
            <>
              {book.volumeInfo.publisher && (
                <h6 className="fw-bold text-secondary mb-2">
                  Publisher:{" "}
                  <span className="fw-normal text-dark">
                    {book.volumeInfo.publisher}
                  </span>
                </h6>
              )}

              {book.volumeInfo.publishedDate && (
                <h6 className="fw-bold text-secondary mb-2">
                  Published Date:{" "}
                  <span className="fw-normal text-dark">
                    {book.volumeInfo.publishedDate}
                  </span>
                </h6>
              )}

              <h6 className="fw-bold text-secondary mb-2">Description:</h6>
              {book.volumeInfo.description ? (
                <p
                  className="card-text text-dark"
                  style={{ lineHeight: "1.6", fontSize: "1rem" }}
                  dangerouslySetInnerHTML={{
                    __html: book.volumeInfo.description,
                  }}
                />
              ) : (
                <p className="card-text text-muted">No description available</p>
              )}
            </>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "200px" }}
            >
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              ></div>
            </div>
          )}
        </div>
      </div>

    </>
  );
}

export default Description;
