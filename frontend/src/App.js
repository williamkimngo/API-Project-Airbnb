import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from './components/Spots'
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from "./components/EditSpotForm";
import { getSpots } from "./store/spots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getSpots()) //need to edit. 
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path={'/spots/new'} component={CreateSpotForm}/>
          <Route path={'/'} exact component={AllSpots}/>
          <Route path={'/spots/:spotId/edit'} component={EditSpotForm}/>
        </Switch>
      )}
    </>
  );
}

export default App;
