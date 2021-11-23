import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import BlurCircular from '@material-ui/icons/BlurCircular';
import { Box, Button } from '@material-ui/core';

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

  // Mask Blur Radius
  // Blur Filter Radius

  return (
    <div className={classes.root}>
      <h2 style={{textAlign:'start'}}>Video Effect </h2>
      <Grid spacing={2} alignItems="center" container>
        <h3>Mask Blur Radius</h3>
        <Grid item>
          <Box width={300}>
            <Slider
              value={typeof maskBlurRadius === 'number' ? maskBlurRadius : 0}
              onChange={handleBlurRadiusChange}
              aria-labelledby="input-slider"
            />
          </Box>
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
      <Grid spacing={2} alignItems="center" container>
        <h3> Blur Filter Radius</h3>
        <Grid item>
        <Box width={300}>
          <Slider
            value={typeof blurFilterRadius === 'number' ? blurFilterRadius : 0}
            onChange={handleBlurFilterChange}
            aria-labelledby="input-slider"
          />
          </Box>
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
      <Grid spacing={2} container alignItems="center" >
        <Button
          variant="contained"
          onClick={handleStartBlurEffect}
          color="primary"
        >
          Start Blur Effect
        </Button>
      </Grid>
    </div>
  );
}
