// // ChatBox.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { MessageSquare, Video, Send } from 'lucide-react';
// import ReportGenerator from '../ReportGenerator';

// const ChatBox = (ideaId, boardMembers, votes) => {
//   const [activeTab, setActiveTab] = useState('discussion');
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       user: 'Temesgen',
//       text: 'Welcome to the board meeting.',
//       time: '10:00 AM',
//     },
//     {
//       id: 2,
//       user: 'Sarah Johnson',
//       text: "Let's discuss the fund release proposal.",
//       time: '10:02 AM',
//     },
//   ]);
//   const [newMessage, setNewMessage] = useState('');
//   const chatRef = useRef(null);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage.trim()) {
//       setMessages([
//         ...messages,
//         {
//           id: messages.length + 1,
//           user: 'John Smith',
//           text: newMessage,
//           time: new Date().toLocaleTimeString([], {
//             hour: '2-digit',
//             minute: '2-digit',
//           }),
//         },
//       ]);
//       setNewMessage('');
//     }
//   };

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     // <div className="bg-white rounded-lg shadow p-6 mb-6">
//       <div className="flex gap-4 mb-4">
//         {/* <button
//           onClick={() => setActiveTab('discussion')}
//           className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
//             activeTab === 'discussion'
//               ? 'bg-blue-600 text-white'
//               : 'bg-gray-100'
//           }`}
//         >
//           <MessageSquare size={20} />
//           Discussion
//         </button> */}
//         <button
//           onClick={() => setActiveTab('video')}
//           className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
//             activeTab === 'video' ? 'bg-blue-600 text-white' : 'bg-gray-100'
//           }`}
//         >
//           <Video size={20} />
//           Video Meeting
//         </button>
//       {/* </div> */}

//       <div className="h-96 bg-gray-50 rounded-lg">
//         {activeTab === 'discussion' ? (
//           <div className="h-full flex flex-col p-4">
//             <div className="flex-1 overflow-y-auto mb-4" ref={chatRef}>
//               {messages.map((message) => (
//                 <div key={message.id} className="mb-4">
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
//                       {message.user.charAt(0)}
//                     </div>
//                     <div>
//                       <span className="font-medium">{message.user}</span>
//                       <span className="text-sm text-gray-500 ml-2">
//                         {message.time}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="ml-10 mt-1 p-2 bg-white rounded-lg shadow-sm">
//                     {message.text}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <form onSubmit={handleSendMessage} className="flex gap-2">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Type your message..."
//                 className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="submit"
//                 className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 <Send size={20} />
//               </button>
//             </form>
//           </div>
//         ) : (
//           <div className="h-full flex flex-col items-center justify-center">
//             <Video size={48} className="text-gray-400 mb-4" />
//             <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//               Join Video Meeting
//             </button>
//           </div>
//         // )}
//       </div>
//     </div>
//   );
// };

// export default ChatBox;
