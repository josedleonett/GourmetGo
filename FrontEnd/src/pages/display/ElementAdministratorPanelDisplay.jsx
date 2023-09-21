import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const ElementAdministratorPanelDisplay = () => {
  const { category } = useParams();
  const navigateTo = useNavigate();

  const categoriesParameters = {
    bundle: [
      "Id",
      "Name",
      "Main image",
      "Gallery images",
      "Starter",
      "Main course",
      "Desserts",
      "Drinks",
    ],
    drink: ["Id", "Name", "Image", "Price", "Amount"],
    plate: ["Id", "Name", "Type", "Description", "Image"],
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const Box = styled(Paper)(({ theme }) => ({
    display: "flex",
    wrap: "nowrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    textAlign: "center",
    color: theme.palette.text.secondary,
    gap: "10vw",
  }));

  const [data, setData] = useState([]);
  let apiUrl = `http://localhost:8080/v1/${category}/`;

  const apiURLMemoized = useMemo(() => apiUrl, [apiUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURLMemoized);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [apiURLMemoized]);

  const handleAddClick = () => {
    navigateTo(`/administration-panel/${category}/edit`);
  };

  function DataRow() {
    return (
      <React.Fragment>
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            gap: "1vw",
          }}
        >
          {data.map((item, index) => (
            <Grid container item key={index}>
              {Object.entries(item).map(([key, value]) => (
                <Grid
                  item
                  xs={2}
                  key={key}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Item key={index}>
                    <strong>{key}:</strong>{" "}
                    {key === "image" ? (
                      <img
                        src={`http://localhost:8080/asset/get-object?key=${item.image}`}
                        alt={item.name}
                        style={{ maxWidth: "100%", maxHeight: "100px" }}
                      />
                    ) : (
                      value
                    )}
                  </Item>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid
          container
          item
          spacing={3}
          sx={{ flexWrap: "nowrap", width: "100%" }}
        >
          <DataRow></DataRow>
        </Grid>
      </Grid>
      <button onClick={handleAddClick}>Add</button>
    </Box>
  );
};
