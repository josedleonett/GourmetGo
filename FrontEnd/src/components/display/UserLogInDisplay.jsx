import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Box, TextField, Button, Typography, useMediaQuery, CircularProgress  } from "@mui/material";
import Swal from 'sweetalert2';

const UserLogInDisplay = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [accessToken, setAccessToken] = useState ();

  const [inputSuccess, setInputSuccess] = useState({
    password: false,
    username: false,
  });

  const [borderStyles, setBorderStyles] = useState({
    password: { width: "20vw" },
    username: { width: "20vw" },
  });

  const [labels, setLabels] = useState({
    password: "",
    username: "",
  });

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const inputFields = [
    { name: "username", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const handleInputChange = (field, value) => {
    setInputs((prevInputs) => ({ ...prevInputs, [field]: value }));
  
    if (field === "username") {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      setInputSuccess((prevInputSuccess) => ({
        ...prevInputSuccess,
        [field]: emailPattern.test(value),
      }));
    } else {
      setInputSuccess((prevInputSuccess) => ({
        ...prevInputSuccess,
        [field]: value !== "",
      }));
    }
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Iniciar el indicador de carga
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (response.ok) {
        const data = await response.json();
        const authorizationHeader = response.headers.get("authorization");
        setCookie("token", data.accessToken, { path: '/' })
        setAccessToken(data.accessToken);
        // Detener el indicador de carga
        setIsLoading(false);

        // Mostrar la alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Login successful',
          text: 'You have successfully logged in!',
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirigir al usuario a la página de inicio (o donde corresponda)
            window.location.href = "/";
          }
        });
      } else {
        // Detener el indicador de carga en caso de error
        setIsLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Login error',
          text: 'The login was not successful. Please verify your credentials and try again.',
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Detener el indicador de carga en caso de error
      setIsLoading(false);
    }
  };



  return (
    <Box sx={{ padding: "10vw" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h4" sx={{
              backgroundColor: "secondary.light",
              display: "inline-block",
              fontSize: isSmallScreen ? '1.5rem' : '2rem',
              fontWeight: 500,
              padding: "0.5rem",
              paddingTop: "1rem",
              marginBottom: "2rem"
            }}>
              Your dream starts here!
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                textAlign: "center",
                gap: "3vw",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                padding: isSmallScreen ? "10px" : "20px",
                maxWidth: isSmallScreen ? "300px" : "400px",
              }}
            >
              {inputFields.map((field) => (
                <Box key={field.name}>
                  <TextField
                    name={field.name}
                    placeholder={field.label}
                    label={borderStyles[field.name].border ? "" : field.label}
                    type={field.type}
                    value={inputs[field.name]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    sx={{
                      ...borderStyles[field.name],
                      "@media (max-width: 768px)": {
                        width: "100%",
                      },
                    }}
                  />
                </Box>
              ))}
              <Button
                variant="text"
                type="submit"
                sx={{
                  border: "1px solid black",
                  borderRadius: "0px",
                  padding: "1vw",
                  width: "20vw",
                  color: "black",
                  "&:hover": { backgroundColor: "secondary.light" },
                  transition: "background-color 0.3s",
                  "@media (max-width: 768px)": { width: "50%" },
                }}
              >
                Log in
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserLogInDisplay;