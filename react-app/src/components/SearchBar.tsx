import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import validateInput from "../services/validationService";
import Button from "react-bootstrap/Button";
import { fetchAllStopIds } from "../services/allStopService";
// Import the "i" logo SVG file
import iLogo from "../assets/info-circle-fill.svg";

interface SearchBarProps {
  onSearch: (searchValue: string) => Promise<void>;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [allStopIds, setAllStopIds] = useState<string[]>([]);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<
    string[]
  >([]);


  useEffect(() => {
    async function fetchAllStops() {
      try {
        const stopIds = await fetchAllStopIds(); // Fetch all stop IDs
        console.log("stops in search", stopIds)
        setAllStopIds(stopIds);
      } catch (error) {
        console.error("Error fetching all stops:", error);
      }
    }

    fetchAllStops();
  }, []);

  const handleAutocomplete = (value: string) => {
    const filteredSuggestions = allStopIds.filter((stopId) =>
      stopId.startsWith(value)
    );
    console.log("Filtered suggestions:", filteredSuggestions); // Add this line
    setAutocompleteSuggestions(filteredSuggestions);
  };

  // Function to handle search button click
  const handleClick = async () => {
    if (validateInput(searchValue)) {
      await onSearch(searchValue);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid input. Please enter a 4-digit bus stop number.");
    }
  };

  // Function to handle Enter key press in the input field
  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await handleClick();
    }
  };

  // Function to handle input field value change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    handleAutocomplete(event.target.value);
  };

  const handleAutocompleteSelection = (value: string) => {
    setSearchValue(value);
    setAutocompleteSuggestions([]);
  };

  // Function to handle click on the info button
  const handleInfoClick = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="row justify-content-center mb-4">
      <div className="col-lg-10">
        <div className="input-group">
          {/* Info button with "i" logo */}
          <button
            className="btn btn-default"
            onClick={handleInfoClick}
            type="button"
          >
            <img src={iLogo} alt="i Logo" width="20" height="20" />
          </button>
          {/* Input field for bus stop number */}
          <input
            type="text"
            className="form-control"
            placeholder="Bus Stop Number..."
            value={searchValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          {/* Go button */}
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
        {/* Error message display */}
        {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}

        {/* Modal for information */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please enter a valid Wellington bus stop number. Make sure to check
            the specific bus stop you're looking for.
          </Modal.Body>
          <Modal.Footer>
            {/* Close button in the modal */}
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {autocompleteSuggestions.length > 0 && (
          <div
            className="autocomplete-suggestions mt-2"
            style={{ maxHeight: "150px", overflowY: "auto" }}
          >
            <div className="list-group">
              {autocompleteSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="list-group-item list-group-item-action"
                  onClick={() => handleAutocompleteSelection(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
