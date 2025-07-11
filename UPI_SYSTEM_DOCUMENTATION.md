# MyBank UPI System Documentation

## Overview
This is a comprehensive UPI (Unified Payments Interface) system built specifically for MyBank. It provides instant payment capabilities, QR code generation, and seamless money transfers within the bank's ecosystem.

## Features

### 🎯 Core Features
- **Instant Payments**: Send and receive money instantly using UPI IDs
- **QR Code Payments**: Generate and scan QR codes for quick payments
- **Transaction History**: Complete history of all UPI transactions
- **Real-time Balance Updates**: Account balances update instantly after transactions
- **UPI ID Management**: Automatic UPI ID generation for all bank customers

### 🔧 Technical Features
- **Database Transactions**: ACID-compliant transaction processing
- **Input Validation**: Comprehensive validation for all payment inputs
- **Error Handling**: Robust error handling with meaningful messages
- **Security**: Secure API endpoints with JWT authentication
- **Scalability**: Built with MongoDB for horizontal scaling

## UPI ID Format
All customers get a unique UPI ID in the format: `username@mybank`

Examples:
- `john@mybank`
- `priya@mybank`
- `rajesh123@mybank` (if 'rajesh@mybank' already exists)

## API Endpoints

### Authentication
All UPI endpoints require JWT authentication via `Authorization: Bearer <token>` header.

### 1. Get UPI Information
```
GET /api/upi/info
```
Returns user's UPI ID, name, balance, and account details.

**Response:**
```json
{
  "msg": "UPI info retrieved",
  "upi_info": {
    "upi_id": "john@mybank",
    "name": "John Doe",
    "balance": 50000,
    "account_type": "saving"
  }
}
```

### 2. Generate QR Code
```
GET /api/upi/qr?amount=1000&note=Payment for services
```
Generates a UPI QR code for receiving payments.

**Response:**
```json
{
  "msg": "UPI QR generated",
  "upi_id": "john@mybank",
  "qr": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "upi_url": "upi://pay?pa=john@mybank&pn=John%20Doe&am=1000&tn=Payment%20for%20services&cu=INR",
  "amount": 1000,
  "note": "Payment for services"
}
```

### 3. Process Payment
```
POST /api/upi/pay
Content-Type: application/json

{
  "recipient_upi": "priya@mybank",
  "amount": 1000,
  "note": "Lunch payment"
}
```

**Response:**
```json
{
  "msg": "Payment processed successfully",
  "transaction_id": "64f7a123b456c789d012e345",
  "amount": 1000,
  "sender_upi": "john@mybank",
  "recipient_upi": "priya@mybank",
  "status": "success",
  "timestamp": "2023-09-06T10:30:00.000Z",
  "note": "Lunch payment"
}
```

### 4. Validate UPI ID
```
GET /api/upi/validate/priya@mybank
```

**Response:**
```json
{
  "msg": "UPI ID is valid",
  "valid": true,
  "user": {
    "name": "Priya Sharma",
    "upi_id": "priya@mybank"
  }
}
```

### 5. Get Transaction History
```
GET /api/upi/transactions?page=1&limit=10
```

**Response:**
```json
{
  "msg": "UPI transactions retrieved",
  "transactions": [
    {
      "amount": 1000,
      "type": "debit",
      "remark": "UPI payment to Priya Sharma (priya@mybank)",
      "createdAt": "2023-09-06T10:30:00.000Z",
      "sender_upi": "john@mybank",
      "recipient_upi": "priya@mybank",
      "isSuccess": true
    }
  ],
  "currentPage": 1,
  "totalPages": 1,
  "totalTransactions": 1
}
```

### 6. Get UPI Limits
```
GET /api/upi/limits
```

**Response:**
```json
{
  "msg": "UPI limits retrieved",
  "limits": {
    "daily_limit": 100000,
    "per_transaction_limit": 50000,
    "monthly_limit": 1000000,
    "remaining_daily_limit": 99000,
    "remaining_monthly_limit": 999000
  }
}
```

## Frontend Implementation

