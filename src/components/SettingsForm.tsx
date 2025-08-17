import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
interface SettingsFormProps {
  onComplete: () => void;
}
const SettingsForm: React.FC<SettingsFormProps> = ({
  onComplete
}) => {
  const {
    settings,
    updateSettings
  } = useSettings();
  const [dailyLimit, setDailyLimit] = useState(settings.dailyProblemLimit);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      dailyProblemLimit: dailyLimit
    });
    onComplete();
  };
  return <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="dailyLimit" className="block text-sm font-medium text-gray-700 mb-1">
          Daily Problem Limit
        </label>
        <div className="flex items-center">
          <input type="number" id="dailyLimit" min={1} max={20} value={dailyLimit} onChange={e => setDailyLimit(parseInt(e.target.value) || 1)} className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          <span className="ml-2 text-sm text-gray-500">problems per day</span>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          This limits how many problems are shown for review each day.
        </p>
      </div>
      <div className="flex justify-end space-x-3">
        <button type="button" onClick={onComplete} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save Settings
        </button>
      </div>
    </form>;
};
export default SettingsForm;