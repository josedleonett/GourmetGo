import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect } from "react";
import "photoswipe/style.css";
import { Box } from "@mui/system";
import { Container, Grid } from "@mui/material";
import { useParams } from "react-router";

const CoverProductGalleryDisplay = ({ imgList, galleryId }) => {
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
      <Container className="pswp-gallery" id={galleryId} sx={{ display: "flex", width: "100%"}}>
        <Box
          component="a"
          href={`http://localhost:8080/asset/get-object?key=${imgList[0]}`}
          target="_blank"
          rel="noreferrer"
          sx={{ width: "50%", flexShrink: 0, marginRight: "1rem", height: "100%" }}
        >
          <Box
            component="img"
            src={`http://localhost:8080/asset/get-object?key=${imgList[0]}`}
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
            <Grid
              item
              key={index}
              xs={6}
            >
              <Box
                component="a"
                href={`http://localhost:8080/asset/get-object?key=${img}`}
                target="_blank"
                rel="noreferrer"
                sx={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <Box
                  component="img"
                  src={`http://localhost:8080/asset/get-object?key=${img}`}
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
      </Container>
    </div>
  );
};

export default CoverProductGalleryDisplay;