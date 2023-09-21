import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect } from "react";
import "photoswipe/style.css";
import { Box } from "@mui/system";
import { Container, Grid, Skeleton } from "@mui/material";
import { useParams } from "react-router";

const CoverProductGalleryDisplay = ({ imgList, galleryId, isLoading }) => {
  const URL_IMAGE_BASE = "http://localhost:8080/asset/get-object?key="
  const { id } = useParams();

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
    const maxImages = 4;

  return (
    <div>
      <Container
        className="pswp-gallery"
        id={galleryId}
        sx={{ display: "flex", width: "100%", height: "100%" }}
      >
        {!isLoading ? (
          <>
            <Box
              component="a"
              href={`${URL_IMAGE_BASE}${imgList[0]}`}
              target="_blank"
              rel="noreferrer"
              sx={{
                width: "50%",
                flexShrink: 0,
                marginRight: "1rem",
                height: "100%",
              }}
            >
              <Box
                component="img"
                src={`${URL_IMAGE_BASE}${imgList[0]}`}
                alt={`Image 1`}
                width="100%"
                height="auto"
                sx={{
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </Box>
            <Grid container spacing={1}>
              {imgList.slice(1, maxImages + 1).map((img, index) => (
                <Grid item key={index} xs={6}>
                  <Box
                    component="a"
                    href={`${URL_IMAGE_BASE}${img}`}
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Box
                      component="img"
                      src={`${URL_IMAGE_BASE}${img}`}
                      alt={`Image ${index + 2}`}
                      width="100%"
                      height="auto"
                      sx={{
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <Box
              width="50%"
              height="100%"
              rel="noreferrer"
              sx={{
                flexShrink: 0,
                marginRight: "1rem",
              }}
            >
              <Box
                sx={{
                  width: {xs: "100%", md: "100%", lg: "100%"},
                  height: {xs: "25vw", md: "25vw", lg: 360},
                }}
              >
                <Skeleton variant="rectangular" width="100%" height={"100%"} />
              </Box>
            </Box>
            <Grid container spacing={1}>
              {Array.from({ length: 4 }, (_, index) => (
                <Grid item key={index} xs={6}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{
                      display: "flex",
                      width: "100%",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
};

export default CoverProductGalleryDisplay;