import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from './components/Spots'
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from "./components/EditSpotForm";
import SpotDetail from "./components/SpotDetail";
import OwnerSpots from "./components/OwnerSpots";
import { getSpots } from "./store/spots";
import CreateReviewForm from "./components/CreateReviewForm";
import UserReservations from "./components/UserBookings";
import SearchResults from "./components/SearchResults/SearchResults";
import Footer from "./components/Navigation/Footer";

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
          <Route path={'/bookings'} exact component={UserReservations}/>
          <Route path={'/'} exact component={AllSpots}/>
          <Route path={'/spots'} exact component={AllSpots}/>
          <Route path={'/spots/:spotId'} exact component={SpotDetail}/>
          <Route path={'/search/:destination'} exact component={SearchResults}/>
          <Route path={'/current'} exact component={OwnerSpots}/>
          <Route path={'/spots/:spotId/edit'} component={EditSpotForm}/>
          <Route path={'/spots/:spotId/reviews/new'}component={CreateReviewForm}/>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
