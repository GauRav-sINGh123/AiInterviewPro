'use client'
import { useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import useSpeechToText from 'react-hook-speech-to-text';
function Record() {
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  return (
    <div>
      <div className="p-5 border rounded-lg mt-20 bg-black h-[350px] flex flex-col justify-center items-center">
     
       {
        isCameraOpen?(
          <Webcam mirrored={true} style={{ width: 500, height: 300 }} />
        ):
        (
          <Image src={"/Camera.png"} alt="logo" width={180} height={180}/>
        )
       }
      </div>
      <div className="flex justify-center">
        <button 
        onClick={() => setIsCameraOpen(!isCameraOpen)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mt-2 rounded-lg cursor-pointer">{isCameraOpen ? 'Close Camera' : 'Record'}</button>
           
      </div>
      <div className="flex justify-center gap-3">
      <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result:any) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
        
    </div>
  );
}

export default Record;