### UPI Page Features
1. **Payment Tab**: Send money to other UPI IDs
2. **Receive Tab**: Generate QR codes for receiving payments
3. **History Tab**: View all UPI transaction history

### Components
- **UPI Info Card**: Shows user's UPI ID and current balance
- **Payment Form**: Form to send money with recipient validation
- **QR Generator**: Generate payment QR codes with optional amount
- **Transaction List**: Paginated list of UPI transactions

## Database Schema

### User Model Updates
```javascript
upi_id: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
}
```

### Transaction Model Updates
```javascript
// UPI specific fields
sender_upi: {
    type: String,
    trim: true
},
recipient_upi: {
    type: String,
    trim: true
},
upi_transaction_id: {
    type: String,
    trim: true
},
type: {
    type: String,
    enum: ['credit','debit','fix_deposit', 'atm_withdrawal', 'atm_deposit', 'upi_transfer']
},
transferType: {
    type: String,
    enum: ['NEFT', 'RTGS', 'IMPS', 'UPI']
}
```

## Security Features

### 1. Transaction Integrity
- MongoDB transactions ensure ACID compliance
- Automatic rollback on any failure during payment processing

### 2. Input Validation
- UPI ID format validation using regex
- Amount validation (positive numbers only)
- Recipient existence validation before payment

### 3. Authentication
- JWT token-based authentication
- All endpoints protected with auth middleware

### 4. Error Handling
- Comprehensive error messages
- Graceful handling of insufficient balance
- Invalid UPI ID detection

## Payment Flow

### Sending Money
1. User enters recipient UPI ID and amount
2. System validates recipient UPI ID existence
3. System checks sender's balance
4. Database transaction begins
5. Amount debited from sender's account
6. Amount credited to recipient's account
7. Transaction records created for both users
8. Transaction committed
9. Success response sent

### QR Code Generation
1. User optionally enters amount and note
2. System generates UPI URL with bank's format
3. QR code generated from UPI URL
4. Base64 encoded image returned to frontend

## Error Codes and Messages

| Error Code | Message | Description |
|------------|---------|-------------|
| 400 | Invalid amount | Amount must be positive |
| 400 | Insufficient balance | Sender doesn't have enough balance |
| 404 | User or UPI handle not found | Sender UPI ID not found |
| 404 | Recipient UPI ID not found | Recipient doesn't exist |
| 400 | Invalid UPI ID format | UPI ID doesn't match required format |

## Testing

### Test UPI IDs
When users register, they automatically get UPI IDs like:
- `testuser@mybank`
- `admin@mybank`
- `customer123@mybank`

### Test Scenarios
1. **Successful Payment**: Send money between valid UPI IDs
2. **Insufficient Balance**: Try to send more than available balance
3. **Invalid Recipient**: Send money to non-existent UPI ID
4. **QR Generation**: Generate QR codes with and without amounts
5. **Transaction History**: View paginated transaction history

## Future Enhancements

### Planned Features
1. **UPI Mandate**: Recurring payment setup
2. **UPI Collect**: Request money from other users
3. **Merchant Payments**: Special merchant QR codes
4. **Transaction Limits**: Configurable per-user limits
5. **Notification System**: Real-time payment notifications
6. **UPI PIN**: Additional security layer
7. **Split Bills**: Divide payments among multiple users

### Technical Improvements
1. **Rate Limiting**: API rate limiting for security
2. **Caching**: Redis caching for frequently accessed data
3. **Audit Logs**: Detailed transaction audit trails
4. **Analytics**: Payment analytics and reporting
5. **Mobile App**: Native mobile app integration

## Deployment Notes

### Environment Variables
```
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
```

### Database Indexes
Ensure these indexes exist for optimal performance:
```javascript
// User collection
db.users.createIndex({ "upi_id": 1 }, { unique: true, sparse: true })

// Transaction collection
db.transactions.createIndex({ "user": 1, "createdAt": -1 })
db.transactions.createIndex({ "sender_upi": 1 })
db.transactions.createIndex({ "recipient_upi": 1 })
```

## Support

For technical support or feature requests, contact the development team.

---

**MyBank UPI System v1.0**  
Built with ❤️ for seamless digital payments