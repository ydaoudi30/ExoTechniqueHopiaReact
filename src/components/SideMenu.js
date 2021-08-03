import { makeStyles,withStyles } from '@material-ui/core'
import React from 'react'
import logo from "C:/Users/pro/Desktop/reactdemo/src/ressources/hopia.png";


const style = {
    sideMenu: {
        display:'flex',
        flexDirection:'column',
        position: 'absolute',
        left: '0px',
        width:'320px',
        height:'100%',
        backgroundColor: '#253053'
    }
}

const SideMenu = (props) => {
const {classes} = props;
    
    return (
        <div className={classes.sideMenu}>
            <img src={logo} />
        </div>
    )
}

export default withStyles(style)(SideMenu);