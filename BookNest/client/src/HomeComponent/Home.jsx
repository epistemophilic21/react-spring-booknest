import { useNavigate, NavigationBar, useBooks, SearchBar } from "../imports";

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

      <div className="py-5"
        style={{
          background: "linear-gradient(to top, #b224ef 0%, #7579ff 100%)",
          minHeight: '100vh'
        }}
      >
        <SearchBar />
        <div className="container my-4">
          <h3 className="text-center mb-4 heading card-heading">
            AVAILABLE BOOKS
          </h3>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            {books.map((value, index) => (
              <div className="col" key={index}>
                <div
                  className="card h-100 d-flex flex-column justify-content-between border-0 shadow-sm"
                  style={{ borderRadius: '0.75rem', transition: 'transform 0.2s ease-in-out' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <img
                    src={
                      value.volumeInfo.imageLinks?.smallThumbnail ||
                      'placeholder.jpg'
                    }
                    className="card-img-top mx-auto my-3"
                    alt={value.volumeInfo.title}
                    style={{
                      maxWidth: '110px',
                      maxHeight: '200px',
                      objectFit: 'contain'
                    }}
                  />

                  <div className="card-body d-flex flex-column justify-content-between text-center">
                    <h5
                      className="card-title text-truncate"
                      style={{ fontSize: '1rem', fontWeight: '500' }}
                    >
                      {value.volumeInfo.title}
                    </h5>

                    <p
                      className="card-text text-truncate text-muted"
                      style={{ fontSize: '0.9rem' }}
                    >
                      {value.volumeInfo.authors}
                    </p>

                    <div className="mt-auto">
                      <a
                        href="#"
                        className="btn btn-primary btn-sm w-100 view-details-btn"
                        onClick={() => handleView(value.id)}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
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
      </div>
    </>
  );
}

export default Home;
