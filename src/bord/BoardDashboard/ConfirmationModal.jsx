// ConfirmationModal.jsx
import React from "react";
import { AlertCircle, X } from "lucide-react";

const ConfirmationModal = ({ onCancel, onConfirm, chairman }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Fund Release Confirmation</h3>
          <button onClick={onCancel}>
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <AlertCircle className="text-yellow-600 inline-block mr-2" />
            <span className="text-sm text-yellow-800">
              You are about to vote for releasing funds to the entrepreneur.
              Please verify transfer details below:
            </span>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Transfer Details</h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Purpose:</span> Project funding release
              </p>
              <p>
                <span className="text-gray-600">Bank:</span> {chairman.bankName}
              </p>
              <p>
                <span className="text-gray-600">Account Name:</span> {chairman.name}
              </p>
              <p>
                <span className="text-gray-600">Account Number:</span> {chairman.accountDetails}
              </p>
              <p>
                <span className="text-gray-600">Amount:</span> $1,000,000
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Confirm Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
