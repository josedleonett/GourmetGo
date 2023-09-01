import Container from "@mui/material/Container";
import { Typography, IconButton, Box } from "@mui/material";
import { Grid } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { companyLogo } from "../../utils/theme";

const FooterDisplay = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Container
        component="section"
        maxWidth="100vw"
        sx={{ backgroundColor: "#AFC2C9", minHeight: "149px" }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: "100%" }}
          spacing={2}
        >
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Box
              component="img"
              src={companyLogo.grayColor}
              alt="GourmetGo-logo"
              maxWidth={"200px"}
              sx={{ margin: "0 auto" }}
            />
            <Typography
              variant="body2"
              sx={{ fontSize: "12px", marginBottom: 1 }}
            >
              Copyright © 2023. GourmetGo. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Grid
              container
              alignItems="center"
              spacing={1}
              justifyContent={{ xs: "center", sm: "flex-end" }}
            >
              <Grid item>
                <IconButton
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: "#000000",
                    "&:hover": {
                      color: "#ffffff",
                    },
                  }}
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: "#000000",
                    "&:hover": {
                      color: "#ffffff",
                    },
                  }}
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: "#000000",
                    "&:hover": {
                      color: "#ffffff",
                    },
                  }}
                >
                  <FacebookIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid
                item
                sx={{ display: { xs: "none", sm: "block" }, marginTop: -10 }}
              >
                <IconButton onClick={handleScrollToTop}>
                  <KeyboardArrowUpIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FooterDisplay;
