import axios from "axios";
import { ChangeEvent, useState } from "react";
import { fetchBusStops } from "../services/busStopService";
import validateInput from "../services/validationService";

interface SearchBarProps {
  onSearch: (searchValue: string) => Promise<void>;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async () => {
    if (validateInput(searchValue)) {
      await onSearch(searchValue);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid input. Please enter a 4-digit bus stop number.");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="row justify-content-center mb-4">
      <div className="col-lg-10">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Bus Stop Number..."
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
        {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default SearchBar;
