import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const UserRegisterDisplay = () => {
  const [inputs, setInputs] = useState({
    name: "",
    lastName: "",
    password: "",
    passConfirmation: "",
    email: "",
  });

  const [inputSuccess, setInputSuccess] = useState({
    name: false,
    lastName: false,
    password: false,
    passConfirmation: false,
    email: false,
  });

  const [borderStyles, setBorderStyles] = useState({
    name: { width: "20vw" },
    lastName: { width: "20vw" },
    password: { width: "20vw" },
    passConfirmation: { width: "20vw" },
    email: { width: "20vw" },
  });

  const [labels, setLabels] = useState({
    name: "",
    lastName: "",
    password: "",
    passConfirmation: "",
    email: "",
  });

  const [resendButtonVisible, setResendButtonVisible] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [showRetryMessage, setShowRetryMessage] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();


  const regex = /^[A-Za-z]+$/;

  const handleInputChange = (field, value) => {
    setInputs((prevInputs) => ({ ...prevInputs, [field]: value }));
    setInputSuccess((prevInputSuccess) => ({
      ...prevInputSuccess,
      [field]: value !== "",
    }));
    setBorderStyles((prevBorderStyles) => ({
      ...prevBorderStyles,
      [field]:
        value !== ""
          ? { width: "20vw", border: "none" }
          : {
              minWidth: "20vw",
              maxWidth: "45vw",
              border: "1px solid red",
              borderRadius: "5px",
            },
    }));
    setLabels((prevLabels) => ({
      ...prevLabels,
      [field]:
        value !== ""
          ? ""
          : `You need to enter your ${
              inputFields.find((input) => input.name === field).label
            }`,
    }));
  };

  const handleResendConfirmationEmail = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/auth/resendConfirmationEmail?email=${inputs.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Email Resent",
          text: "A confirmation email has been resent to your email address.",
        });
        if (attemptsCount < 2) {
          setShowRetryMessage(false);
          setResendButtonVisible(true);
          setAttemptsCount(attemptsCount + 1);
        } else if (attemptsCount === 2) {
          setResendButtonVisible(false);
          setShowRetryMessage(true);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.password === inputs.passConfirmation) {
      setInputSuccess((prevInputSuccess) => ({
        ...prevInputSuccess,
        password: true,
        passConfirmation: true,
      }));
      setBorderStyles((prevBorderStyles) => ({
        ...prevBorderStyles,
        password: { width: "20vw", border: "none" },
        passConfirmation: { width: "20vw", border: "none" },
      }));
      setLabels((prevLabels) => ({ ...prevLabels, password: "" }));
    } else {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Your passwords do not match. Please check and try again.",
      });
      setBorderStyles((prevBorderStyles) => ({
        ...prevBorderStyles,
        password: {
          width: "20vw",
          border: "1px solid red",
          borderRadius: "5px",
        },
        passConfirmation: {
          width: "20vw",
          border: "1px solid red",
          borderRadius: "5px",
        },
      }));
      setLabels((prevLabels) => ({
        ...prevLabels,
        password: "Your passwords do not match",
      }));
      return;
    }

    if (inputs.email.includes("@") && inputs.email !== "") {
      setInputSuccess((prevInputSuccess) => ({
        ...prevInputSuccess,
        email: true,
      }));
      setBorderStyles((prevBorderStyles) => ({
        ...prevBorderStyles,
        email: { width: "20vw", border: "none" },
      }));
    } else {
      setBorderStyles((prevBorderStyles) => ({
        ...prevBorderStyles,
        email: {
          width: "20vw",
          border: "1px solid red",
          borderRadius: "5px",
        },
      }));
    }

    if (
      (inputs.name && !regex.test(inputs.name)) ||
      (inputs.lastName && !regex.test(inputs.lastName))
    ) {
      setLabels((prevLabels) => ({
        ...prevLabels,
        name: `The first name and last name fields must only contain letters`,
      }));
      setBorderStyles((prevBorderStyles) => ({
        ...prevBorderStyles,
        name: {
          width: "20vw",
          border: "1px solid red",
          borderRadius: "5px",
        },
        lastName: {
          width: "20vw",
          border: "1px solid red",
          borderRadius: "5px",
        },
      }));
      return;
    } else {
      setBorderStyles((prevBorderStyles) => ({
        ...prevBorderStyles,
        name: { width: "20vw", border: "none" },
        lastName: { width: "20vw", border: "none" },
      }));
    }

    if (Object.values(inputSuccess).every((success) => success)) {
      try {
        const response = await fetch("http://localhost:8080/auth/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        });
    
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Successful registration",
            text: "Please check your email for further instructions.",
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirigir al usuario a la página de inicio de sesión (login) después de hacer clic en "OK"
              navigate("/user-login");
            }
          });
          setResendButtonVisible(true);
        } else {
          const errorResponse = await response.json();
          console.error("Failed to create user:", errorResponse.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
    
  };

  const inputFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "password", label: "Password", type: "password" },
    {
      name: "passConfirmation",
      label: "Confirm your password",
      type: "password",
    },
    { name: "email", label: "Email", type: "email" },
  ];

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
        <Box sx={{ padding: "10vw", textAlign: "center" }}>
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
            <>
              <Typography
                variant="h4"
                sx={{
                  marginBottom: "3rem",
                  fontSize: isSmallScreen ? "1.5rem" : "2rem",
                  backgroundColor: "secondary.light",
                  display: "inline-block",
                  fontWeight: 500,
                  padding: "0.5rem",
                  paddingTop: "1rem",
                }}
              >
                Join the GourmetGo family!
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
                  gap: isSmallScreen ? "1.5rem" : "3vw",
                  marginTop: "2rem",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: isSmallScreen ? "10px" : "20px",
                  maxWidth: isSmallScreen ? "300px" : "400px",
                  margin: "0 auto",
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
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.value)
                      }
                      sx={{
                        ...borderStyles[field.name],
                        "@media (max-width: 768px)": {
                          width: "100%",
                        },
                      }}
                    />
                    <Typography>{labels[field.name]}</Typography>
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
                    "&:hover": { backgroundColor: "secondary.light" },
                    transition: "background-color 0.3s",
                    color: "black",
                    "@media (max-width: 768px)": { width: "50%" },
                  }}
                >
                  Create Account
                </Button>
                {resendButtonVisible && (
                  <Button
                    variant="text"
                    type="button"
                    onClick={handleResendConfirmationEmail}
                  >
                    Resend email
                  </Button>
                )}
                {showRetryMessage && (
                  <Typography sx={{ marginTop: "1rem", color: "red" }}>
                    You have reached the maximum number of resend attempts. Try
                    again later.
                  </Typography>
                )}
              </Box>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default UserRegisterDisplay;
