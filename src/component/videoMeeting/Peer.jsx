/* eslint-disable react/prop-types */
// import {useEffect} from "react"
import { useVideo } from "@100mslive/react-sdk";
// import { useHMSNotifications } from "@100mslive/react-sdk";

const Peer = ({ peer }) => {
  const { videoRef } = useVideo({ trackId: peer.videoTrack });
  // console.log("PEER TRACK ID:", peer.videoTrack);

  // navigator.mediaDevices.getUserMedia({ video: true })
  // .then(stream => {
  //   console.log("Stream OK:", stream);
  // })
  // .catch(err => {
  //   console.error("Camera error:", err);
  // });

//   const notifications = useHMSNotifications();

// useEffect(() => {
//   if (notifications && notifications.type === 'ERROR') {
//     console.error("HMS ERROR", notifications);
//   }
// }, [notifications]);

  return (
    <div className="peer-container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={peer.isLocal}
        className="rounded shadow w-full"
      />
      <div className="peer-name text-center mt-1">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
};

export default Peer;
