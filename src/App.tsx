import logo from './logo.svg';
import React from 'react';
import './App.css';

import { usePublisher } from './hooks/usePublisher';
import Button from '@material-ui/core/Button';
import BlurEffectOptions from './components/BlurEffectOptions';
import VirtualBgEffectOptions from './components/VirtualBgEffectOptions';

function App() {
  const { startBackgroundBlur, stopEffect } = usePublisher();
  const [maskBlurRadius, setMaskBlurRadius] = React.useState(5);
  const [blurFilterRadius, setBlurFilterRadius] = React.useState(15);

  const startBlur = () => {
    startBackgroundBlur({ maskBlurRadius, blurFilterRadius });
  };

  const stopBlur = () => {
    stopEffect();
  };

  return (
    <div className="App">
      <h3>Publisher</h3>
      <div className="app-container">
        <div id="publisher">
        </div>
        <div className="effect-options-container">
          <BlurEffectOptions
            maskBlurRadius={maskBlurRadius}
            setMaskBlurRadius={setMaskBlurRadius}
            blurFilterRadius={blurFilterRadius}
            setBlurFilterRadius={setBlurFilterRadius}
            handleStartBlurEffect={startBlur}
          ></BlurEffectOptions>
          <VirtualBgEffectOptions />
          <div className="buttons-container">
            
            <Button variant="contained" onClick={stopBlur}>
              Stop Effect
            </Button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
