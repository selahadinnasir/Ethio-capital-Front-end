import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BoardButton = ({ ideaId, currentUser }) => {
  const navigate = useNavigate();
  const [boardMembers, setBoardMembers] = useState([]);

  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/${ideaId}/members`,
          {
            credentials: 'include',
          }
        );
        const data = await response.json();
        setBoardMembers(data);
      } catch (error) {
        console.error('Error fetching board members:', error);
      }
    };

    if (ideaId) {
      fetchBoardMembers();
    }
  }, [ideaId]);

  //   console.log(`currenUsrID: ${currentUser._id}`);
  // Check if current user is a board member
  const isBoardMember = boardMembers?.some(
    (member) => member.id === currentUser?._id
  );

  if (!isBoardMember) return null; // Don't show button if not a board member

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate(`/BoardDashboard/${ideaId}`)}
      className="bg-blue-600 hover:bg-blue-700 text-white mr-56 font-bold py-2 px-4 rounded absolute top-4 right-4 z-10"
    >
      Board members
    </motion.button>
  );
};

export default BoardButton;
