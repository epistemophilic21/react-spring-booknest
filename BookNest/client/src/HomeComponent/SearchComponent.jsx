import { FaSearch } from "../imports"

const SearchComponent = () => {
    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="input-group shadow-sm rounded overflow-hidden">
                        <input
                            type="text"
                            className="form-control border-0 px-3 py-2"
                            placeholder="Search for books..."
                            style={{
                                fontSize: '1rem',
                            }}
                        />
                        <button
                            className="btn btn-primary px-4"
                            type="button"
                            style={{
                                fontWeight: '500',
                                outline: 'none',
                                boxShadow: 'none',
                            }}
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