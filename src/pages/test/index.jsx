import React, { useCallback, useRef, useState } from "react";
import Layout from "@/layout/layout";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

const Test = () => {
  const webcamRef = useRef(null);
  const [isOpen, setIsopen] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);
  return (
    <Layout>
      <div className='flex gap-4'>
        <Button onClick={() => setIsopen(!isOpen)}>
          {isOpen ? "Close Camera" : "Open Camera"}
        </Button>
        <Button onClick={capture}>Capture photo</Button>
      </div>
      {isOpen ? (
        <div className='w-96'>
          <Webcam
            ref={webcamRef}
            audio={true}
            screenshotFormat='image/png'
            videoConstraints={videoConstraints}
          />
        </div>
      ) : (
        ""
      )}{" "}
      {imgSrc && <img className='w-96' src={imgSrc} />}
    </Layout>
  );
};

export default Test;
