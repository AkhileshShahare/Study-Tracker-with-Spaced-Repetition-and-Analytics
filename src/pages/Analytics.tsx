import React, { useMemo } from 'react';
import { ProblemProvider, useProblems } from '../context/ProblemContext';
import { SettingsProvider } from '../context/SettingsContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
interface AnalyticsContentProps {}
const AnalyticsContent: React.FC<AnalyticsContentProps> = () => {
  const {
    problems
  } = useProblems();
  // Count problems by difficulty
  const difficultyData = useMemo(() => {
    const counts = {
      Easy: 0,
      Medium: 0,
      Hard: 0
    };
    problems.filter(p => p.dateSolved).forEach(problem => {
      counts[problem.difficulty] += 1;
    });
    return [{
      name: 'Easy',
      value: counts.Easy
    }, {
      name: 'Medium',
      value: counts.Medium
    }, {
      name: 'Hard',
      value: counts.Hard
    }];
  }, [problems]);
  // Group problems by month
  const monthlyData = useMemo(() => {
    const months: Record<string, number> = {};
    problems.filter(p => p.dateSolved).forEach(problem => {
      const date = new Date(problem.dateSolved);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!months[monthKey]) {
        months[monthKey] = 0;
      }
      months[monthKey] += 1;
    });
    return Object.entries(months).map(([month, count]) => ({
      month,
      count
    })).sort((a, b) => a.month.localeCompare(b.month)).slice(-6); // Last 6 months
  }, [problems]);
  // Calculate review success rate
  const reviewSuccessRate = useMemo(() => {
    if (problems.length === 0) return 0;
    const totalReviews = problems.reduce((sum, problem) => sum + problem.reviewHistory.length, 0);
    if (totalReviews === 0) return 0;
    const successfulReviews = problems.reduce((sum, problem) => {
      return sum + problem.reviewHistory.filter((review, i, arr) => {
        // A successful review is one where the level increased from the previous review
        if (i === 0) return review.level > 0;
        return review.level > arr[i - 1].level;
      }).length;
    }, 0);
    return Math.round(successfulReviews / totalReviews * 100);
  }, [problems]);
  // Calculate streak (consecutive days with at least one problem solved)
  const streak = useMemo(() => {
    if (problems.length === 0) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Get all solved dates
    const solvedDates = problems.filter(p => p.dateSolved).map(p => new Date(p.dateSolved)).sort((a, b) => b.getTime() - a.getTime()); // Sort descending
    // Get unique dates
    const uniqueDates = Array.from(new Set(solvedDates.map(d => d.toISOString().split('T')[0]))).map(dateStr => new Date(dateStr)).sort((a, b) => b.getTime() - a.getTime()); // Sort descending
    if (uniqueDates.length === 0) return 0;
    // Check if most recent date is today or yesterday
    const mostRecent = uniqueDates[0];
    const timeDiff = today.getTime() - mostRecent.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (daysDiff > 1) return 0; // Streak broken
    // Count consecutive days
    let currentStreak = 1;
    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = uniqueDates[i - 1];
      const currDate = uniqueDates[i];
      const expectedPrevDate = new Date(currDate);
      expectedPrevDate.setDate(currDate.getDate() + 1);
      if (prevDate.getDate() === expectedPrevDate.getDate() && prevDate.getMonth() === expectedPrevDate.getMonth() && prevDate.getFullYear() === expectedPrevDate.getFullYear()) {
        currentStreak++;
      } else {
        break;
      }
    }
    return currentStreak;
  }, [problems]);
  // Count problems by category
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    problems.filter(p => p.dateSolved && p.category).forEach(problem => {
      if (!counts[problem.category!]) {
        counts[problem.category!] = 0;
      }
      counts[problem.category!] += 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value);
  }, [problems]);
  const COLORS = ['#4ade80', '#facc15', '#f87171'];
  const CATEGORY_COLORS = ['#3b82f6', '#f97316', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e', '#22c55e', '#6366f1', '#a855f7', '#d946ef', '#0ea5e9', '#84cc16'];
  // Calculate total solved and unsolved
  const solvedCount = problems.filter(p => p.dateSolved).length;
  const unsolvedCount = problems.filter(p => !p.dateSolved).length;
  return <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            Problems Solved
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {solvedCount}/{problems.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            Current Streak
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {streak} {streak === 1 ? 'day' : 'days'}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            Review Success Rate
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {reviewSuccessRate}%
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Problems by Difficulty</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={difficultyData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                name,
                percent
              }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                  {difficultyData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Problems Solved by Month
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Problems Solved" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {categoryData.length > 0 && <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-4">Problems by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{
            top: 5,
            right: 30,
            left: 120,
            bottom: 5
          }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="value" name="Problems Solved">
                  {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>}
    </div>;
};
const Analytics: React.FC = () => {
  return <SettingsProvider>
      <ProblemProvider>
        <AnalyticsContent />
      </ProblemProvider>
    </SettingsProvider>;
};
export default Analytics;