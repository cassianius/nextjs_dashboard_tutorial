
export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

// export const generateYAxis = (revenue: Revenue[]) => {
//   // Calculate what labels we need to display on the y-axis
//   // based on highest record and in 1000s
//   const yAxisLabels = [];
//   const highestRecord = Math.max(...revenue.map((month) => month.revenue));
//   const topLabel = Math.ceil(highestRecord / 1000) * 1000;

//   for (let i = topLabel; i >= 0; i -= 1000) {
//     yAxisLabels.push(`$${i / 1000}K`);
//   }

//   return { yAxisLabels, topLabel };
// };

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If total pages is 7 or less
  // [1, 2, 3, 4, 5, 6, 7]
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If current page is among the first 3 pages
  // [1, 2, 3, "...", 15, 16, 17]
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If current page is among the last 3 pages
  // [1, 2, 3, "...", 15, 16, 17]
  if (currentPage >= totalPages - 2) {
    return [1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If current page is somewhere in the middle
  // [1, "...", 13, 14, 15, "...", 17]
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};



// Shared utility functions
export const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'published':
      return 'bg-green-900 text-green-200';
    case 'inactive':
      return 'bg-gray-700 text-gray-200';
    case 'draft':
      return 'bg-yellow-700 text-gray-200';
    default:
      return 'bg-gray-700 text-gray-200';
  }
};

export const formatStatus = (status: string) => {
  return status
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function capitalize(str: string): string {
  if (!str) return ''; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}
