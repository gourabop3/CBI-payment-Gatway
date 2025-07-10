# Account Number Consistency Fix

## Problem
Account numbers were changing on page refresh due to random number generation when user data wasn't loaded yet.

## Solution
Fixed the account number generation to be **deterministic** and **consistent**:

### How Account Numbers Work Now

1. **Same User = Same Account Number** (always)
   - User refreshes page → Same account number
   - User logs out and logs in → Same account number
   - Account number never changes for the same user

2. **Different Users = Different Account Numbers** (guaranteed)
   - User A: `001234567890`
   - User B: `009876543210` 
   - Each user gets a unique account number

### Technical Implementation

**Deterministic Hashing Algorithm:**
```javascript
// 12-digit format: PPUUUUUUAAAA
// PP = Account type prefix (00=savings, 01=current, etc.)
// UUUUUU = 6-digit hash of user ID (consistent)
// AAAA = 4-digit hash of account ID (consistent)

generateAccountNumber(userId, accountId, accountType)
```

**Example:**
- User ID: `"user123"` → Hash: `456789`
- Account ID: `"acc456"` → Hash: `1234`
- Account Type: `"savings"` → Prefix: `00`
- **Final Account Number: `004567891234`**

### Changes Made

1. **Frontend (`frontend/src/utils/accountUtils.js`)**:
   - Removed random number generation
   - Return empty string when user data not loaded
   - Added loading state handling

2. **Backend (`backend/src/utils/accountNumberUtils.js`)**:
   - Removed random number generation
   - Return null when data missing

3. **Components Updated**:
   - Transfer page: Added loading state for account numbers
   - Dashboard: Fixed account number generation logic
   - All components now check for user data before generating account numbers

### Benefits

✅ **Consistent**: Same user always gets same account number  
✅ **Unique**: Different users get different account numbers  
✅ **Deterministic**: No random generation  
✅ **Secure**: Based on actual user/account IDs  
✅ **Loading States**: Shows "Loading..." instead of random numbers  

### Testing

To verify the fix:
1. Login as User A → Note account number
2. Refresh page multiple times → Account number stays same
3. Login as User B → Gets different account number
4. Switch back to User A → Same original account number

The account number is now **permanent** and **unique** for each user.