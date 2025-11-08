
import { useHMSStore, selectPeers } from "@100mslive/react-sdk";
import Peer from "./Peer";

const VideoGrid = () => {
  const peers = useHMSStore(selectPeers);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {peers.map(peer => (
        <Peer key={peer.id} peer={peer} />
      ))}
    </div>
  );
};

export default VideoGrid;
