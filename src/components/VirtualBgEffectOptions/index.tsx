import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import BlurCircular from '@material-ui/icons/BlurCircular';
import { InputLabel, MenuItem } from '@material-ui/core';

const backgroundImages = ['vonage_background', 'simpson_background'];

const useStyles = makeStyles({
    root: {
      width: 400
    },
    input: {
      width: 42,
    },
    
  });

export default function VirtualBgEffectOptions() {
  const classes = useStyles();
  /* const backgroundImageUrls = ['vonage_background', 'simpson_background'].map(
    (imageName) => `${process.env.PUBLIC_URL}/backgrounds/${imageName}.jpg`
  );   */

  // Mask Blur Radius
  // Blur Filter Radius

  return (
    <div className={classes.root}>
      <h3>Virtual Bg Effect</h3>    
      <Grid spacing={2} alignItems="center" container>
            <InputLabel id="demo-simple-select-label">Choose Background</InputLabel>
            <Select label="Background">
                {backgroundImages.map((img)=><MenuItem value={img}>{img}</MenuItem>)}
            </Select>
      </Grid>
    </div>
  );
}