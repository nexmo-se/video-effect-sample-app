import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import BlurCircular from '@material-ui/icons/BlurCircular';
import { Button, InputLabel, MenuItem } from '@material-ui/core';

const backgroundImages = ['vonage_background', 'simpson_background'];

const useStyles = makeStyles({
    root: {
      width: 400
    },
    input: {
      width: 42,
    },
    
  });

  const loadImage = (name) => {
    return new Promise((resolve) => {
      /* const image = new Image(); */
      const image = document.createElement('img');
      image.crossOrigin = 'anonymous';
      image.src = `${process.env.PUBLIC_URL}/backgrounds/${name}.jpg`;
      image.onload = () => resolve(image);
    });
  };  

export default function VirtualBgEffectOptions({handleStartVirtualBgEffect}) {
  const classes = useStyles();
  /* const backgroundImageUrls = ['vonage_background', 'simpson_background'].map(
    (imageName) => `${process.env.PUBLIC_URL}/backgrounds/${imageName}.jpg`
  );   */

  // Mask Blur Radius
  // Blur Filter Radius
  const [selectedImage, setSelectedImage] = React.useState('');

  const handleChange = (event) => {
    setSelectedImage(event.target.value);
  };


  const startVirtualBg = async () => {
     const image = await loadImage(selectedImage); 
    handleStartVirtualBgEffect(image);
  }

  return (
    <div className={classes.root}>
      <h3>Virtual Bg Effect</h3>    
      <Grid spacing={2} alignItems="center" container direction="column" style={{padding: 20}}>
            <InputLabel id="demo-simple-select-label">Choose Background</InputLabel>
            <Select label="Background" onChange={handleChange} value={selectedImage} fullWidth={true}>
                {backgroundImages.map((img)=><MenuItem value={img}>{img}</MenuItem>)}
            </Select>
      </Grid>
      <Grid spacing={2} container alignItems="center" >
        <Button
          variant="contained"
          onClick={startVirtualBg}
          color="primary"
        >
          Start Virtual Background
        </Button>
      </Grid>
    </div>
  );
}