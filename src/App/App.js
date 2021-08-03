import React from 'react'
//import logo from './logo.svg';
import './App.css';
import SideMenu from '../components/SideMenu';
import { CssBaseline, makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import Machines from '../pages/Machines/Machines';
const useStyles = makeStyles({
  appMain:{
    paddingLeft:'320px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();
  return (
    <>
    <SideMenu />
    <div className= {classes.appMain}>
      <Header/>
      
      <Machines />
    </div>
    <CssBaseline />
    </>
  );
}

export default App;
