import SearchBannerDisplay from '../display/SearchBannerDisplay';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';

const SearchBannerContainer = ({ filterList, filterBundle }) => {


  useEffect(() => {
    const handleBundleSelected = (event) => {
      const bundleId = event.detail;
      window.location.href = `http://127.0.0.1:5173/product/${encodeURIComponent(bundleId)}`;
    };

    window.addEventListener('bundleSelected', handleBundleSelected);
    return () => {
      window.removeEventListener('bundleSelected', handleBundleSelected);
    };
  }, []);

  return (
    <SearchBannerDisplay
      filterList={filterList}
      filterBundle={filterBundle}
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