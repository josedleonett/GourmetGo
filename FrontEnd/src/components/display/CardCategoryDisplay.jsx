import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { API_BASE_IMAGE_URL, API_BASE_URL } from "../../utils/urlApis";

const CardCategoryDisplay = ({ id, img, title, description }) => {
  return (
    <>
      <Card >
        <CardActionArea LinkComponent={Link} to={`/category/${id}`} sx={{
                width: {
                  lg: '17vw',
                  md: '100%',
                  xs: '100%',
                },
                height: {
                  lg: '100%',
                  md: '100%',
                  xs: '40vh',
                },
                minWidth: {
                  lg: '17vw',
                  md: '100%',
                  xs: '100%',
                },
                minHeight: {
                  lg: '20vw',
                  md: "200px",
                  xs: '40vh',
                },
              }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { lg: "column", md: "row", xs: "column" },
            }}
          >
            <CardMedia
              component="img"
              image={`${API_BASE_IMAGE_URL}${img}`}
              alt={title + " cover"}
              sx={{
                width: {
                  lg: '100%',
                  md: '60%',
                  xs: '100%',
                },
                height: {
                  lg: '100%',
                  md: '100%',
                  xs: '200px',
                },
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
            <CardContent sx={{
                width: {
                  lg: '100%',
                  md: '40%',
                  xs: '100%',
                },
                height: {
                  lg: '100%',
                  md: '100%',
                  xs: '100%',
                },
              }}>
              <Typography gutterBottom variant="h6">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{width: '85%'}}>
                {description}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    </>
  );
};

export default CardCategoryDisplay;
