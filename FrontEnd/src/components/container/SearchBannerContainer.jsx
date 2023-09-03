import SearchBannerDisplay from '../display/SearchBannerDisplay';
import React, { useEffect } from 'react';

const SearchBannerContainer = ({ filterList, filterBundle }) => {
  const handleCategorySelect = (categoryId) => {
    console.log('handleCategorySelect called with categoryId:', categoryId);
    // Agrega la lógica para redirigir a la página de categoría utilizando categoryId
    window.location.href = `http://127.0.0.1:5173/category/${encodeURIComponent(categoryId)}`;
  };

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
    console.log('handleSearchSelect:', searchValue);
    const selectedBundle = filterBundle.find((bundle) => bundle.name === searchValue);
    if (selectedBundle) {
      window.location.href = `http://127.0.0.1:5173/product/${encodeURIComponent(selectedBundle.id)}`;
    } else {
      console.error('Bundle no encontrado');
    }
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
      handleCategorySelect={handleCategorySelect} // Pasamos la función para manejar la redirección de categorías
    />
  );
};

export default SearchBannerContainer;
