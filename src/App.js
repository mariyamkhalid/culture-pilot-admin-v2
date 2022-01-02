import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./style.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

import City from "./pages/City";
import CityForm from "./components/CityForm";
import "bootstrap/dist/css/bootstrap.min.css";
Amplify.configure(awsconfig);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <button onClick={signOut}>Sign out</button>
          <City />
          <CityForm />
        </div>
      )}
    </Authenticator>
  );
}

export default App;
