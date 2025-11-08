import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';

const SetMeetingForm = ({ ideaId, userId, ideaOwnerId }) => {
  const [meetingTime, setMeetingTime] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  //   console.log('ideaOwnerId', ideaOwner._id);

  // Check if the user is the idea owner
  console.log(`is he owner: ${userId === ideaOwnerId}`);

  if (userId !== ideaOwnerId) return null; // Return nothing if user is not the idea owner

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!meetingTime) return;

    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1/ideas/${ideaId}/meeting`,
        { time: meetingTime, userId },
        { withCredentials: true }
      );

      if (response.status >= 200 && response.status < 300) {
        setNotificationMessage(`Meeting time set successfully`);
        setShowNotification(true);
        setMeetingTime('');
        console.log('success metter');
        setTimeout(() => setShowNotification(false), 5000);
      }
    } catch (err) {
      setNotificationMessage('❌ Error scheduling meeting ');
      console.log('err metter');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }
  };

  return (
    <>
      <div className="absolute top-16 right-4 w-auto z-50">
        <form
          onSubmit={handleSubmit}
          className="mt-4 bg-blue-600 p-4 rounded-lg shadow-lg"
        >
          <label className="block text-sm font-medium text-white">
            Set Next Meeting Time:
          </label>
          <input
            type="datetime-local"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            className="mt-1 p-2 border rounded w-auto"
            required
          />
          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-900 text-white py-2 px-4 rounded"
          >
            Set Meeting
          </button>
        </form>
      </div>
      {showNotification && (
        <div className="fixed top-4 right-96 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle size={20} />
          <span>{notificationMessage}</span>
        </div>
      )}
    </>
  );
};

export default SetMeetingForm;
