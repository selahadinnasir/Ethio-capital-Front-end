import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { api } from "../../APIRoutes/routes";

const socket = io("http://localhost:3001/");

const Message = ({ conversationId, userId, ideaId, otherUserId }) => {
  const [allMessages, setAllMessages] = useState([]); // Store all messages
  const [messages, setMessages] = useState([]); // Store filtered messages
  const [ideaOwnerId, setIdeaOwnerId] = useState(null);
  const [input, setInput] = useState("");
  const [investors, setInvestors] = useState([]);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const messagesStartRef = useRef(null);
  // const [conversationId, setConversationId] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Fetch the idea owner ID
  useEffect(() => {
    if (ideaId) {
      axios
        .get(`/get-idea/${ideaId}`)
        .then((res) => {
          console.log("response of get idea", res.data.user._id);
          setIdeaOwnerId(res.data.user._id); // Assuming ownerId is returned
          // console.log("ownerID", ideaOwnerId);
        })
        .catch((err) => console.error("Error fetching idea:", err));
    }
  }, [ideaId]);

  // Fetch investors from the database
  useEffect(() => {
    if (!ideaOwnerId) return; // Wait until ideaOwnerId is set

    setLoading(true);
    axios
      .get("http://localhost:3001/api/v1/user/conversations")
      .then((res) => {
        const previousChatUsers = res.data || [];
        if (userId === ideaOwnerId) {
          setInvestors(previousChatUsers);
        }
      })
      .catch((err) => {
        console.error("Error fetching investors:", err);
        setError("Failed to fetch investors.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, ideaOwnerId]); // Only run after ideaOwnerId is available

  // axios
  // .get(`/fetch-messages/${conversationId}/${ideaId}`)
  // .then((res) => {
  //   // setInvestors([res.data]);
  // })
  // .catch((err) => console.log(err));

  // Check If Frontend Is Connecting to Socket.io
  // const socket = io("https://ethio-capital-back-end-2.onrender.com", {
  //   transports: ["websocket", "polling"], // Ensure it tries both transports
  //   reconnectionAttempts: 5, // Retry connecting 5 times
  //   reconnectionDelay: 1000, // Delay between retries
  // });

  // socket.on("connect", () => {
  //   console.log("Socket connected:", socket.id);
  // });
  // console.log("Rendering component, conversationId:", conversationId);

  // Fetch messages for the selected conversation
  // useEffect(() => {
  //   // console.log("Inside useEffect, conversationId:", conversationId);
  //   socket.on("connect", () => {
  //     console.log("Socket connected:", socket.id);
  //   });

  //   socket.on("disconnect", (reason) => {
  //     console.log("Socket disconnected:", reason);
  //   });

  //   socket.on("connect_error", (error) => {
  //     console.log("Socket connection error:", error);
  //   });
  //   if (!conversationId) {
  //     console.log("No conversationId available, skipping joinRoom.");
  //     return;
  //   }
  //   console.log(`Attempting to join room: ${conversationId}`);

  //   socket.emit("joinRoom", conversationId, (ack) => {
  //     console.log(`Sent request to join room: ${conversationId}`);
  //   });

  //   socket.on("message", (message) => {
  //     console.log("New real-time message received:", message); // ✅ Check if messages arrive
  //     setMessages((prev) => [...prev, message]);
  //   });

  //   return () => {
  //     socket.off("message");
  //   };
  // }, [conversationId]);

  // from previos Message Compoennt
  useEffect(() => {
    if (!conversationId) return;
    socket.emit("joinRoom", conversationId);

    console.log("conversation id", conversationId);
    // console.log("idea id", ideaId);
    // console.log("user id", userId);
    if (userId === ideaOwnerId) return;
    axios
      .get(`/fetch-messages/${conversationId}/${ideaId}`)
      .then((res) => {
        console.log("Fetched Messages:", res.data); // Log fetched messages
        setMessages(res.data);
      })
      .catch((err) => console.log(err));

    socket.on("message", (message) => {
      console.log("New Message Received:", message); // Log new message
      setMessages((prev) => [...prev, message]); // Add new message at the end
    });

    return () => {
      console.log("Leaving room:", conversationId);
      socket.off("message");
    };
  }, [conversationId]);

  useEffect(() => {
    setMessages([]); // Clear previous messages to avoid showing the old chat
    if (selectedInvestor) {
      fetchMessages(selectedInvestor._id);
    }
  }, [selectedInvestor]);

  const fetchMessages = async (investorId) => {
    try {
      // by investor Id
      const response = await axios.get(
        `http://localhost:3001/api/v1/fetch-messages-for-user/${investorId}`
      );
      // by convesrations
      // const response = await axios.get(
      //   http://localhost:3001/api/v1/fetch-messages/${conversationId}/${ideaId}
      // );
      console.log("message for selected Investor", response.data);
      setMessages(response.data); // Update messages
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  // Scroll to the bottom of the chat
  useEffect(() => {
    if (messagesStartRef.current) {
      messagesStartRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  // Send a new message
  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const messageData = {
        conversationId,
        sender: userId,
        text: input,
        timestamp: Date.now(),
      };
      console.log("Message before sending:", messageData);
      setMessages((prev) => [...prev, messageData]);
      socket.emit("sendMessage", messageData, (ack) => {
        console.log("Acknowledgment from server:", ack); // ✅ Check if the server responds
      });
      setInput("");
    }
  };

  // Sort messages by timestamp
  const sortedMessages = [...messages].sort((a, b) => {
    const aTime = new Date(a.timestamp).getTime();
    const bTime = new Date(b.timestamp).getTime();
    return aTime - bTime;
  });
  // console.log(
  //   "🔍 Messages before filtering:",
  //   JSON.stringify(messages, null, 2)
  // );

  // const sortedMessages = sortedMessages1.filter(
  //   (message) =>
  //     (message.sender === selectedInvestor?._id ||
  //       message.conversationId?.participants?.includes(
  //         selectedInvestor?._id
  //       )) &&
  //     (message.sender === userId ||
  //       message.conversationId?.participants?.includes(userId))
  // );

  // console.log("after sorted",sortedMessages);

  return (
    <div className="flex h-[500px] bg-white rounded-lg shadow-lg">
      {/* Show previous chat users only for the idea owner */}
      {userId === ideaOwnerId ? (
        loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error Fetching Investors</p>
        ) : (
          <div className="w-1/3 border-r border-gray-200">
            <div className="p-4 bg-blue-600 text-white rounded-t-lg">
              <h2 className="text-lg font-semibold">Investors</h2>
            </div>
            <div className="overflow-y-auto custom-scrollbar">
              {investors.length > 0 ? (
                investors.map((investor) => (
                  <div
                    key={investor._id}
                    className="p-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedInvestor(investor)}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={investor.profileImage || "/default-avatar.png"} // Default image if missing
                        alt={investor.fullName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{investor.fullName}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No previous chat users found.</p> // If no previous chats, show this message
              )}
            </div>
          </div>
        )
      ) : (
        // If the user is NOT the idea owner, show only the chat button (no loading or errors)
        ""
      )}

      {/* Chat Section */}
      <div className="w-2/3 flex flex-col">
        {/* Display Investor Details */}
        {selectedInvestor && (
          <div className="p-4 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <img
                src={selectedInvestor.profileImage}
                alt={selectedInvestor.fullName}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">
                Chat with {selectedInvestor.fullName}
              </span>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {sortedMessages.map((message) => (
            <div
              key={message._id || `${message.timestamp}-${message.text}`}
              className={`mb-2 flex ${
                message.sender === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.sender === userId ? "bg-blue-200" : "bg-gray-200"
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          <div ref={messagesStartRef} />
        </div>

        {/* Message Input and Video Chat Button */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
            <button
              type="button"
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={() => alert("Start Video Chat")}
            >
              Video Chat
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;
