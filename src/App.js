
import React from 'react';
import styled from 'styled-components';

import { GlobalStyles } from './global';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

import {Redirect, Route, Switch} from 'react-router-dom';

import ErrorPage from './pages/errorPage';
import SongsPage from './pages/songsPage';

import BottomBar from './components/bottomBar';
import NavBar from './components/navBar';

import {SuccessToast, ErrorToast, RegularToast } from './components/toast';

import { useSelector, useDispatch } from 'react-redux';
import { clearToast } from './redux/actions';
import { getDrag, getScroll, getToast } from './redux/selectors';

const BlankFooter = styled.div`
  width : 100%;
  height : 20vh;
`;

function App() {

  var isDragging = useSelector(getDrag).dragging;
  var isScrollable = useSelector(getScroll).scroll;
  const dispatch = useDispatch();

  return(
    <ThemeProvider theme={theme}>
      <GlobalStyles drag={isDragging} scroll={isScrollable}/>
      <ErrorToast onClose={() => dispatch(clearToast())} show={useSelector(getToast).type === "error"} message={useSelector(getToast).msg}/>
      <SuccessToast onClose={() => dispatch(clearToast())} show={useSelector(getToast).type === "success"} message={useSelector(getToast).msg}/>
      <RegularToast onClose={() => dispatch(clearToast())} show={useSelector(getToast).type === "regular"} message={useSelector(getToast).msg}/>

      <NavBar/>

      <Switch>

        {/* <Route exact path="/home">
          <HomePage/>
        </Route> */}

        <Route exact path="/songs">
            <SongsPage/>
        </Route>

        <Route exact path="/">
          <Redirect to="/songs"/>
        </Route> 



        <Route exact path="/error">
          <ErrorPage/>
        </Route>

        <Route>
          <Redirect to="/error"/>
        </Route>


      </Switch>
      <BlankFooter/>
      <BottomBar/>

    </ThemeProvider>
  );
}

export default App;
