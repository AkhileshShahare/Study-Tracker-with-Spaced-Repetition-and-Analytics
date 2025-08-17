/**
 * Calculates the next review date based on the spaced repetition level
 * Level 0: Today (first time)
 * Level 1: Tomorrow
 * Level 2: 3 days later
 * Level 3: 1 week later
 * Level 4: 2 weeks later
 * Level 5: 1 month later
 *
 * @param level The current review level
 * @param baseDate The date to calculate from (defaults to today)
 */
export const calculateNextReviewDate = (level: number, baseDate?: Date): string => {
  const today = baseDate || new Date();
  let nextDate = new Date(today);
  switch (level) {
    case 0:
      // First review: day after solving/base date
      nextDate.setDate(today.getDate() + 1);
      break;
    case 1:
      // Tomorrow
      nextDate.setDate(today.getDate() + 1);
      break;
    case 2:
      // 3 days later
      nextDate.setDate(today.getDate() + 3);
      break;
    case 3:
      // 1 week later
      nextDate.setDate(today.getDate() + 7);
      break;
    case 4:
      // 2 weeks later
      nextDate.setDate(today.getDate() + 14);
      break;
    case 5:
      // 1 month later
      nextDate.setMonth(today.getMonth() + 1);
      break;
    default:
      // Default to tomorrow
      nextDate.setDate(today.getDate() + 1);
  }
  return nextDate.toISOString().split('T')[0]; // Return in YYYY-MM-DD format
};
/**
 * Returns a formatted string describing the next review interval
 */
export const getReviewIntervalText = (level: number): string => {
  switch (level) {
    case 0:
      return 'Tomorrow';
    case 1:
      return 'Tomorrow';
    case 2:
      return '3 days';
    case 3:
      return '1 week';
    case 4:
      return '2 weeks';
    case 5:
      return '1 month';
    default:
      return 'Unknown';
  }
};
/**
 * Returns a human-readable relative date string
 */
export const getRelativeDateText = (dateString: string): string => {
  if (!dateString) return 'Not scheduled';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
  if (diffDays <= 30) return `In ${diffDays} days`;
  const months = Math.floor(diffDays / 30);
  return `In ${months} ${months === 1 ? 'month' : 'months'}`;
};