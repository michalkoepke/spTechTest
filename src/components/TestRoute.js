import React from "react";

import { Box } from "@chakra-ui/react";
import { useAuth } from "../store/AuthContext";

const TestRoute = () => {
  const { testValue } = useAuth();

  return (
    <div>
      <Box w="70%" p={10} bg="red.300">
        Test: {testValue}
      </Box>
    </div>
  );
};

export default TestRoute;
