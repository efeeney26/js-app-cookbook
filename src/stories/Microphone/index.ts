export class Microphone {
  private mediaRecorder: MediaRecorder | null = null;

  private audioChunks: Blob[] = [];

  private userMedia: MediaStream | null = null;

  private readonly nativeRecognizer: SpeechRecognition | null = null;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- it's ok
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.nativeRecognizer = new SpeechRecognition();
    this.nativeRecognizer.continuous = true;
    this.nativeRecognizer.interimResults = true;
    this.nativeRecognizer.lang = 'ru';
  }

  public async startRecording({
    timeslice,
  }: { timeslice?: number } = {}): Promise<void> {
    if (!this.userMedia) {
      throw new Error('Аудиопоток не проинициализирован');
    }

    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      throw new Error('Запись уже начата');
    }

    await this.initMicrophone();
    this.mediaRecorder = new MediaRecorder(this.userMedia);
    this.audioChunks = [];
    this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };
    this.mediaRecorder.start(timeslice);
  }

  public async stopRecording(fileExtension = 'mp3'): Promise<Blob> {
    if (!this.mediaRecorder || this.mediaRecorder.state !== 'recording') {
      throw new Error('Запись еще не начата');
    }

    return new Promise<Blob>((resolve) => {
      if (this.mediaRecorder) {
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: `audio/${fileExtension}` });
          this.audioChunks = [];
          this.mediaRecorder = null;
          if (this.userMedia) {
            this.userMedia.getTracks().forEach((track: MediaStreamTrack) => {
              track.stop();
            });
            this.userMedia = null;
          }

          resolve(audioBlob);
        };
        this.mediaRecorder.stop();
      }
    });
  }

  public nativeRecognizerStart(sendTranscript: (transcript: string) => void) {
    if (!this.nativeRecognizer) {
      throw new Error('Распознователь речи не проинициализирован');
    }

    this.nativeRecognizer.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');

      sendTranscript(transcript);
    };

    this.nativeRecognizer.onerror = (event) => {
      console.error('Speech recognition error detected:', event.error);
    };

    this.nativeRecognizer.start();
  }

  public nativeRecognizerStop() {
    if (!this.nativeRecognizer) {
      throw new Error('Распознователь речи не проинициализирован');
    }

    this.nativeRecognizer.stop();
  }

  public getNativeRecognizer() {
    return this.nativeRecognizer;
  }

  private async initMicrophone() {
    this.userMedia = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    });
  }
}
