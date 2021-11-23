import React, { useState, useRef, useCallback, useContext } from 'react';

import OT, {Session} from '@opentok/client';
import { BackgroundBlurEffect, VirtualBackgroundEffect } from '@vonage/video-effects';


export function usePublisher() {
  const backgroundBlur: any = useRef(null);
  const virtualBg: any = useRef(null);
  const publisher: any = useRef({});
  const session: any = useRef({});
  const localMediaTrack = useRef(null);

  const createLocalTrack = async () => {
    return OT.getUserMedia({videoSource: true, audioSource: null})
      .then((track: any) => {
        localMediaTrack.current = track;
        /* audioTrack = track.getAudioTracks()[0]; */
      })
      .catch((err) => {
        console.error('OTGetUserMedia - err', err);
      });
  };

  const initPublisher = async (outputVideoStream: MediaStream) => {
      if (publisher && session && localMediaTrack.current) {
        publisher.current = OT.initPublisher(
            'publisher',
            {
              /* audioSource: outputVideoStream.getAudioTracks()[0], */
              videoSource: outputVideoStream.getVideoTracks()[0],
              width: 640,
              height: 480,
              insertMode: 'append'
            },
            (err) => {
              console.log('Publisher Created');
            }
          );
          /* if (apikey && sessionId && token) {
            session.current = OT.initSession(apikey, sessionId);
            session.current.on('streamCreated', (event: any) => {
              session.subscribe(event.stream, (err: any) => {
                if (err) {
                  console.log('Error while subscribing', event.stream);
                }
                console.log('Subscribed to ', event.stream);
              });
            });
            session.current.connect(token, (err: any) => {
              if (err) {
                console.log('Error while connecting to the session');
              }
              console.log('Session Connected');
              session.current.publish(publisher, (errPublisher: any) => {
                if (errPublisher) {
                  console.log('Error while publishing into the session');
                }
                console.log('Successfully published the stream');
              });
            });
          } */
      }      
  };

  const startBackgroundBlur = async ({maskBlurRadius, blurFilterRadius}) => {  
    await createLocalTrack();
    backgroundBlur.current = new BackgroundBlurEffect({
      assetsPath: 'https://d7ca6333nyzk0.cloudfront.net/',
      maskBlurRadius,
      blurFilterRadius
    });
    await backgroundBlur.current.loadModel();
    initPublisher(backgroundBlur.current.startEffect(localMediaTrack.current));
  };

  const startVirtualBgEffect = async ({maskBlurRadius, image}) => {  
    await createLocalTrack();
    virtualBg.current = new VirtualBackgroundEffect({
      assetsPath: 'https://d7ca6333nyzk0.cloudfront.net/',
      maskBlurRadius,
      virtualBackground:{
          backgroundType: 'image',
          backgroundImage: image
      }
    });
    await virtualBg.current.loadModel();
    initPublisher(virtualBg.current.startEffect(localMediaTrack.current));
  };

  const destroyTracks = ()=>{
    if (localMediaTrack.current){
        localMediaTrack.current.getTracks().forEach((t) => t.stop());
    }
  }

  const stopEffect = async () => {  
    if (backgroundBlur.current){
        backgroundBlur.current.stopEffect();    
    }
    if (virtualBg.current){
        virtualBg.current.stopEffect();    
    }
    destroyTracks();
    publisher.current.destroy()
  };

  return {
    publisher,
    startBackgroundBlur,
    startVirtualBgEffect,
    stopEffect
  };
}
