import React, {useState} from 'react'
import { FormControl, FormLabel, Slider as MuiSlider, FormControlLabel, Radio } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import VolumeUp from '@material-ui/icons/VolumeUp';


export default function Slider(props) {

const {name, label, onChange} = props;

const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

   const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

    return (
        <FormControl>
                <FormLabel>{label}</FormLabel>
                    <div>
      <Typography id="input-slider" gutterBottom>
        
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          
        </Grid>
        <Grid item xs>
          <MuiSlider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            
            value={value}
            margin="dense"
            onChange={handleInputChange}
            
            inputProps={{
              
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
                </FormControl>


        
        
    )
}