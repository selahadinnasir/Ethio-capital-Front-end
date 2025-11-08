import axios from 'axios';
import { saveAs } from 'file-saver';
import { BOARD } from '../APIRoutes/routes';

const ReportGenerator = ({ ideaId, boardMembers, votes }) => {
  // 👇 Do this (real objects)
  // console.log('ideaId:', ideaId);
  // console.log('boardMembers:', boardMembers);
  // console.log('votes:', votes);
  const generateReport = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/generate-report', // now sending a POST request
        {
          ideaId,
          boardMembers,
          votes,
        },
        {
          responseType: 'blob', // to handle PDF
        }
      );

      saveAs(response.data, 'board-report.pdf');
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <button
      // className="px-4 py-2 w-auto ml-5 sm:mt-3 h-auto bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      onClick={generateReport}
    >
      Download Report
    </button>
  );
};

export default ReportGenerator;
