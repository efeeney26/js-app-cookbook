import { CameraConstructor, Constraints } from './types';

export class Camera {
  private readonly videoElement: HTMLVideoElement;

  private cameraStream: MediaStream | null = null;

  private readonly canvasElement: HTMLCanvasElement;

  constructor({
    videoElement,
  }: CameraConstructor) {
    this.videoElement = videoElement;

    this.canvasElement = document.createElement('canvas');
  }

  public async startCamera(constraints?: Constraints): Promise<void> {
    await this.initCamera();

    if (constraints) {
      await this.setConstraints(constraints);
    }

    await this.videoElement.play();
  }

  public stopCamera(): void {
    this.cameraStream?.getTracks().forEach((track) => {
      track.stop();
    });

    Object.assign(this.videoElement, { srcObject: null });
  }

  public pauseCamera(): void {
    if (!this.isPaused()) {
      this.videoElement.pause();
    }
  }

  public isPaused(): boolean {
    return this.videoElement.paused;
  }

  public async resumeCamera(): Promise<void> {
    if (this.isPaused()) {
      await this.videoElement.play();
    }
  }

  public getFrame(): HTMLCanvasElement | null {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      const {
        videoWidth,
        videoHeight,
      } = this.videoElement;

      this.canvasElement.width = videoWidth;
      this.canvasElement.height = videoHeight;

      const canvasElementContext = this.canvasElement.getContext('2d');
      if (canvasElementContext) {
        canvasElementContext.drawImage(this.videoElement, 0, 0, videoWidth, videoHeight);
        return this.canvasElement;
      }

      return null;
    }
    return null;
  }

  private async initCamera(): Promise<void> {
    this.cameraStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'environment',
      },
    });

    Object.assign(this.videoElement, {
      srcObject: this.cameraStream,
    });
  }

  private async setConstraints(constraints: Constraints) {
    const videoTrack = this.cameraStream?.getVideoTracks()[0];

    try {
      await videoTrack?.applyConstraints({
        width: { ideal: constraints.cameraWidth },
        height: { ideal: constraints.cameraHeight },
      });
    } catch (error) {
      console.error('error', error);
    }
  }
}
