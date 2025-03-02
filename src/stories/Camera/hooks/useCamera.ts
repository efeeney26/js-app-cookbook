import {
  MutableRefObject,
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Camera } from '../models/Camera';

export const useCamera = (videoElementRef: MutableRefObject<HTMLVideoElement | null>) => {
  const cameraRef = useRef<Camera | null>(null);

  const [isCameraSupported, setIsCameraSupported] = useState(false);
  const [isCameraInit, setIsCameraInit] = useState(false);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [isCameraPaused, setIsCameraPaused] = useState(false);

  const [error, setError] = useState<string>();

  const checkCameraSupport = useCallback(async () => {
    try {
      const isCameraSupported = await Camera.checkSupport();
      setIsCameraSupported(isCameraSupported);
    } catch (error) {
      setError((error as Error).message);
    }
  }, []);

  useEffect(() => {
    void checkCameraSupport();
  }, [checkCameraSupport]);

  useEffect(() => {
    if (videoElementRef.current && isCameraSupported) {
      cameraRef.current = new Camera({ videoElement: videoElementRef.current });
      setIsCameraInit(true);
    }
  }, [isCameraSupported, videoElementRef]);

  const startCamera = useCallback(async (constraints?: MediaTrackConstraints) => {
    setError(undefined);

    if (isCameraInit) {
      try {
        await cameraRef.current?.startCamera(constraints);

        setIsCameraStarted(true);
      } catch (error) {
        setError((error as Error).message);
      }
    } else {
      setError('Камера не проинициализирована');
    }
  }, [isCameraInit]);

  const getFrameCanvas = useCallback((
    settings?: CanvasRenderingContext2DSettings,
  ) => cameraRef.current?.getFrameCanvas(settings), []);

  const pauseCamera = useCallback(() => {
    cameraRef.current?.pauseCamera();
    setIsCameraPaused(true);
  }, []);

  const resumeCamera = useCallback(async () => {
    try {
      await cameraRef.current?.resumeCamera();
      setIsCameraPaused(false);
    } catch (error) {
      setError((error as Error).message);
    }
  }, []);

  const stopCamera = useCallback(() => {
    cameraRef.current?.stopCamera();
    setIsCameraStarted(false);
  }, []);

  const getCameraSettings = useCallback(
    () => cameraRef.current?.getMediaTrackSettings(),
    [],
  );

  const getCameraCapabilities = useCallback(
    () => cameraRef.current?.getMediaTrackCapabilities(),
    [],
  );

  return {
    isCameraSupported,
    isCameraInit,
    isCameraPaused,
    isCameraStarted,
    error,
    startCamera,
    getFrameCanvas,
    pauseCamera,
    resumeCamera,
    stopCamera,
    getCameraSettings,
    getCameraCapabilities,
  };
};
