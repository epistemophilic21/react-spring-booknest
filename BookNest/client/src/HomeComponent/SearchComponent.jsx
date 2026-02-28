import { FaSearch } from "../imports"

const SearchComponent = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="input-group searchbar-shell">
                        <input
                            type="text"
                            className="form-control border-0 px-3 py-2 searchbar-input"
                            placeholder="Search for books..."
                        />
                        <button
                            className="btn px-4 searchbar-btn"
                            type="button"
                        >
                            <FaSearch/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchComponent;
