const productTable = `
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INT DEFAULT 0 CHECK (stock_quantity >= 0),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    images JSONB DEFAULT '[]', -- Array of image URLs
    rating JSONB DEFAULT '{"rate": 0, "count": 0}', -- JSON object for rating
    created_by UUID REFERENCES users(_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
export default productTable;