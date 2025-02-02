import { useNavigate } from "react-router-dom";
import NavigationBar from "../NavBarComponent/NavigationBar";
import { useBooks } from "../ReUsableComponent/UseEffectBooks";

function Home() {
  const navigate = useNavigate();
  const { books } = useBooks();

  // * fetch book id
  const handleView = (bookId) => {
    navigate(`/book-info/${bookId}`);
  };

  return (
    <>
      <NavigationBar />
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for books..."
              />
              <button className="btn btn-primary" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <h3 className="text-center mb-4">Available Books</h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
          {books.map((value, index) => (
            <div className="col" key={index}>
              <div className="card h-100 d-flex flex-column justify-content-between">
                <img
                  src={
                    value.volumeInfo.imageLinks?.smallThumbnail ||
                    "placeholder.jpg"
                  }
                  className="card-img-top mx-auto my-3"
                  alt={value.volumeInfo.title}
                  style={{
                    maxWidth: "110px",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body d-flex flex-column justify-content-between text-center">
                  <h5 className="card-title text-truncate">
                    {value.volumeInfo.title}
                  </h5>
                  <p className="card-text text-truncate">
                    {value.volumeInfo.authors}
                  </p>
                  <div className="mt-auto">
                    <a
                      href="#"
                      className="btn btn-primary btn-sm w-100"
                      onClick={() => handleView(value.id)}
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
