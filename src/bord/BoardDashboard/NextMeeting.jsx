import { useEffect, useState } from 'react';
import axios from 'axios';

const NextMeeting = ({ ideaId }) => {
  const [meetingInfo, setMeetingInfo] = useState(null);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/ideas/${ideaId}/meeting`,
          { withCredentials: true }
        );
        setMeetingInfo(response.data);
      } catch (error) {
        console.error('Error fetching meeting info:', error);
      }
    };

    fetchMeeting();
  }, [ideaId]);

  //   if (!meetingInfo) return <p>No meeting scheduled yet.</p>;

  return new Date(meetingInfo?.time) > new Date() ? ( // Only render if the meeting time is in the future
    <div className="p-4 bg-blue-600 mb-5 shadow rounded w-40 mt-4">
      {/* <h3 className="font-bold text-lg">Next Scheduled Meeting</h3> */}
      <p className="mt-1 text-white">
        📅 <strong>{new Date(meetingInfo?.time).toLocaleString()}</strong>
      </p>
      {/* <p className="text-sm text-gray-500">(Set by: {meetingInfo.setBy})</p> */}
    </div>
  ) : null; // Don't render anything if the meeting time has passed
};

export default NextMeeting;
