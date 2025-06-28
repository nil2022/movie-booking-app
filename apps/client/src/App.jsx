import "./App.css";
import { Box, Heading } from "@chakra-ui/react";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Box p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={8} fontFamily="body">
        Movie Booking App
      </Heading>
      <Register />
      <Login />
    </Box>
  );
}

export default App;
