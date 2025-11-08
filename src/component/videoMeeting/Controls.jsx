
import { useHMSActions, useHMSStore, selectIsLocalAudioEnabled, selectIsLocalVideoEnabled } from "@100mslive/react-sdk";

const Controls = () => {
  const hmsActions = useHMSActions();
  const isAudioOn = useHMSStore(selectIsLocalAudioEnabled);
  const isVideoOn = useHMSStore(selectIsLocalVideoEnabled);

  const toggleMute = async () => {
    await hmsActions.setLocalAudioEnabled(!isAudioOn);
  };

  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!isVideoOn);
  };

  return (
    <div className="flex gap-4 mt-4">
      <button onClick={toggleMute} className="bg-red-500 text-white px-4 py-2 rounded">
        {isAudioOn ? "Mute" : "Unmute"}
      </button>
      <button onClick={toggleVideo} className="bg-blue-500 text-white px-4 py-2 rounded">
        {isVideoOn ? "Stop Video" : "Start Video"}
      </button>
    </div>
  );
};

export default Controls;
