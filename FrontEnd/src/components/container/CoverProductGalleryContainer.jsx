import CoverProductGalleryDisplay from "../display/CoverProductGalleryDisplay";

const CoverProductGalleryContainer = ({ imgList, galleryId, isLoading }) => {

  return <CoverProductGalleryDisplay imgList={imgList} galleryId={galleryId} isLoading={isLoading} />;
};

export default CoverProductGalleryContainer;
