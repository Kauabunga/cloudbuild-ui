import * as React from "react";
import Router, { useRouter } from "next/router";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import Paper from "@mui/material/Paper";

const actions = [
  {
    value: 0,
    route: "/",
    Component: (
      <BottomNavigationAction key="home" label="Home" icon={<HomeIcon />} />
    ),
  },
  {
    value: 1,
    route: "/builds",
    Component: (
      <BottomNavigationAction key="all" label="All" icon={<BuildIcon />} />
    ),
  },
  {
    value: 2,
    route: "/auth",
    Component: (
      <BottomNavigationAction
        key="auth"
        label="Auth"
        icon={<AccountCircleIcon />}
      />
    ),
  },
];

function BottomNavigation() {
  const router = useRouter();

  const value = React.useMemo(
    () => actions.find((action) => action.route === router.pathname),
    [router.pathname]
  );

  return (
    <>
      <div style={{ paddingBottom: 56 }} />

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <MuiBottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            Router.push(actions[newValue].route);
          }}
        >
          {actions.map((action) => action.Component)}
        </MuiBottomNavigation>
      </Paper>
    </>
  );
}

export default BottomNavigation;
