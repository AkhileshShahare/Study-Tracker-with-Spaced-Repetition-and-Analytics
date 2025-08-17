import React, { useState, Fragment } from 'react';
import { Problem, useProblems } from '../context/ProblemContext';
import { getRelativeDateText } from '../utils/spacedRepetition';
import { CheckCircleIcon, XCircleIcon, TrashIcon, PencilIcon, TagIcon } from 'lucide-react';
import ProblemForm from './ProblemForm';
interface ProblemListProps {
  problems: Problem[];
}
const ProblemList: React.FC<ProblemListProps> = ({
  problems
}) => {
  const {
    markAsReviewed,
    deleteProblem
  } = useProblems();
  const [editingProblemId, setEditingProblemId] = useState<string | null>(null);
  const handleReview = (id: string, success: boolean) => {
    markAsReviewed(id, success);
  };
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this problem?')) {
      deleteProblem(id);
    }
  };
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  if (problems.length === 0) {
    return <p className="text-gray-500">No problems to display.</p>;
  }
  return <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Problem
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Difficulty
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Next Review
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {problems.map(problem => <Fragment key={problem.id}>
              {editingProblemId === problem.id ? <tr>
                  <td colSpan={4} className="px-6 py-4">
                    <ProblemForm problem={problem} onComplete={() => setEditingProblemId(null)} />
                  </td>
                </tr> : <tr>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">
                          {problem.title}
                        </span>
                        {problem.neetCodeId && <span className="ml-2 text-xs text-gray-500">
                            #{problem.neetCodeId}
                          </span>}
                      </div>
                      <div className="flex items-center mt-1">
                        {problem.category && <div className="flex items-center text-xs text-gray-500 mr-3">
                            <TagIcon className="w-3 h-3 mr-1" />
                            {problem.category}
                          </div>}
                        {problem.link && <a href={problem.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                            View problem
                          </a>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {problem.dateSolved ? getRelativeDateText(problem.nextReviewDate) : 'Not solved yet'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2 whitespace-nowrap">
                    {problem.dateSolved ? <>
                        <button onClick={() => handleReview(problem.id, true)} className="text-green-600 hover:text-green-900 p-1" title="Mark as successfully reviewed">
                          <CheckCircleIcon className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleReview(problem.id, false)} className="text-red-600 hover:text-red-900 p-1" title="Mark as needs more practice">
                          <XCircleIcon className="w-5 h-5" />
                        </button>
                      </> : null}
                    <button onClick={() => setEditingProblemId(problem.id)} className="text-blue-600 hover:text-blue-900 p-1" title="Edit problem">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(problem.id)} className="text-gray-600 hover:text-gray-900 p-1" title="Delete problem">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>}
            </Fragment>)}
        </tbody>
      </table>
    </div>;
};
export default ProblemList;