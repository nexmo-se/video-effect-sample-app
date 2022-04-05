import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import BlurCircular from '@material-ui/icons/BlurCircular';
import { Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    // width: 400
  },
  input: {
    width: 42
  }
});

export default function EffectOptions({
  maskBlurRadius,
  setMaskBlurRadius,
  blurFilterRadius,
  setBlurFilterRadius,
  handleStartBlurEffect
}) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const handleBlurRadiusChange = (event, newValue) => {
    setMaskBlurRadius(newValue);
  };

  const handleInputChange = (event) => {
    setMaskBlurRadius(
      event.target.maskBlurRadius === ''
        ? 0
        : Number(event.target.maskBlurRadius)
    );
  };

  const handleBlurFilterChange = (event, newValue) => {
    setBlurFilterRadius(newValue);
  };

  const handleInputBlurFilterChange = (event) => {
    setBlurFilterRadius(
      event.target.blurFilterRadius === ''
        ? 0
        : Number(event.target.blurFilterRadius)
    );
  };

  const handleBlur = () => {
    if (maskBlurRadius < 0) {
      setMaskBlurRadius(0);
    } else if (maskBlurRadius > 30) {
      setMaskBlurRadius(30);
    }
  };

  const handleBlurFilter = () => {
    if (blurFilterRadius < 0) {
      setBlurFilterRadius(0);
    } else if (blurFilterRadius > 30) {
      setBlurFilterRadius(30);
    }
  };

  const startBlurEffect = async () => {
     setIsLoading(true);
     handleStartBlurEffect().then(()=>{
         setIsLoading(false);
     });
  }

  // Mask Blur Radius
  // Blur Filter Radius

  return (
    <div className={classes.root}>
      <div>
        <h3>Mask Blur Radius</h3>
        <div style={{display:'flex'}}>
        <div>
          <Input
            className={classes.input}
            value={maskBlurRadius}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider'
            }}
          />
        </div>
        <div>
            <Slider
              value={typeof maskBlurRadius === 'number' ? maskBlurRadius : 0}
              onChange={handleBlurRadiusChange}
              aria-labelledby="input-slider"
              style={{width: 200, marginLeft: 10}}
            />
        </div>
        
        </div>
        
      </div>
      <div >
        <h3> Blur Filter Radius</h3>
        <div style={{display:'flex'}}>
        <div>
          <Input
            className={classes.input}
            value={blurFilterRadius}
            margin="dense"
            onChange={handleInputBlurFilterChange}
            onBlur={handleBlurFilter}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider'
            }}
          />
        </div>
        <div>
          <Slider
            value={typeof blurFilterRadius === 'number' ? blurFilterRadius : 0}
            onChange={handleBlurFilterChange}
            aria-labelledby="input-slider"
            style={{width: 200, marginLeft: 10}}
          />
        </div>
        </div>
      </div>
      <div >
      {isLoading ? <CircularProgress /> : <Button
          variant="contained"
          onClick={startBlurEffect}
          color="primary"
          style={{marginTop: 15}}
        >
          Start Blur Effect
        </Button>}
      </div>
    </div>
  );
}
