import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordCriteria, setPasswordCriteria] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const clearConfirmPassword = () => {
    setConfirmPassword('');
  };

  const discardChanges = () => {
    // Implement your discard changes logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    if (!passwordCriteria) {
      // Implement your weak password logic here
      return;
    }

    // Implement your submit logic here
  };

  return (
    <div className="bg-white-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex items-center space-x-2 mb-6">
          <img src="https://unsplash.it/40/40?image=883" alt="Lock Icon" className="rounded-full" />
          <h1 className="text-xl font-semibold">Change Password</h1>
        </div>
        <p className="text-sm text-gray-600 mb-6">Update password for enhanced account security.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="currentPassword" className="text-sm font-medium text-gray-700 block mb-2">Current Password *</label>
            <input type="password" id="currentPassword" className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm" required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="newPassword" className="text-sm font-medium text-gray-700 block mb-2">New Password *</label>
            <input type="password" id="newPassword" className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-2">Confirm New Password *</label>
            <input type="password" id="confirmPassword" className="password-input form-input block border w-full border-gray-300 rounded-md shadow-sm" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="button" onClick={clearConfirmPassword} className="text-xs text-blue-600 hover:underline mt-1">Clear</button>
          </div>
          <div id="passwordCriteria" className="text-sm space-y-2">
            <p className="text-red-500">Weak password. Must contain:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>At least 1 uppercase</li>
              <li>At least 1 number</li>
              <li>At least 8 characters</li>
            </ul>
          </div>
          {passwordMismatch && <div className="text-sm text-red-500 mb-2">Passwords do not match.</div>}
          <div className="flex justify-between">
            <button type="button" onClick={discardChanges} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300">Discard</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">Apply Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
