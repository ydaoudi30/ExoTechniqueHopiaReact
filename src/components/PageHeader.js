import { Card, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme =>({
    root: {
        backgroundColor:'#fdfdff'
    },
    PageHeader:{
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2)

    },
    pageIcon:{
        display:'inline block',
        padding:theme.spacing(2),
        color:'#3c44b1'
    },
    pageTitle:{
        paddingLeft:theme.spacing(4),
    }
}))


export default function PageHeader(props) {
    const classes = useStyles();
    const {title, subTitle, icon} = props;
    return (
        <Paper elevation={0} square className= {classes.root}>
            <div className={classes.PageHeader}>
            <Card className={classes.pageIcon}>
                {icon}
            </Card>

            <div className={classes.pageTitle}>
               <Typography 
                variant="h6"
                component="div">
                {title}</Typography>
                <Typography 
                variant="h6"
                component="div">
                {subTitle}</Typography>

            </div>

            </div>
        </Paper>
    ) 
}