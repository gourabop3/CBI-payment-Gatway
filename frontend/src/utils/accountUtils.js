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
  if (!userId || !accountId) return "001234567890123456";
  
  // Create a consistent account number using user and account data
  const userHash = userId.slice(-4);
  const accountHash = accountId.slice(-4);
  
  // Different branch codes for different account types
  const branchCodes = {
    'savings': '0012',
    'current': '0013', 
    'salary': '0014',
    'student': '0015',
    'senior': '0016'
  };
  
  const branchCode = branchCodes[accountType.toLowerCase()] || '0012';
  const checkDigit = "34"; // Check digits
  
  return `${branchCode}${userHash}${accountHash}${checkDigit}`;
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
  
  // Format as XXXX XXXX XXXX XXXX
  return accountNumber.replace(/(.{4})/g, '$1 ').trim();
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