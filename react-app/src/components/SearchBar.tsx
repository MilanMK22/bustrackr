import axios from "axios";
import iLogo from "../assets/info-circle-fill.svg";
import { ChangeEvent, useState } from "react";
import { fetchBusStops } from "../services/busStopService";
import Modal from "react-bootstrap/Modal";
import validateInput from "../services/validationService";
import Button from "react-bootstrap/Button";

interface SearchBarProps {
  onSearch: (searchValue: string) => Promise<void>;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    if (validateInput(searchValue)) {
      await onSearch(searchValue);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid input. Please enter a 4-digit bus stop number.");
    }
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await handleClick();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleInfoClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="row justify-content-center mb-4">
      <div className="col-lg-10">
        <div className="input-group">
          <button
            className="btn btn-default"
            onClick={handleInfoClick}
            type="button"
          >
            <img src={iLogo} alt="i Logo" width="20" height="20" />
          </button>
          <input
            type="text"
            className="form-control"
            placeholder="Bus Stop Number..."
            value={searchValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
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

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please enter a valid Wellington bus stop number. Make sure to check
            the specific bus stop you're looking for.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default SearchBar;
