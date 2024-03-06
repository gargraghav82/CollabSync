import React , {useEffect , useRef} from 'react'

const VideoBox = ({stream , isLocalStream}) => {
    const videoRef = useRef();

    useEffect(() => {
        const video = videoRef.current;
        video.srcObject = stream;

        video.onloadedmetadata = () => {
            video.play();
        }
    } , [stream])

  return (
        <video autoPlay muted={isLocalStream ? true : false} ref={videoRef} style={{height : '100px' , width : '100px' , backgroundColor : '#000'}}/>
    )
}

export default VideoBox