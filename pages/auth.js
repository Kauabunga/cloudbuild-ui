import React from "react";
import Paper from "@mui/material/Paper";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import NoSsr from "@mui/core/NoSsr";

import { clientCredentials } from "../src/firebase/client-app";
import { Typography } from "@mui/material";
import MainLayoutCenter from "../src/components/MainLayoutCenter";

firebase.initializeApp(clientCredentials);

// Configure FirebaseUI.
const uiConfig = {
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // GitHub as the only included Auth Provider.
  // You could add and configure more here!
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function SignInScreen() {
  return (
    <MainLayoutCenter>
      <Paper sx={{ padding: 8 }}>
        <Typography component="h1" variant="h3" gutterBottom>
          Cloudbuild CI
        </Typography>

        <NoSsr>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </NoSsr>
      </Paper>
    </MainLayoutCenter>
  );
}

export default SignInScreen;
