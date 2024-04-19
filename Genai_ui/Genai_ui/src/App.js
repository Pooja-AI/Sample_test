import React, { useEffect, useState } from 'react';
import LoginLocal from './login_local';
import Login from './login';
import './App.css';
import { MsalProvider } from '@azure/msal-react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';
import { b2cPolicies } from './Auth/authConfig';
import { compareIssuingPolicy } from './Auth/claimUtils';
import Home from './Home';

const App = ({ instance1 }) => {
  // useEffect(() => {

  //   const callbackId = instance1.addEventCallback((event) => {
  //     if (
  //       (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
  //       event.payload.account
  //     ) {
  //       /**
  //        * For the purpose of setting an active account for UI update, we want to consider only the auth
  //        * response resulting from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy
  //        * policies may use "acr" instead of "tfp"). To learn more about B2C tokens, visit:
  //        * https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
  //        */
  //       if (event.payload.idTokenClaims['tfp'] === b2cPolicies.names.editProfile) {
  //         // retrieve the account from initial sing-in to the app
  //         const originalSignInAccount = instance1
  //           .getAllAccounts()
  //           .find(
  //             (account) =>
  //               account.idTokenClaims.oid === event.payload.idTokenClaims.oid &&
  //               account.idTokenClaims.sub === event.payload.idTokenClaims.sub &&
  //               account.idTokenClaims['tfp'] === b2cPolicies.names.signUpSignIn
  //           );

  //         let signUpSignInFlowRequest = {
  //           authority: b2cPolicies.authorities.signUpSignIn.authority,
  //           account: originalSignInAccount,
  //         };

  //         // silently login again with the signUpSignIn policy
  //         instance1.ssoSilent(signUpSignInFlowRequest);
  //       }

  //       /**
  //        * Below we are checking if the user is returning from the reset password flow.
  //        * If so, we will ask the user to reauthenticate with their new password.
  //        * If you do not want this behavior and prefer your users to stay signed in instead,
  //        * you can replace the code below with the same pattern used for handling the return from
  //        * profile edit flow
  //        */
  //       if (compareIssuingPolicy(event.payload.idTokenClaims, b2cPolicies.names.forgotPassword)) {
  //         let signUpSignInFlowRequest = {
  //           authority: b2cPolicies.authorities.signUpSignIn.authority,
  //         };
  //         instance1.loginRedirect(signUpSignInFlowRequest);
  //       }
  //     }

  //     if (event.eventType === EventType.LOGIN_FAILURE) {
  //       // Check for forgot password error
  //       // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
  //       if (event.error && event.error.errorMessage.includes('AADB2C90118')) {
  //         const resetPasswordRequest = {
  //           authority: b2cPolicies.authorities.forgotPassword.authority,
  //           scopes: [],
  //         };
  //         instance1.loginRedirect(resetPasswordRequest);
  //       }
  //     }
  //   });

  //   return () => {
  //     console.log("callback useeffect")
  //     if (callbackId) {
  //       console.log("callback")
  //       instance1.removeEventCallback(callbackId);
  //     }
  //   };
  // }, [instance1]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <div className=" main-m">
      <div >
       <>
          {isLoggedIn ? (
            <Home />
          ) : (
            <LoginLocal onLogin={handleLogin} />
          )}
        </>
        
        <footer className="footer">
          <p>&copy; 2023 Accenture. All Rights Reserved.</p>
        </footer>
      </div>
    </div>


  )
}

export default App;
