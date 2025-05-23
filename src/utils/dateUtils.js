/**
 * Utility functions for date handling in the Science AI Platform
 */

// Parse date format (e.g. "June 2025" or "2025-06")
function parseDate(dateStr) {
  if (!dateStr) return new Date();
  
  // Handle different date formats
  if (dateStr.includes('-')) {
    // Format: "2025-06"
    const [year, month] = dateStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1);
  } else {
    // Format: "June 2025"
    const parts = dateStr.split(' ');
    if (parts.length === 2) {
      const month = getMonthNumber(parts[0]);
      const year = parseInt(parts[1]);
      return new Date(year, month);
    }
  }
  
  return new Date();
}

// Get month number from name
function getMonthNumber(monthName) {
  const months = {
    'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
    'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
  };
  return months[monthName.toLowerCase()] || 0;
}

// Format date as "Month Year"
function formatDate(date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Get date after adding specified months to a date string
function getDateAfterMonths(timelineStr, months) {
  try {
    const startDate = parseDate(timelineStr.split('to')[0].trim());
    startDate.setMonth(startDate.getMonth() + months);
    return formatDate(startDate);
  } catch (e) {
    return "TBD";
  }
}

export const dateUtils = {
  parseDate,
  formatDate,
  getDateAfterMonths
};