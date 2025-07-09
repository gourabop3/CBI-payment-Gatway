/**
 * Utility functions for account number generation and formatting
 */

/**
 * Generate a realistic bank account number based on user and account data
 * @param {string} userId - User ID from database
 * @param {string} accountId - Account ID from database
 * @param {string} accountType - Type of account (savings, current, etc.)
 * @returns {string} - Formatted account number
 */
export const generateAccountNumber = (userId, accountId, accountType = 'savings') => {
  if (!userId || !accountId) return '00123';

  // 2-digit prefix based on account type (00 default)
  const prefixes = {
    savings: '00',
    current: '01',
    salary: '02',
    student: '03',
    senior: '04',
  };
  const prefix = prefixes[accountType.toLowerCase()] || '00';

  // Unique 5-digit suffix: take last 5 hex digits of accountId, convert to decimal, pad
  const raw = parseInt(accountId.slice(-5), 16); // number between 0-1,048,575
  const suffix = `${raw}`.padStart(5, '0');

  return `${prefix}${suffix}`; // Total 7 digits
};

/**
 * Generate IFSC code for the bank
 * @param {string} branchCode - Branch code
 * @returns {string} - IFSC code
 */
export const generateIFSCCode = (branchCode = '001234') => {
  return `CBIN${branchCode}`; // Central Bank of India format
};

/**
 * Format account number for display (with spaces)
 * @param {string} accountNumber - Account number
 * @returns {string} - Formatted account number
 */
export const formatAccountNumber = (accountNumber) => {
  if (!accountNumber) return '';
  
  // Group into 3-digit chunks for readability (e.g. 00 12345 ⇒ 00 123 45)
  return accountNumber.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
};

/**
 * Mask account number for security (show only last 4 digits)
 * @param {string} accountNumber - Account number
 * @returns {string} - Masked account number
 */
export const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) return '';
  
  const lastFour = accountNumber.slice(-4);
  const maskedPart = 'X'.repeat(accountNumber.length - 4);
  
  return `${maskedPart}${lastFour}`;
};

/**
 * Get account type display name
 * @param {string} accountType - Account type code
 * @returns {string} - Display name
 */
export const getAccountTypeDisplayName = (accountType) => {
  const displayNames = {
    'savings': 'Savings Account',
    'current': 'Current Account',
    'salary': 'Salary Account',
    'student': 'Student Account',
    'senior': 'Senior Citizen Account'
  };
  
  return displayNames[accountType?.toLowerCase()] || 'Savings Account';
};