import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect } from "react";
import "photoswipe/style.css";
import { Box } from "@mui/system";
import { Container, Divider, Grid } from "@mui/material";
import { cateringPackages } from "../test/dataApiSample";
import { useParams } from "react-router";

const CoverProductGalleryDisplay = ({ imgList, galleryId }) => {
  const packageList = cateringPackages;
  const { id } = useParams();

  function findPackageById(array, idToFind) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == idToFind) {
        return i;
      }
    }
    return -1;
  }

  const mainPackageId = findPackageById(packageList, id);

  //   const imgListMapped = (imagesArray) => {
  //     const imgList = imagesArray.map((imagePath) => {
  //       const img = new Image();
  //       img.src = imagePath;

  //       return {
  //         largeURL: imagePath,
  //         thumbnailURL: imagePath,
  //         width: img.width,
  //         height: img.height,
  //       };
  //     });
  //     return imgList;
  //   };

  //   const imgList2 = imgListMapped(imgList);
  //   console.log(imgList2);

  const imgListMapped = imgList.map((imageURL) => {
    const image = new Image();
    image.src = imageURL;

    return {
      largeURL: imageURL,
      thumbnailURL: imageURL,
      width: image.width, // Ancho calculado automáticamente
      height: image.height, // Alto calculado automáticamente
    };
  });

  console.log(imgListMapped);

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + galleryId,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  return (
    <Container className="pswp-gallery" id={galleryId}>
      <Grid container justifyContent="space-evenly" width="100%">
        <Grid
          item
          lg={imgList.length > 1 ? 6 : 12}
          md={imgList.length > 1 ? 6 : 12}
          sx={imgList.length === 1 ? { md: { objectFit: "cover" } } : { pr: 1 }}
          mb={1}
        >
          <Box
            component="a"
            href={imgListMapped[0].largeURL}
            data-pswp-width={imgListMapped[0].width}
            data-pswp-height={imgListMapped[0].height}
            key={galleryId + "-" + 10}
            target="_blank"
            rel="noreferrer"
          >
            <Box
              component="img"
              src={imgListMapped[0].thumbnailURL}
              alt=""
              width="100%"
              height="30vh"
              sx={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          </Box>
        </Grid>

        {imgListMapped.length > 1 && (
          <Grid
            container
            justifyContent="space-evenly"
            spacing={1}
            lg={6}
            md={6}
            mb={1}
          >
            {imgListMapped.slice(1).map((image, index) => (
              <Grid
                item
                key={index}
                xs={3}
                lg={6}
                md={6}
                flexDirection={"column"}
              >
                <Box
                  component="a"
                  href={image.largeURL}
                  data-pswp-width={image.width}
                  data-pswp-height={image.height}
                  key={galleryId + "-" + index}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Box
                    component="img"
                    src={image.thumbnailURL}
                    alt={`Image ${index + 2}`}
                    width="100%"
                    height={
                      imgList.length - 1 <= 2
                        ? { md: "30vh", xs: "10vh" }
                        : { md: "15vh" }
                    }
                    sx={{
                      objectFit: "cover",
                      objectPosition: "center center",
                    }}
                  />
                  {console.log(imgList.length + "nr")}
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Divider sx={{ pt: 2 }} />
    </Container>
  );
};

export default CoverProductGalleryDisplay;
