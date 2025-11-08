import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Users, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../redux/UserSlice';
import ReportGenerator from '../ReportGenerator';
import BoardMembers from './BoardMembers';
import VoteSection from './VoteSection';
import NextMeeting from './NextMeeting';

const BoardDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [boardMembers, setBoardMembers] = useState([]);
  const [ideaOwnerId, setIdeaOwnerId] = useState(null);
  const [title, setTitle] = useState([]);
  const [fundingNeeded, setFundingNeeded] = useState([]);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData); // adjust path if needed

  const navigate = useNavigate();
  const { ideaId } = useParams(); // ✅ get the ideaId from URL

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  // Fetch the idea owner ID
  useEffect(() => {
    if (ideaId) {
      axios
        .get(`http://localhost:3001/api/v1/get-idea/${ideaId}`)

        .then((res) => {
          console.log('response of get idea', res.data.user._id);
          // console.log('idea res of all data', res.data);
          // console.log(`fundingNeede`, res.data.fundingNeeded);
          // console.log(`title`, res.data.title);
          setTitle(res.data.title);
          setFundingNeeded(res.data.fundingNeeded);
          setIdeaOwnerId(res.data.user._id); // Assuming ownerId is returned
          // console.log("ownerID", ideaOwnerId);
        })
        .catch((err) => console.error('Error fetching idea:', err));
    }
  }, [ideaId]);
  // console.log("cureUser ID",userData.userData._id);
  const [votes, setVotes] = useState({
    releaseFunds: 0,
    extendTime: 0,
    refundInvestors: 0,
  });

  // console.log("ideaId",ideaId);
  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/${ideaId}/members`,
          {
            credentials: 'include', // if you're using cookies/auth
          }
        );
        const data = await response.json();
        console.log('memebrs', data);
        setBoardMembers(data);
      } catch (error) {
        console.error('Error fetching board members:', error);
      }
    };
    if (ideaId) {
      fetchBoardMembers();
    }
  }, [ideaId]);

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              {/* Left side - Next Meeting */}
              <div className="w-full sm:w-auto">
                <NextMeeting ideaId={ideaId} />
              </div>

              {/* at center */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Project Name: {title}</h2>
                  <p className="text-gray-600">
                    Total Investment Required: {fundingNeeded}
                  </p>
                </div>
              </div>
              {/* Right side - Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  onClick={() =>
                    navigate('/MeetingRoom', {
                      state: {
                        roomName: 'test-2',
                        userId: `${userData.userData?._id}`,
                        ideaOwnerId,
                      },
                    })
                  }
                >
                  Video Meeting
                </button>
                <ReportGenerator
                  ideaId={ideaId}
                  boardMembers={boardMembers}
                  votes={votes}
                />
              </div>
            </div>

            <BoardMembers boardMembers={boardMembers} votes={votes} />
            <VoteSection
              votes={votes}
              setVotes={setVotes}
              // showConfirmModal={showConfirmModal}
              ideaId={ideaId}
              voterId={userData.userData?._id}
              boardMembers={boardMembers}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">EthioCapital</h1>
          <p className="text-sm text-gray-600">Board Management System</p>
        </div>
        <nav className="mt-6">
          {['dashboard'].map(
            (
              section //setting,documents removed from array
            ) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-50 ${
                  activeSection === section
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                {
                  {
                    dashboard: <Users size={20} />,
                    // documents: <FileText size={20} />,
                    // settings: <Settings size={20} />,
                  }[section]
                }
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            )
          )}
        </nav>
      </div>

      <div className="ml-64 p-8">{renderMainContent()}</div>
    </div>
  );
};
export default BoardDashboard;
