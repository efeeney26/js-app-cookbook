export interface CameraConstructor {
  videoElement: HTMLVideoElement
}

export interface GetFrameData {
  videoElement: HTMLVideoElement,
  canvasElement: HTMLCanvasElement,
  canvasElementContext: CanvasRenderingContext2D
}

export interface Constraints {
  cameraWidth?: number,
  cameraHeight?: number
}
