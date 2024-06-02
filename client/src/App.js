import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from "react-router-dom";
import LoginPage from "./components/pages/Login/LoginPage";
import AdminPortal from "./components/pages/Admin/AdminPortal";
import SurveyLandingPage from "./components/pages/LandingPage/SurveyLandingPage";
import Navbar from "./components/Navbar/Navbar";
import FindSurvey from "./components/pages/Admin/FindSurvey";
import SurveyAnswersPage from "./components/pages/Admin/SurveyAnswersPage";
import "./App.css";
import Login from "./components/pages/Login/Login";
import Signup from "./components/pages/Login/Signup";
import AdminProfile from "./components/pages/Admin/AdminProfile";
import LoadingScreen from 'react-loading-screen';
import logo from './images/technixicon.png'

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const [rowId, setRowId] = useState();
  const [copyOrOriginal, setCopyOrOriginal] = useState();
  const [wholeSurveyInEditModeOrNot, setWholeSurveyInEditModeOrNot] = useState(false);

  const [loading, setLoading]= useState();

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // Listen for changes to the current location.
    const unlisten = history.listen(() => {
        // When the user navigates, show the loading screen.
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500); // Adjust the timeout as needed
    });

    // Clean up the listener when the component is unmounted.
    return () => {
        unlisten();
    };
}, [history]);



  const resetRowId = () => {
    setRowId();
  };

  const resetCopyOrOriginal = () => {
    setCopyOrOriginal();
  };

  return (
    <LoadingScreen
    loading = {loading}
    bgColor="rgba(255, 255, 255, 0.5)"
    spinnerColor="#9ee5f8"
    textColor='#676767'
    text="Loading..."
    logoSrc={logo}
    >
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/survey/:surveyId">
          <SurveyLandingPage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signin">
          <Signup />
        </Route>
        <Route exact path="/profile">
          <AdminProfile />
        </Route>
        <div>
          <Navbar />
          <Route exact path="/create-new">
            <AdminPortal
              rowId={rowId}
              copyOrOriginal={copyOrOriginal}
              wholeSurveyInEditModeOrNot={wholeSurveyInEditModeOrNot}
              setWholeSurveyInEditModeOrNot={setWholeSurveyInEditModeOrNot}
            />
          </Route>
          <Route path="/existing-surveys">
            <FindSurvey
              setRowId={setRowId}
              resetRowId={resetRowId}
              setCopyOrOriginal={setCopyOrOriginal}
              resetCopyOrOriginal={resetCopyOrOriginal}
            />
          </Route>
          <Route path="/data-analysis">
            <SurveyAnswersPage />
          </Route>
        </div>
      </Switch>
    </LoadingScreen>
  );
};

export default App;
