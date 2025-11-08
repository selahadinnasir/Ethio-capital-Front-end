// VoteSection.jsx
import { React, useState, useEffect } from 'react';
import { DollarSign, Clock, Activity, CheckCircle } from 'lucide-react';

import axios from 'axios';

const VoteSection = ({ votes, setVotes, boardMembers, ideaId, voterId }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const API = axios.create({
    baseURL: 'http://localhost:3001/api/v1', // change if needed
  });

  const majority = Math.ceil(boardMembers.length / 2);

  // console.log("borLenght",boardMembers.length);
  // console.log("bord meber",boardMembers);

  const handleVote = async (key) => {
    try {
      const res = await API.post('/votes', {
        ideaId,
        voterId,
        type: key,
      });

      await fetchVotes();

      if (res.status === 200) {
        setNotificationMessage(res.data.message || `${key} vote submitted`);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
    } catch (err) {
      setNotificationMessage('❌ Error submitting vote');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }
  };

  const fetchVotes = async () => {
    try {
      const res = await API.get(`/votes/${ideaId}`);
      const voteMap = {};

      res.data.forEach((vote) => {
        voteMap[vote.type] = (voteMap[vote.type] || 0) + 1;
      });

      setVotes(voteMap);
    } catch (err) {
      console.error('Failed to load votes');
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const voteOptions = [
    {
      key: 'releaseFunds',
      icon: DollarSign,
      title: 'Release Funds',
      colorClass: 'bg-blue-600',
      description: 'Release project funds to entrepreneur',
    },
    {
      key: 'extendTime',
      icon: Clock,
      title: 'Extend Timeline',
      colorClass: 'bg-yellow-600',
      description: 'Extend project deadline',
    },
    {
      key: 'refundInvestors',
      icon: Activity,
      title: 'Refund Investors',
      colorClass: 'bg-red-600',
      description: 'Return funds to investors',
    },
  ];

  return (
    <div className="bg-white mt-5 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Board Voting</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {voteOptions.map(
          ({ key, icon: Icon, title, colorClass, description }) => (
            <button
              key={key}
              onClick={() => handleVote(key)}
              className={`p-6 border rounded-lg hover:bg-${colorClass} transition-colors`}
            >
              <Icon className={`mx-auto mb-2 text-${colorClass}`} size={24} />
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-gray-600 mb-2">{description}</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className={`${colorClass} rounded-full h-2`}
                  style={{
                    width: `${
                      ((votes[key] || 0) / boardMembers.length) * 100
                    }%`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Votes: {votes[key]}/{boardMembers.length}
              </p>
              {votes[key] >= majority && (
                <p className="text-sm text-green-600 mt-1">
                  {key === 'releaseFunds' &&
                    '✅ Majority Achieved - Funds Ready for Release'}
                  {key === 'extendTime' &&
                    '⏳ Majority Achieved - Project Timeline Will Be Extended'}
                  {key === 'refundInvestors' &&
                    '💸 Majority Achieved - Investors Will Be Refunded'}
                </p>
              )}
            </button>
          )
        )}
        {showNotification && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <CheckCircle size={20} />
            <span>{notificationMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoteSection;
