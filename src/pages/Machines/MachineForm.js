import React, {useState,useEffect} from 'react'
import { Grid, TextField , makeStyles, FormControl, RadioGroup, FormLabel, Radio, FormControlLabel} from '@material-ui/core';
import {useForm, Form} from '../../components/useForm';
import Controls from "../../components/controls/Controls";
import * as machineService from "../../services/machineService";


const useStyles = makeStyles({
  root: {
    height: 350
  }
});

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

export default function MachineForm(props) {
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

    
    return(
    
        <Form onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={6}>
                <Controls.Input
                    name="name"
                    label="Nom"
                    value={values.name}
                    onChange={handleInputChange}
                    error={errors.name}
                />
                <Controls.Input
                    
                    name="description"
                    label="Description"
                    value={values.description}
                    onChange={handleInputChange}
                    className={classes.root}
                />
                <Controls.Input
                    name="model"
                    label="Modèle"
                    value={values.model}
                    onChange={handleInputChange}
                    error={errors.model}
                />
                <Controls.Input
                    name="responsable"
                    label="Responsable"
                    value={values.responsable}
                    onChange={handleInputChange}
                    error={errors.responsable}
                />

            <label htmlFor="myInput"><br></br><br></br>Upload d'images:  </label>
            <input id="myInput" type="file"
                    name="pic"
                    label="pic"
                    value={values.pic}
                    onChange={handleInputChange}>
                    
            </input>

        </Grid>
        <Grid item xs={6}>
            <Controls.RadioGroup
                name="status"
                label="Statut"
                value={values.status}
                onChange={handleInputChange}
                items={activityItems}
            />
            
            <Controls.Select
                name="unitId"
                label="Unité"
                value={values.unitId}
                onChange={handleInputChange}
                options={machineService.getUnitCollection()}
            />

            <Controls.Slider
                name="health"
                label="Santé"
                value={values.health}
                onChange={handleInputChange}
            />

            
            

            <div>
                <Controls.Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                text="Confirmer" />

                <Controls.Button
                variant="contained"
                color="default"
                size="large"
                text="Reinitialiser" />
            </div>
            
        </Grid>
        

    </Grid>
    </Form>
    )
}