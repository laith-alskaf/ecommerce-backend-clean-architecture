const userTable = `
CREATE TABLE users (
    _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'customer',
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_email_verified BOOLEAN DEFAULT FALSE,
    otp_code VARCHAR(255),
    otp_code_expires TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
export default userTable;