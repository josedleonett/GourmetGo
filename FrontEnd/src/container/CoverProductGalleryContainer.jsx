import React from "react";
import CoverProductGalleryDisplay from "../display/CoverProductGalleryDisplay";

const CoverProductGalleryContainer = ({ imgList, galleryId }) => {
  return <CoverProductGalleryDisplay imgList={imgList} galleryId={galleryId} />;
};

export default CoverProductGalleryContainer;
