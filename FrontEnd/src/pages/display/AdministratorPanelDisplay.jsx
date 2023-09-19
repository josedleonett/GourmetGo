import { useEffect, useState } from "react";
import { Paper, Box, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const ButtonPanel = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: "2vw",
  textDecoration: "none",
  marginBottom: theme.spacing(6),
  borderRadius: theme.spacing(2),
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const TitleBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  padding: theme.spacing(2),
  width: "100%",
  textAlign: "center",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  marginTop: -252,
  marginBottom: 50,
}));

const ContainerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const AdministratorPanelDisplay = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ContainerBox>
          <TitleBox>
            <Typography variant="h4">Administration Panel</Typography>
          </TitleBox>
          <Link
            to="/administration-panel/bundle"
            style={{ textDecoration: "none" }}
          >
            <ButtonPanel>Bundle</ButtonPanel>
          </Link>
          <Link
            to="/administration-panel/drink"
            style={{ textDecoration: "none" }}
          >
            <ButtonPanel>Drinks</ButtonPanel>
          </Link>
          <Link
            to="/administration-panel/plate"
            style={{ textDecoration: "none" }}
          >
            <ButtonPanel>Plates</ButtonPanel>
          </Link>
        </ContainerBox>
      )}
    </>
  );
};
