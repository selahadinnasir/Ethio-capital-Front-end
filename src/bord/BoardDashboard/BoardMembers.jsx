// BoardMembers.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

const BoardMembers = ({ boardMembers, votes }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedMember, setSelectedMember] = useState();

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Board Members</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
        >
          {showAll ? 'Show Less' : 'Show More'}
          {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {boardMembers
        ?.slice?.(0, showAll ? boardMembers.length : 3)
        ?.map((member) => (
          <div
            key={member.id}
            className="mb-4 p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
            onClick={() => setSelectedMember(member)}
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl bg-blue-50 p-2 rounded-full">
                {member.image}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{member.name}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      member.status === 'online'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{member.role}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    Shares: {member.shares}
                  </span>
                  <span className="text-sm text-gray-500">
                    {member.contact}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

      {!showAll && boardMembers.length > 3 && (
        <div className="text-center text-sm text-gray-500 mt-4">
          {boardMembers.length - 3} more members available
        </div>
      )}

      {selectedMember &&
        typeof selectedMember === 'object' &&
        selectedMember.name && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
              {/* Close button positioned top right */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                onClick={() => setSelectedMember(null)}
              >
                <X size={24} />
              </button>

              {/* Name */}
              <h3 className="text-xl font-semibold mb-4">
                {selectedMember.name}
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{selectedMember.image}</div>
                  <div>
                    <p className="font-medium">{selectedMember.role}</p>
                    <p className="text-sm text-gray-600">
                      Shares: {selectedMember.shares}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bio</p>
                  <p className="font-medium">{selectedMember.bio}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-medium">{selectedMember.contact}</p>
                </div>

                {boardMembers.role === 'Chairman (Entrepreneur)' &&
                  votes.releaseFunds >= 3 && (
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600 font-semibold">
                        Bank Transfer Details
                      </p>
                      <p className="font-medium">
                        Bank: {selectedMember.bankName}
                      </p>
                      <p className="font-medium">
                        Account: {selectedMember.accountDetails}
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default BoardMembers;
