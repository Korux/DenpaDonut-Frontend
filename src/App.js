import React from 'react';

import { GlobalStyles } from './global';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

import {Redirect, Route, Switch} from 'react-router-dom';

import HomePage from './pages/homePage';
import ErrorPage from './pages/errorPage';
import SongsPage from './pages/SongsPage';
import PlaylistPage from './pages/PlaylistPage';

import BottomBar from './components/bottomBar';

import {SuccessToast, ErrorToast, RegularToast } from './components/toast';

import { useSelector, useDispatch } from 'react-redux';
import { clearToast } from './redux/actions';
import { getToast } from './redux/selectors';

function App() {

  const dispatch = useDispatch();

  return(
    <ThemeProvider theme={theme}>

    <GlobalStyles />
    <ErrorToast onClose={() => dispatch(clearToast())} show={useSelector(getToast).type === "error"} message={useSelector(getToast).msg}/>
    <SuccessToast onClose={() => dispatch(clearToast())} show={useSelector(getToast).type === "success"} message={useSelector(getToast).msg}/>
    <RegularToast onClose={() => dispatch(clearToast())} show={useSelector(getToast).type === "regular"} message={useSelector(getToast).msg}/>
    {/* navbar here */}
    <Switch>

      <Route exact path="/home">
        <HomePage/>
      </Route>

      <Route exact path="/songs">
          <SongsPage/>
      </Route>

      <Route exact path="/playlist">
          <PlaylistPage/>
      </Route>

      <Route exact path="/">
        <Redirect to="/home"/>
      </Route>

      <Route exact path="/error">
        <ErrorPage/>
      </Route>

      <Route>
        <Redirect to="/error"/>
      </Route>


    </Switch>

    <BottomBar/>

</ThemeProvider>
  );
}

export default App;
