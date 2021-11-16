import * as React from "react";
import Box from "@mui/material/Box";

export default function MainLayout({ children }) {
  return (
    <Box
      component="main"
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      {children}
    </Box>
  );
}
