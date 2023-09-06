import { useEffect } from 'react';
import SearchBannerDisplay from '../display/SearchBannerDisplay';
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
=======

>>>>>>> 210940881bcc7cdbf6c867f0468f685d56e0262f

const SearchBannerContainer = ({ filterList, filterBundle, onUpdateFilteredOptions }) => {
  const [selectedBundle, setSelectedBundle] = useState("");
  const navigate = useNavigate();

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

  const handleSearchSelect = (searchValue) => {
<<<<<<< HEAD
    console.log('handleSearchSelect:', searchValue);// Actualiza el estado con el nombre del bundle seleccionado
      navigate(`/search?filteredOptions=${searchValue}`);
=======
    const selectedBundle = filterBundle.find((bundle) => bundle.name === searchValue);
    if (selectedBundle) {
      window.location.href = `http://127.0.0.1:5173/product/${encodeURIComponent(selectedBundle.id)}`;
    } else {
      window.location.href = `http://127.0.0.1:5173/category/${encodeURIComponent(selectedFilter)}`;
    }
>>>>>>> 210940881bcc7cdbf6c867f0468f685d56e0262f
  };

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
      onSearchIconClick={handleSearchSelect}
    />
  );
};

export default SearchBannerContainer;