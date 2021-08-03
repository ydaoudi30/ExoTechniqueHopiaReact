import React, {useState,useEffect} from 'react'
import { PieChart, Pie, Sector, Cell, Grid, TextField , makeStyles, FormControl, RadioGroup, FormLabel, Radio, FormControlLabel, Slider} from '@material-ui/core';
import {useForm, Form} from '../../components/useForm';
import Controls from "../../components/controls/Controls";
import ressource from "../../ressources/ressource.jpeg";
import * as machineService from "../../services/machineService";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const muiTheme = createMuiTheme({
  overrides:{
    MuiSlider: {
      thumb:{
      color: "yellow",
      },
      track: {
        color: 'orange'
      },
      rail: {
        color: 'black'
      }
    }
}
});



const useStyles = makeStyles(theme => ({
  root: {
    height: 350
  },
  rail: {
      height: theme.spacing(4),
  },
  track: {
      height: theme.spacing(4),
  },
  mark: {
      height: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
  },
  thumb: {
      display: 'none',
  },
}));

const activityItems = [
    {id:'Opération normale', title:'Opération normale'},
    {id:'En alerte', title:'En alerte'},
    {id:'Arrêté', title:'Arrêté'},
]

const initialFValues = {
    id:0,
    name:'',
    description:'',
    model:'',
    responsable:'',
    status:'',
    health:'30',
    unitId:'',
    pic:'',
}

export default function MachineCard(props) {
    const {addOrEdit, recordForEdit } = props

    const validate=()=>{
        let temp = {}
        temp.name = values.name? "" : "Requis"
        temp.model = values.model? "": "Requis"
        temp.responsable = values.responsable? "" :"Requis"
        temp.unitId = values.unitId.length != 0 ? "" : "Requis"
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x == "")
    }


    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialFValues);

    const classes = useStyles();

    const handleSubmit = e => {
        e.preventDefault()
        if(validate())
           addOrEdit(values);
    }

    useEffect(()=>{
        if (recordForEdit != null)
        setValues({
            ...recordForEdit
        })
    } , [recordForEdit])

    const data = [
        {name: "Santé", value:30},
    ]

    
    return(
    
        <Form onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={6}>
            <img src={require('../../ressources/ressource.jpeg').default} height={200} width={200} />
            </Grid>

            <Grid item xs={6}>
                

                <TextField
                    name="name"
                    label="Nom"
                    value={values.name}
                />
                <TextField
                    
                    name="description"
                    label="Description"
                    value={values.description}
                />
                
                <TextField
                    name="model"
                    label="Modèle"
                    value={values.model}
                />
                <TextField
                    name="responsable"
                    label="Responsable"
                    value={values.responsable}
                    
                />
                <TextField
                name="status"
                label="Statut"
                value={values.status}
                
            />
            
            <TextField
                name="unitId"
                label="Unité"
                value={values.unitId}
            />

            
            
            <ThemeProvider theme={muiTheme}>
            <Slider
                value={30}
                min={0}
                max={100}
                marks
                valueLabelDisplay="off"
                classes={{
                    rail: classes.rail,
                    track: classes.track,
                    thumb:classes.thumb,
                    mark:classes.mark,
                }}
                />
                </ThemeProvider>
                <br></br><br></br>30% de Santé restante

        </Grid>
        
        

    </Grid>
    </Form>
    )
}