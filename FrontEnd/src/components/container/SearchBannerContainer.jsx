import SearchBannerDisplay from '../display/SearchBannerDisplay';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';

const SearchBannerContainer = ({ filterList, filterBundle, onUpdateFilteredOptions }) => {
  const [selectedBundle, setSelectedBundle] = useState("");
  const navigate = useNavigate();
  const [dates, setDates] = useState(null);

  useEffect(() => {
    const handleBundleSelected = (event) => {
      const bundleId = event.detail;
      window.location.href = `http://127.0.0.1:5173/product/${encodeURIComponent(bundleId)}`;
    };

    fetch(`http://localhost:8080/v1/booking/dates`)
        .then((response) => response.json())
        .then((data) => setDates(data))
        .catch((error) => console.error("Error fetching booking dates:", error));

    window.addEventListener('bundleSelected', handleBundleSelected);
    return () => {
      window.removeEventListener('bundleSelected', handleBundleSelected);
    };
  }, []);

  const handleSearchSelect = (searchValue) => {
    if (searchValue !== "" || searchValue !== null) {
      navigate(`/search?filteredOptions=${searchValue}`);
    }
  }
  

  return (
    <SearchBannerDisplay
      filterList={filterList}
      filterBundle={filterBundle}
      dates={dates}
      onBundleSelected={(bundleName) => {
        const selectedBundle = filterBundle.find((bundle) => bundle.name === bundleName);
        if (selectedBundle) {
          const selectedEvent = new CustomEvent('bundleSelected', { detail: selectedBundle.id });
          window.dispatchEvent(selectedEvent);
        }
      }}
      onSearchIconClick={handleSearchSelect}
    />
  );
};

export default SearchBannerContainer;