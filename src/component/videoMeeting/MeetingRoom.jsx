import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  HMSRoomProvider,
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
} from '@100mslive/react-sdk';
import { useLocation } from 'react-router-dom';
import VideoGrid from './VideoGrid';
import Controls from './Controls';
import Peer from './Peer';

const JoinMeeting = () => {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const { state } = useLocation();
  const { roomName, userId, ideaOwnerId } = state || {};
  const [role, setRole] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/v1/user`); // ✅ your route:
        console.log('get user by id ', res.data);
        console.log('user role ', res.data.role);

        setFullName(res.data.fullName || 'User');
        setRole(`${userId === ideaOwnerId ? 'host' : 'guest'}`);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setFullName('User');
        setRole(`${userId === ideaOwnerId ? 'host' : 'guest'}`);
      }
    };

    if (userId && ideaOwnerId) {
      fetchUser();
    }
  }, [userId, ideaOwnerId]);

  const joinRoom = async () => {
    try {
      const roomRes = await axios.post(
        'http://localhost:3001/api/v1/create-room',
        {
          roomName,
        }
      );

      const tokenRes = await axios.post(
        'http://localhost:3001/api/v1/get-token',
        {
          user_id: userId,
          room_id: roomRes.data.id,
          role,
        }
      );

      const token = tokenRes.data.token;

      await hmsActions.join({
        authToken: token,
        userName: fullName,
      });
    } catch (err) {
      console.error('Error joining room:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {!isConnected ? (
        <button
          onClick={joinRoom}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Join Meeting
        </button>
      ) : (
        <>
          <div className="flex flex-col h-screen bg-gray-900 text-white">
            {/* Video Grid */}
            <div
              className={`flex-1 grid gap-4 p-6 overflow-auto
    ${
      Peer.length <= 1
        ? 'grid-cols-1'
        : Peer.length === 2
        ? 'grid-cols-2'
        : Peer.length <= 4
        ? 'grid-cols-2 md:grid-cols-3'
        : Peer.length <= 6
        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
    }
  `}
            >
              <VideoGrid />
            </div>

            {/* Controls */}
            <div className="p-4 bg-gray-800 border-t border-gray-700 flex justify-center gap-4">
              <Controls />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const MeetingRoom = () => (
  <HMSRoomProvider>
    <JoinMeeting />
  </HMSRoomProvider>
);

export default MeetingRoom;
