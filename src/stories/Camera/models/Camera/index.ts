import { CameraConstructor } from './types';

export class Camera {
  private readonly videoElement: HTMLVideoElement;

  private mediaStreamTrack: MediaStreamTrack | undefined;

  private mediaTrackSettings: MediaTrackSettings | undefined;

  private mediaTrackCapabilities: MediaTrackCapabilities | undefined;

  private readonly canvasElement: HTMLCanvasElement;

  constructor({
    videoElement,
  }: CameraConstructor) {
    this.videoElement = videoElement;

    this.canvasElement = document.createElement('canvas');
  }

  public static async checkSupport(): Promise<boolean> {
    try {
      const inputDevices = await navigator.mediaDevices.enumerateDevices();
      const videoInputDevices = inputDevices.filter((device) => device.kind === 'videoinput');

      return await new Promise((resolve, reject) => {
        if (videoInputDevices.length > 0) {
          resolve(true);
        } else {
          reject(new Error('На устройстве нет доступных камер'));
        }
      });
    } catch (e) {
      throw new Error('Нет доступа к камере устройства');
    }
  }

  public async startCamera(constraints?: MediaTrackConstraints): Promise<void> {
    await this.initCamera();

    if (constraints) {
      await this.setConstraints(constraints);
    }
    this.mediaTrackSettings = this.mediaStreamTrack?.getSettings();
    this.mediaTrackCapabilities = this.mediaStreamTrack?.getCapabilities();

    await this.videoElement.play();
  }

  public stopCamera(): void {
    this.mediaStreamTrack?.stop();

    Object.assign(this.videoElement, { srcObject: null });
  }

  public pauseCamera(): void {
    if (!this.isPaused()) {
      this.videoElement.pause();
    }
  }

  public async resumeCamera(): Promise<void> {
    if (this.isPaused()) {
      await this.videoElement.play();
    }
  }

  public getFrameCanvas(settings?: CanvasRenderingContext2DSettings) {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      const {
        videoWidth,
        videoHeight,
      } = this.videoElement;

      this.canvasElement.width = videoWidth;
      this.canvasElement.height = videoHeight;

      const canvasElementContext = this.canvasElement.getContext('2d', settings);
      if (canvasElementContext) {
        canvasElementContext.drawImage(this.videoElement, 0, 0, videoWidth, videoHeight);
        return this.canvasElement;
      }

      return null;
    }
    return null;
  }

  public isPaused(): boolean {
    return this.videoElement.paused;
  }

  public getMediaTrackSettings() {
    return this.mediaTrackSettings;
  }

  public getMediaTrackCapabilities() {
    return this.mediaTrackCapabilities;
  }

  private async initCamera(): Promise<void> {
    const videoConstraints = {
      facingMode: 'environment',
    };
    const userMedia = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: videoConstraints,
    });

    Object.assign(this.videoElement, {
      srcObject: userMedia,
    });

    // eslint-disable-next-line prefer-destructuring
    this.mediaStreamTrack = userMedia.getVideoTracks()[0];
  }

  private async setConstraints(constraints: MediaTrackConstraints) {
    try {
      await this.mediaStreamTrack?.applyConstraints(constraints);
    } catch (error) {
      console.error('error', error);
    }
  }
}
