import React, { useEffect, useState } from 'react';
import { X } from 'react-bootstrap-icons';
import Webcam from 'react-webcam';

import './BarcodeScanner.scss';
import { classList } from '../../classList';
import { Button } from '../../ui/Button';
import { Tabs } from '../../ui/Tabs/Tabs';
import { Tab } from '../../ui/Tabs/Tab';

type Tab = 'scan' | 'device-capabilities';

type ScanResults = {
  barcodes: Array<{
    type: string;
    value: string;
  }>;
};

type MediaStreamTrackProcessor = any;

export const BarcodeScanner = () => {
  const [plaintext, setPlaintext] = useState<string>('Hello world!');
  const [file, setFile] = useState<FileList>();
  const [download, setDownload] = useState<string>();
  const [includeDataUrl, setIncludeDataUrl] = useState(false);
  const [encoded, setEncoded] = useState<string>();
  const [currentTab, setCurrentTab] = useState<Tab>('scan');

  const getFileContent = (file: File | null): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject();
      } else {
        const reader = new FileReader();
        reader.onload = function () {
          const data = reader.result as ArrayBuffer;
          resolve(data);
        };
        reader.readAsArrayBuffer(file);
      }
    });
  };

  const getMediaType = (file: File | null) => {
    if (!file) {
      return '';
    }

    return file.type;
  };

  const getFileSize = (size?: number) => {
    if (!size) {
      return;
    }

    if (size > 1000000) {
      return `${(size / 1024 / 1024).toPrecision(2)}Mb`;
    }

    return `${(size / 1024).toPrecision(2)}Kb`;
  };

  const [scanResults, setScanResults] = useState<ScanResults>();

  const [supported] = useState('BarcodeDetector' in window);
  const [deviceCapabilities, setDeviceCapabilities] = useState<{
    supportedFormats: string[];
  }>();

  useEffect(() => {
    (window as any).BarcodeDetector.getSupportedFormats().then(
      (supportedFormats) => {
        setDeviceCapabilities({ supportedFormats });
      }
    );
  }, []);

  useEffect(() => {
    if (file) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const url = URL.createObjectURL(file[0]);
      const img = new Image();
      img.onload = function () {
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const barcodeDetector = new (window as any).BarcodeDetector();
          barcodeDetector
            .detect(imageData)
            .then((barcodes) => {
              setScanResults({
                barcodes: barcodes.map((barcode) => {
                  return { type: barcode.format, value: barcode.rawValue };
                }),
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };

      img.src = url;
    }
  }, [file]);

  const renderValue = (value: string) => {
    if (value.startsWith('http')) {
      return (
        <a href={value} target="_blank">
          {value}
        </a>
      );
    }

    return value;
  };

  const [isScanning, setIsScanning] = useState(false);
  const webcamRef = React.useRef<Webcam>(null);

  const checkScan = (stream: MediaStream) => {
    console.log(stream);

    const barcodeDetector = new (window as any).BarcodeDetector();

    const videoTrack = stream.getVideoTracks()[0];

    const trackProcessor = new (window as any).MediaStreamTrackProcessor({
      track: videoTrack,
    });
    const trackGenerator = new (window as any).MediaStreamTrackGenerator({
      kind: 'video',
    });

    const transformer = new TransformStream({
      async transform(videoFrame, controller) {
        // console.log(videoFrame);

        if (webcamRef.current) {
          const imageSrc = webcamRef.current.getScreenshot();
          if (imageSrc) {
            const img = new Image();
            img.onload = () => {
              barcodeDetector
                .detect(img)
                .then((barcodes) => {
                  if (barcodes.length > 0) {
                    setScanResults({
                      barcodes: barcodes.map((barcode) => {
                        return {
                          type: barcode.format,
                          value: barcode.rawValue,
                        };
                      }),
                    });
                    setIsScanning(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            };
            img.src = imageSrc;
          }
        }

        videoFrame.close();
      },
    });

    trackProcessor.readable
      .pipeThrough(transformer)
      .pipeTo(trackGenerator.writable);
  };

  return (
    <>
      <Tabs onChange={(tab) => setCurrentTab(tab as Tab)}>
        <Tab title="Scan">
          <div className="scan">
            <div className="field-group">
              <div className={classList(['dropzone', file ? 'has-file' : ''])}>
                <label htmlFor="file" className="show">
                  {(!file || !file.item(0)) && (
                    <>Drag file here or click to select</>
                  )}
                  {file && file.item(0) && (
                    <span className="file-name">
                      <b>{file.item(0)?.name}</b> (
                      {getFileSize(file.item(0)?.size)})
                    </span>
                  )}
                  <input
                    type="file"
                    className="file-input"
                    onChange={(e) => setFile(e.target.files as FileList)}
                  />
                </label>
                {file && file.item(0) && (
                  <button
                    type="button"
                    className="remove"
                    onClick={() => setFile(undefined)}
                  >
                    <X />
                  </button>
                )}
              </div>
            </div>

            <Button onClick={() => setIsScanning(true)} className="scan-btn">
              Scan
            </Button>
          </div>
          <div className="results">
            {scanResults &&
              scanResults.barcodes.map((barcode, i) => (
                <p key={`barcode-${i}`}>
                  <b>{barcode.type}</b>
                  <br />
                  {renderValue(barcode.value)}
                </p>
              ))}
            {/* <pre>{JSON.stringify(scanResults, null, 4)}</pre> */}
          </div>
        </Tab>
        <Tab title="Device capabilities">
          {!supported && (
            <p>
              <a
                href="https://caniuse.com/?search=BarcodeDetector"
                target="_blank"
              >
                BarcodeDetector API not supported on this device
              </a>
            </p>
          )}
          {supported && (
            <>
              <h3>Supported formats</h3>
              <ul>
                {deviceCapabilities?.supportedFormats.map((format) => (
                  <li key={format}>
                    <a
                      href={`https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API#concepts_and_usage:~:text=${format}`}
                      target="_blank"
                    >
                      {format}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Tab>
      </Tabs>
      {isScanning && (
        <div className="scanner">
          <Webcam
            ref={webcamRef}
            className="scanner-output"
            width={window.innerWidth - 32}
            height={window.innerHeight - 32}
            onUserMedia={checkScan}
            videoConstraints={{}}
          />
          <div className="actions">
            <Button onClick={() => setIsScanning(false)} className="close-btn">
              <X />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
