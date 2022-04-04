import logo from './logo.svg';
import React, { useCallback, useEffect } from 'react';
import './App.css';

import { usePublisher } from './hooks/usePublisher';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import BlurEffectOptions from './components/BlurEffectOptions';
import VirtualBgEffectOptions from './components/VirtualBgEffectOptions';

function App() {
  const {
    startBackgroundBlur,
    startVirtualBgEffect,
    stopEffect,
    createBackgroudEffectProcessor,
    pauseEffect,
    enableEffect
  } = usePublisher();
  const [maskBlurRadius, setMaskBlurRadius] = React.useState(5);
  const [blurFilterRadius, setBlurFilterRadius] = React.useState(15);
  const [pauseEffectSwitch, setPauseEffectSwitch] = React.useState(false);
  const [enableEffectSwitch, setEnableEffectSwitch] = React.useState(true);

  const startBlur = useCallback(() => {
    startBackgroundBlur({ maskBlurRadius, blurFilterRadius });
  }, [maskBlurRadius, blurFilterRadius, startBackgroundBlur]);

  const startVirtualBg = (image) => {
    startVirtualBgEffect({ maskBlurRadius, image });
  };

  const stopBlur = () => {
    stopEffect();
  };

  useEffect(() => {
    console.log("useEffect - createBackgroudEffectProcessor")
    createBackgroudEffectProcessor(null)
  }, [createBackgroudEffectProcessor]);

  const handlePauseEffectChange = () => {
    pauseEffect(!pauseEffectSwitch);
    setPauseEffectSwitch(!pauseEffectSwitch)
  };

  const handleEnableEffectChange = () => {
    enableEffect(!enableEffectSwitch);
    setEnableEffectSwitch(!enableEffectSwitch)
  };
  // todo add enable and pause toggle buttons

  return (
    <div className="App">
      <div className="app-container">
        <div id="publisher"></div>
        <div className="effect-options-container">
          <BlurEffectOptions
            maskBlurRadius={maskBlurRadius}
            setMaskBlurRadius={setMaskBlurRadius}
            blurFilterRadius={blurFilterRadius}
            setBlurFilterRadius={setBlurFilterRadius}
            handleStartBlurEffect={startBlur}
          ></BlurEffectOptions>
          <VirtualBgEffectOptions handleStartVirtualBgEffect={startVirtualBg} />
          <div className="buttons-container">
            <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
              <InputLabel id="demo-simple-select-label">
                Pause Effect
              </InputLabel>
              <Switch
              checked={pauseEffectSwitch}
                value={pauseEffectSwitch}
                onChange={handlePauseEffectChange}
                color="primary"
                name="Pause Effect"
                inputProps={{ 'aria-label': 'pause effect' }}
              />
            </div>
            <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
              <InputLabel id="demo-simple-select-label">
                Enable Effect
              </InputLabel>
              <Switch
              checked={enableEffectSwitch}
                value={enableEffectSwitch}
                onChange={handleEnableEffectChange}
                color="primary"
                name="Enable Effect"
                inputProps={{ 'aria-label': 'enable effect' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
