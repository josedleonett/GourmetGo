import { API_BASE_URL } from '../../utils/urlApis';
import SearchBannerDisplay from '../display/SearchBannerDisplay';
import React, { useEffect, useState } from 'react';

const SearchBannerContainer = ({ filterList, filterBundle }) => {
  const [dates, setDates] = useState(null);

  useEffect(() => {
    const handleBundleSelected = (event) => {
      const bundleId = event.detail;
      window.location.href = `${API_BASE_URL}product/${encodeURIComponent(bundleId)}`;
    };

    fetch(`${API_BASE_URL}booking/dates`)
        .then((response) => response.json())
        .then((data) => setDates(data))
        .catch((error) => console.error("Error fetching booking dates:", error));

    window.addEventListener('bundleSelected', handleBundleSelected);
    return () => {
      window.removeEventListener('bundleSelected', handleBundleSelected);
    };
  }, []);

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
    />
  );
};

export default SearchBannerContainer;