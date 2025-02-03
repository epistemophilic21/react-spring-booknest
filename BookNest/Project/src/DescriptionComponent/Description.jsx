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
      <div className="container mt-5 ">
        <div
          className="card border-0"
          style={{ maxWidth: "100%", margin: "auto" }}
        >
          {book && book.volumeInfo ? (
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title fw-bold">
                    {book.volumeInfo.title}
                    <span /> <MdVerified style={{ color: "#1c7ed6" }} />
                  </h3>
                  <h6 className="card-subtitle mb-2 text-muted">
                    By {book.volumeInfo.authors?.join(", ") || "Unknown"}
                  </h6>
                  <p className="card-text">
                    <strong>Price:</strong>{" "}
                    {book.saleInfo?.listPrice?.amount
                      ? `${book.saleInfo.listPrice.amount}`
                      : "FREE"}
                  </p>

                  <button
                    className="btn btn-success"
                    onClick={() => addToCart(customizedData)}
                    disabled={toggleButton(book)}
                  >
                    <BiSolidCartAdd style={{ fontSize: "24px" }} />
                  </button>

                  <button
                    className="btn btn-secondary"
                    style={{
                      marginLeft: "9px",
                    }}
                  >
                    <Link to="/home" style={{ color: "white" }}>
                      <TbArrowBackUpDouble style={{ fontSize: "24px" }} />
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Second Section: Book Description */}
      <div className="container mt-2">
        <div
          className="card p-3 border-0"
          style={{ maxWidth: "100%", margin: "auto" }}
        >
          {book && book.volumeInfo ? (
            <>
              {book.volumeInfo.publisher && (
                <h6 className="fw-bold">
                  Publisher:{" "}
                  <span className="fw-normal">{book.volumeInfo.publisher}</span>
                </h6>
              )}

              {book.volumeInfo.publishedDate && (
                <h6 className="fw-bold">
                  Published Date:{" "}
                  <span className="fw-normal">
                    {book.volumeInfo.publishedDate}
                  </span>
                </h6>
              )}

              <h6 className="fw-bold">Description:</h6>
              {book.volumeInfo.description ? (
                <p
                  className="card-text"
                  dangerouslySetInnerHTML={{
                    __html: book.volumeInfo.description,
                  }}
                />
              ) : (
                <p className="card-text">No description available</p>
              )}
            </>
          ) : (
            <div className="text-center p-5" style={{ marginTop: "90px" }}>
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "4rem", height: "4rem" }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Description;
