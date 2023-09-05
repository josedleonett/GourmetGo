import { useEffect } from 'react';
import SearchBannerDisplay from '../display/SearchBannerDisplay';


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

  const handleSearchSelect = (searchValue) => {
    console.log('handleSearchSelect:', searchValue);
    const selectedBundle = filterBundle.find((bundle) => bundle.name === searchValue);
    if (selectedBundle) {
      window.location.href = `http://127.0.0.1:5173/product/${encodeURIComponent(selectedBundle.id)}`;
    } else {
      // Si no se ha seleccionado un bundle, redirige a la categoría
      window.location.href = `http://127.0.0.1:5173/category/${encodeURIComponent(selectedFilter)}`;
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
    />
  );
};

export default SearchBannerContainer;
