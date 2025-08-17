import React, { useEffect, useState, createContext, useContext } from 'react';
import { calculateNextReviewDate } from '../utils/spacedRepetition';
export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  link?: string;
  dateAdded: string;
  dateSolved: string;
  reviewLevel: number;
  nextReviewDate: string;
  reviewHistory: {
    date: string;
    level: number;
  }[];
  notes?: string;
  neetCodeId?: number; // Added for NeetCode ordering
  category?: string; // Added for NeetCode categorization
}
interface ProblemContextType {
  problems: Problem[];
  addProblem: (problem: Omit<Problem, 'id' | 'reviewLevel' | 'nextReviewDate' | 'reviewHistory' | 'neetCodeId' | 'category'>) => void;
  updateProblem: (id: string, updates: Partial<Problem>) => void;
  deleteProblem: (id: string) => void;
  markAsReviewed: (id: string, success: boolean) => void;
  importNeetCode150: () => void;
}
const ProblemContext = createContext<ProblemContextType | undefined>(undefined);
export const ProblemProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  // Load problems from localStorage on initial render
  useEffect(() => {
    const savedProblems = localStorage.getItem('leetcodeProblems');
    if (savedProblems) {
      setProblems(JSON.parse(savedProblems));
    }
  }, []);
  // Save problems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('leetcodeProblems', JSON.stringify(problems));
  }, [problems]);
  const addProblem = (problemData: Omit<Problem, 'id' | 'reviewLevel' | 'nextReviewDate' | 'reviewHistory' | 'neetCodeId' | 'category'>) => {
    const newProblem: Problem = {
      ...problemData,
      id: Date.now().toString(),
      reviewLevel: 0,
      // Calculate next review date based on date solved (start with day after solving)
      nextReviewDate: calculateNextReviewDate(0, new Date(problemData.dateSolved)),
      reviewHistory: []
    };
    setProblems(prev => [...prev, newProblem]);
  };
  const updateProblem = (id: string, updates: Partial<Problem>) => {
    setProblems(prev => prev.map(problem => {
      if (problem.id === id) {
        // If date solved is changed, recalculate next review date
        const updatedProblem = {
          ...problem,
          ...updates
        };
        if (updates.dateSolved && updates.dateSolved !== problem.dateSolved) {
          // If date solved was updated, recalculate next review
          updatedProblem.nextReviewDate = calculateNextReviewDate(0, new Date(updates.dateSolved));
          updatedProblem.reviewLevel = 0;
          updatedProblem.reviewHistory = [];
        }
        return updatedProblem;
      }
      return problem;
    }));
  };
  const deleteProblem = (id: string) => {
    setProblems(prev => prev.filter(problem => problem.id !== id));
  };
  const markAsReviewed = (id: string, success: boolean) => {
    setProblems(prev => prev.map(problem => {
      if (problem.id === id) {
        const newReviewLevel = success ? Math.min(problem.reviewLevel + 1, 5) // Cap at level 5
        : Math.max(problem.reviewLevel - 1, 0); // Don't go below 0
        // Use today's date for the next review calculation
        const nextReviewDate = calculateNextReviewDate(newReviewLevel);
        return {
          ...problem,
          reviewLevel: newReviewLevel,
          nextReviewDate,
          reviewHistory: [...problem.reviewHistory, {
            date: new Date().toISOString().split('T')[0],
            level: newReviewLevel
          }]
        };
      }
      return problem;
    }));
  };
  // Import NeetCode 150 problems
  const importNeetCode150 = async () => {
    try {
      // Use pre-defined NeetCode 150 data from our utils
      const {
        neetCode150Problems
      } = await import('../utils/neetCode150Data');
      // Filter out problems that already exist (by title)
      const existingTitles = new Set(problems.map(p => p.title));
      const newProblems = neetCode150Problems.filter(p => !existingTitles.has(p.title));
      if (newProblems.length === 0) {
        alert('All NeetCode 150 problems are already imported!');
        return;
      }
      // Add the new problems
      const today = new Date().toISOString().split('T')[0];
      const importedProblems = newProblems.map((problem, index) => ({
        id: `neetcode-${Date.now()}-${index}`,
        title: problem.title,
        difficulty: problem.difficulty as 'Easy' | 'Medium' | 'Hard',
        link: problem.link,
        dateAdded: today,
        dateSolved: '',
        reviewLevel: 0,
        nextReviewDate: '',
        reviewHistory: [],
        neetCodeId: problem.id,
        category: problem.category
      }));
      setProblems(prev => [...prev, ...importedProblems]);
      alert(`Successfully imported ${importedProblems.length} problems from NeetCode 150!`);
    } catch (error) {
      console.error('Error importing NeetCode 150 problems:', error);
      alert('Failed to import NeetCode 150 problems. Please try again.');
    }
  };
  const value = {
    problems,
    addProblem,
    updateProblem,
    deleteProblem,
    markAsReviewed,
    importNeetCode150
  };
  return <ProblemContext.Provider value={value}>{children}</ProblemContext.Provider>;
};
export const useProblems = () => {
  const context = useContext(ProblemContext);
  if (context === undefined) {
    throw new Error('useProblems must be used within a ProblemProvider');
  }
  return context;
};