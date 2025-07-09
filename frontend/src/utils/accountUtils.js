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
  /*
    Scheme (12 digits):
      1-2   => account-type prefix  (00 savings, 01 current, ...)
      3-8   => numeric hash of userId  (6 digits)
      9-12  => numeric hash of accountId (4 digits)

    That gives 1 000 000 × 10 000 = 10¹⁰ possibilities per prefix – practically collision-free.
  */

  if (!userId || !accountId) return '000000000000';

  // 2-digit prefix per account type
  const prefixes = { savings:'00', current:'01', salary:'02', student:'03', senior:'04' };
  const prefix = prefixes[accountType?.toLowerCase?.()] || '00';

  // Simple numeric hash helpers (deterministic, 0-999999 / 0-9999)
  const numericHash = (str, mod) => {
    let h = 0;
    for (let i=0;i<str.length;i++) h = (h*31 + str.charCodeAt(i)) % mod;
    return h;
  };

  const userPart    = `${numericHash(userId, 1_000_000)}`.padStart(6,'0'); // 6 digits
  const accountPart = `${numericHash(accountId,     10_000)}`.padStart(4,'0'); // 4 digits

  return `${prefix}${userPart}${accountPart}`; // 12 digits total
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
  
  // Group into 4-digit chunks: 0000 0000 0000
  return accountNumber.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
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