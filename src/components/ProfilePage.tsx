import { SyntheticEvent, useState } from "react";

const ProfilePage = () => {
  const [email, setEmail] = useState('user@example.com'); // Placeholder email
  const [password, setPassword] = useState('********'); // Placeholder password
  const [newPassword, setNewPassword] = useState('');
  const [events, setEvents] = useState([
    { id: 1, title: 'Event 1', date: '2024-09-30' },
    { id: 2, title: 'Event 2', date: '2024-10-05' },
  ]);

  const handlePasswordReset = (e: SyntheticEvent) => {
    e.preventDefault();
    // Add your password reset logic here
    alert(`Password reset to: ${newPassword}`);
    setNewPassword(''); // Clear input
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Profile</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Email Address</label>
          <p className="text-gray-200">{email}</p>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <p className="text-gray-200">{password}</p>
        </div>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none p-2"
              placeholder="Enter new password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-md p-2 transition duration-200"
          >
            Reset Password
          </button>
        </form>

        <h3 className="mt-8 text-lg font-semibold text-white">Hosted Events</h3>
        <ul className="mt-4 space-y-2">
          {events.map(event => (
            <li key={event.id} className="bg-gray-700 rounded-md p-3">
              <h4 className="text-gray-200">{event.title}</h4>
              <p className="text-gray-400">{event.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
