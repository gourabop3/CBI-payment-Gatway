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
const generateAccountNumber = (userId, accountId, accountType = 'savings') => {
  if (!userId || !accountId) {
    return '';
  }

  // 2-digit prefix per account type
  const prefixes = { savings:'00', current:'01', salary:'02', student:'03', senior:'04' };
  const prefix = prefixes[accountType?.toLowerCase?.()] || '00';

  // Simple numeric hash helpers (deterministic, 0-999999 / 0-9999)
  const numericHash = (str, mod) => {
    let h = 0;
    for (let i=0;i<str.length;i++) h = (h*31 + str.charCodeAt(i)) % mod;
    return h;
  };

  const userPart    = `${numericHash(userId.toString(), 1_000_000)}`.padStart(6,'0'); // 6 digits
  const accountPart = `${numericHash(accountId.toString(),     10_000)}`.padStart(4,'0'); // 4 digits

  return `${prefix}${userPart}${accountPart}`; // 12 digits total
};

/**
 * Format account number for display (with spaces)
 * @param {string} accountNumber - Account number
 * @returns {string} - Formatted account number
 */
const formatAccountNumber = (accountNumber) => {
  if (!accountNumber) return '';
  
  // Group into 4-digit chunks: 0000 0000 0000
  return accountNumber.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

module.exports = {
  generateAccountNumber,
  formatAccountNumber
};