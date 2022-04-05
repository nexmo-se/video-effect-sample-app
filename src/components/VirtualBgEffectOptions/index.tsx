import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import BlurCircular from '@material-ui/icons/BlurCircular';
import { Button, CircularProgress, InputLabel, MenuItem } from '@material-ui/core';

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
  const [isLoading, setIsLoading] = React.useState(false);

  // Mask Blur Radius
  // Blur Filter Radius
  const [selectedImage, setSelectedImage] = React.useState(backgroundImages[0]);

  const handleChange = (event) => {
    setSelectedImage(event.target.value);
  };


  const startVirtualBg = async () => {
     const image = await loadImage(selectedImage); 
     setIsLoading(true);
     handleStartVirtualBgEffect(image).then(()=>{
         setIsLoading(false);
     });
  }

  return (
    <div className={classes.root}>
      <h3>Virtual Bg Effect</h3>    
      <div style={{padding: 20}}>
            <InputLabel id="demo-simple-select-label">Choose Background</InputLabel>
            <Select label="Background" onChange={handleChange} value={selectedImage} fullWidth={true}>
                {backgroundImages.map((img)=><MenuItem value={img}>{img}</MenuItem>)}
            </Select>
      </div>
      <div>
        {isLoading ? <CircularProgress /> : <Button
          variant="contained"
          onClick={startVirtualBg}
          color="primary"
        >
          Start Virtual Background
        </Button>}
      </div>
    </div>
  );
}