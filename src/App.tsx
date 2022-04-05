import logo from './logo.svg';
import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

import { usePublisher } from './hooks/usePublisher';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import BlurEffectOptions from './components/BlurEffectOptions';
import VirtualBgEffectOptions from './components/VirtualBgEffectOptions';
import useDevices from './hooks/useDevices';
import { FormControl, MenuItem, Select } from '@material-ui/core';

function App() {
  const {
    startBackgroundBlur,
    startVirtualBgEffect,
    stopEffect,
    createBackgroudEffectProcessor,
    pauseEffect,
    enableEffect,
    switchCamera
  } = usePublisher();
  const [maskBlurRadius, setMaskBlurRadius] = React.useState(5);
  const [blurFilterRadius, setBlurFilterRadius] = React.useState(15);
  const [pauseEffectSwitch, setPauseEffectSwitch] = React.useState(false);
  const [enableEffectSwitch, setEnableEffectSwitch] = React.useState(true);
  let [videoDevice, setVideoDevice] = useState('');
  const { deviceInfo, getDevices } = useDevices();

  const startBlur = useCallback(() => {
    return startBackgroundBlur({ maskBlurRadius, blurFilterRadius });
  }, [maskBlurRadius, blurFilterRadius, startBackgroundBlur]);

  const startVirtualBg = (image) => {
    return startVirtualBgEffect({ maskBlurRadius, image });
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
  
  const handleVideoSource = React.useCallback(
    (e) => {
      setVideoDevice(e.target.value);
      switchCamera(e.target.value)
      // todo how to add new media stream switchCamera
      // publisher.setVideoSource(videoDeviceId);
    },
    [setVideoDevice]
  );

  return (
    <div className="App">
      <div className="app-container">
        <div id="publisher"></div>
        <div className="effect-options-container">
        <h2 style={{textAlign:'start'}}>Video Effect </h2>
            <div className="video-source-change">
            <h4 style={{textAlign:'start'}}>Change Video Source </h4>   
            <FormControl >
              <InputLabel id="video">Select Video Source</InputLabel>
              {deviceInfo.videoInputDevices && (
                <Select
                  labelId="video"
                  id="demo-simple-select"
                  value={videoDevice}
                  onChange={handleVideoSource}
                  style={{width:300}}
                >
                  {deviceInfo.videoInputDevices.map((device) => (
                    <MenuItem key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
            </div>
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
