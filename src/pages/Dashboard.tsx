import React, { useState } from 'react';
import { ProblemProvider, useProblems } from '../context/ProblemContext';
import { SettingsProvider, useSettings } from '../context/SettingsContext';
import ProblemList from '../components/ProblemList';
import ProblemForm from '../components/ProblemForm';
import SettingsForm from '../components/SettingsForm';
import { PlusIcon, SettingsIcon, DownloadIcon } from 'lucide-react';
const DashboardContent: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showImportConfirm, setShowImportConfirm] = useState(false);
  const {
    problems,
    importNeetCode150
  } = useProblems();
  const {
    settings
  } = useSettings();
  const todayStr = new Date().toISOString().split('T')[0];
  // Get due problems (problems due today or earlier)
  const dueProblems = problems.filter(p => p.nextReviewDate && p.nextReviewDate <= todayStr).sort((a, b) => {
    // Sort by date (oldest first)
    return new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime();
  })
  // Limit to daily problem limit
  .slice(0, settings.dailyProblemLimit);
  // Get upcoming problems (problems due in the future)
  const upcomingProblems = problems.filter(p => p.nextReviewDate && p.nextReviewDate > todayStr).sort((a, b) => {
    // Sort by date (soonest first)
    return new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime();
  });
  // Get unsolved problems (problems without a solved date)
  const unsolvedProblems = problems.filter(p => !p.dateSolved).sort((a, b) => {
    // Sort by NeetCode ID if available
    if (a.neetCodeId && b.neetCodeId) {
      return a.neetCodeId - b.neetCodeId;
    }
    // Otherwise sort by title
    return a.title.localeCompare(b.title);
  });
  const handleImport = () => {
    importNeetCode150();
    setShowImportConfirm(false);
  };
  return <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-2">
          <button onClick={() => setShowSettings(!showSettings)} className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <SettingsIcon className="w-5 h-5 mr-1" />
            Settings
          </button>
          <button onClick={() => setShowImportConfirm(!showImportConfirm)} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <DownloadIcon className="w-5 h-5 mr-1" />
            Import NeetCode 150
          </button>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <PlusIcon className="w-5 h-5 mr-1" />
            {showForm ? 'Cancel' : 'Add Problem'}
          </button>
        </div>
      </div>
      {showSettings && <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          <SettingsForm onComplete={() => setShowSettings(false)} />
        </div>}
      {showImportConfirm && <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Import NeetCode 150</h2>
          <p className="mb-4">
            This will import the NeetCode 150 problem list into your tracker.
            Problems are organized by category and follow the same sequence as
            on the NeetCode website.
          </p>
          <div className="flex justify-end space-x-3">
            <button onClick={() => setShowImportConfirm(false)} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </button>
            <button onClick={handleImport} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Import Problems
            </button>
          </div>
        </div>}
      {showForm && <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Add New Problem</h2>
          <ProblemForm onComplete={() => setShowForm(false)} />
        </div>}
      <div className="grid gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-red-600 flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Due for Review ({dueProblems.length}/{settings.dailyProblemLimit})
          </h2>
          {dueProblems.length > 0 ? <ProblemList problems={dueProblems} /> : <p className="text-gray-500">No problems due for review today!</p>}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Upcoming Reviews ({upcomingProblems.length})
          </h2>
          {upcomingProblems.length > 0 ? <ProblemList problems={upcomingProblems} /> : <p className="text-gray-500">No upcoming reviews scheduled.</p>}
        </div>
        {unsolvedProblems.length > 0 && <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-green-600 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Unsolved Problems ({unsolvedProblems.length})
            </h2>
            <ProblemList problems={unsolvedProblems} />
          </div>}
      </div>
    </div>;
};
const Dashboard: React.FC = () => {
  return <SettingsProvider>
      <ProblemProvider>
        <DashboardContent />
      </ProblemProvider>
    </SettingsProvider>;
};
export default Dashboard;