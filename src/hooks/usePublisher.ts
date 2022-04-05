import React, { useState, useRef, useCallback, useContext } from 'react';

import OT, { Session } from '@opentok/client';
import {
  BackgroundBlurEffect,
  VirtualBackgroundEffect,
  BackgroundEffectProcessor
} from '@vonage/video-effects';

export function usePublisher() {
  const backgroundBlur: any = useRef(null);
  const virtualBg: any = useRef(null);
  const publisher: any = useRef({});
  const session: any = useRef({});
  const localMediaTrack = useRef(null);
  const backgroundEffectProcessor = useRef(null);

  const createLocalTrack = async (deviceId) => {
    let videoSource = true;
    if (deviceId) {
      videoSource = deviceId;
    }
    return OT.getUserMedia({ videoSource, audioSource: null })
      .then((track: any) => {
        localMediaTrack.current = track;
        return localMediaTrack.current;
      })
      .catch((err) => {
        console.error('OTGetUserMedia - err', err);
      });
  };

  const initPublisher = async () => {
    if (
      publisher &&
      session &&
      localMediaTrack.current &&
      backgroundEffectProcessor.current
    ) {
      publisher.current = OT.initPublisher(
        'publisher',
        {
          videoSource:
            backgroundEffectProcessor.current.outputStream.getVideoTracks()[0],
          width: 640,
          height: 480,
          insertMode: 'append'
        },
        (err) => {
          if (err) {
            console.log('Err initPublisher', err);
          }
          console.log('Publisher Created');
        }
      );
    }
  };

  const startBackgroundBlur = async ({ maskBlurRadius, blurFilterRadius }) => {
    if (backgroundEffectProcessor.current) {
        await backgroundEffectProcessor.current.loadEffect(
            new BackgroundBlurEffect({
              blurFilterRadius,
              maskBlurRadius
            })
          );
          backgroundEffectProcessor.current.enableEffect(true);
          return true;  
    }
    return false;  
  };

  const startVirtualBgEffect = async ({ maskBlurRadius, image }) => {
    if (backgroundEffectProcessor.current) {
        await backgroundEffectProcessor.current.loadEffect(
            new VirtualBackgroundEffect({
              virtualBackground: {
                backgroundType: 'image',
                backgroundImage: image
              },
              maskBlurRadius
            })
          );
          backgroundEffectProcessor.current.enableEffect(true);
          return true;  
    }
    return false;  
  };

  const switchCamera = async (newCameraStream: string) => {
      console.log("switchCamera", newCameraStream)
    destroyTracks();
    const track = await createLocalTrack(newCameraStream);
    backgroundEffectProcessor.current.setInputStream(track);
  };

  const pauseEffect = (pause: boolean) => {
    backgroundEffectProcessor.current.pauseStreamProcessing(pause);
  };

  const enableEffect = (enable: boolean) => {
    backgroundEffectProcessor.current.enableEffect(enable);
  };

  const destroyTracks = () => {
    if (localMediaTrack.current) {
      localMediaTrack.current.getTracks().forEach((t) => t.stop());
    }
  };

  const stopEffect = async () => {
    if (backgroundBlur.current) {
      backgroundBlur.current.stopEffect();
    }
    if (virtualBg.current) {
      virtualBg.current.stopEffect();
    }
    destroyTracks();
    publisher.current.destroy();
  };

  const createBackgroudEffectProcessor =  useCallback(async(deviceId) => {
    console.log("createBackgroudEffectProcessor");
    await createLocalTrack(deviceId);
    backgroundEffectProcessor.current = new BackgroundEffectProcessor({
      assetsPath: 'https://d7ca6333nyzk0.cloudfront.net/'
    });
    backgroundEffectProcessor.current.setInputStream(localMediaTrack.current);
    console.log("backgroundEffectProcessor", backgroundEffectProcessor.current);
    backgroundEffectProcessor.current.pauseStreamProcessing(false)
    // await startBackgroundBlur({maskBlurRadius: 5, blurFilterRadius: 15});
    /* backgroundEffectProcessor.current.pauseStreamProcessing(false);
    backgroundEffectProcessor.current.enableEffect(true); */
    
    await initPublisher();
    window.test = backgroundEffectProcessor.current;
    return backgroundEffectProcessor.current;
  },[]) ;

  return {
    publisher,
    startBackgroundBlur,
    startVirtualBgEffect,
    stopEffect,
    createBackgroudEffectProcessor,
    pauseEffect,
    enableEffect,
    switchCamera
  };
}
