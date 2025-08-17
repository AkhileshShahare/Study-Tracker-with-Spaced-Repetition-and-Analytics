import React, { useState } from 'react';
import { Problem, useProblems } from '../context/ProblemContext';
interface ProblemFormProps {
  problem?: Problem;
  onComplete: () => void;
}
const ProblemForm: React.FC<ProblemFormProps> = ({
  problem,
  onComplete
}) => {
  const today = new Date().toISOString().split('T')[0];
  const {
    addProblem,
    updateProblem
  } = useProblems();
  const [formData, setFormData] = useState({
    title: problem?.title || '',
    difficulty: problem?.difficulty || 'Medium',
    link: problem?.link || '',
    dateSolved: problem?.dateSolved || today,
    notes: problem?.notes || ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem) {
      // Update existing problem
      updateProblem(problem.id, {
        ...formData,
        difficulty: formData.difficulty as 'Easy' | 'Medium' | 'Hard'
      });
    } else {
      // Add new problem
      addProblem({
        ...formData,
        dateAdded: today,
        difficulty: formData.difficulty as 'Easy' | 'Medium' | 'Hard'
      });
    }
    onComplete();
  };
  return <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Problem Title *
          </label>
          <input type="text" id="title" name="title" required value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty
          </label>
          <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
            Problem Link (Optional)
          </label>
          <input type="url" id="link" name="link" value={formData.link} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="https://leetcode.com/problems/..." />
        </div>
        <div>
          <label htmlFor="dateSolved" className="block text-sm font-medium text-gray-700 mb-1">
            Date Solved
          </label>
          <input type="date" id="dateSolved" name="dateSolved" value={formData.dateSolved} onChange={handleChange} max={today} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes (Optional)
        </label>
        <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Add your solution approach or notes here..." />
      </div>
      <div className="flex justify-end space-x-3">
        <button type="button" onClick={onComplete} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {problem ? 'Update Problem' : 'Add Problem'}
        </button>
      </div>
    </form>;
};
export default ProblemForm;