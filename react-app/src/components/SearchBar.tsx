import axios from "axios";
import { ChangeEvent, useState } from "react";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  const handleClick = async () => {
    try {
      // Make an HTTP GET request to your server's endpoint with the search value
      const response = await axios.get<any[]>(
        `http://localhost:3000/api/bus-stop/${searchValue}`
      );

      console.log(response.data)
    } catch (error) {
      console.error("Error retrieving bus stop information:", error);
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for..."
            value={searchValue}
            onChange={handleChange}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-default"
              onClick={handleClick}
              type="button"
            >
              Go!{" "}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
