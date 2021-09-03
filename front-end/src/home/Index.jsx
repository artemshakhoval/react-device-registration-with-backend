import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";

function Home() {
  return (
    <Box>
      <Typography variant="h2">Delinternet OLTS - UI</Typography>
      <Typography variant="h6">
        <Link to="users">&gt;&gt; Manage OLTS</Link>
      </Typography>
    </Box>
  );
}

export { Home };
