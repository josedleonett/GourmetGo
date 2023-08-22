import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import Swal from 'sweetalert2';

const UserLogInDisplay = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        localStorage.setItem("tokenType", data.tokenType);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("name", data.name);
        localStorage.setItem("lastName", data.lastName);
        localStorage.setItem("email", data.email);
        window.location.href = "/";
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login error',
          text: 'The login was not successful. Please verify your credentials and try again.',
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const inputFields = [
    { name: "username", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

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
  };

  return (
    <Box sx={{ padding: "10vw" }}>
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
            "@media (max-width: 768px)": { width: "50%" },
          }}
        >
          Log in
        </Button>
      </Box>
    </Box>
  );
};

export default UserLogInDisplay;
