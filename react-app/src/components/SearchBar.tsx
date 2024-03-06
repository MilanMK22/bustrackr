import axios from "axios";
import { ChangeEvent, useState } from "react";
import { fetchBusStops } from "../services/busStopService";

interface SearchBarProps {
  onSearch: (searchValue: string) => Promise<void>;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleClick = async () => {
    await onSearch(searchValue);
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
      </div>
    </div>
  );
}

export default SearchBar;
