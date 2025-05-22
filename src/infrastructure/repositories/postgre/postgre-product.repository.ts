import { Pool } from "pg";
import Database from "../../database/postgreSQL";
import { ProductRepository } from "../../../domain/repository/product.repository";
import { IProduct } from "../../../domain/entity/product";

export class PostgresProductRepository implements ProductRepository {
    private db: Pool;

    constructor() {
        this.db = Database.getInstance().getPool();
    }

    async create(product: Partial<IProduct>): Promise<void> {
        const query = `
            INSERT INTO products (title, description, price, stock_quantity, category_id, images, rating, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `;
        const values = [
            product.title,
            product.description || null,
            product.price,
            product.stockQuantity || 0,
            product.categoryId || null,
            JSON.stringify(product.images || []),
            JSON.stringify(product.rating || { rate: 0, count: 0 }),
            product.createdBy || null,
        ];
        await this.db.query(query, values);
    }

    async findById(id: string): Promise<IProduct | null> {
        const query = `SELECT * FROM products WHERE id = $1;`;
        const result = await this.db.query(query, [id]);
        return result.rows[0] || null;
    }

    async findByCategoryId(categoryId: string): Promise<IProduct[] | null> {
        const query = `SELECT * FROM products WHERE category_id = $1;`;
        const result = await this.db.query(query, [categoryId]);
        return result.rows || null;
    }

    async allProduct(page: number, limit: number, filter: {}): Promise<{ products: IProduct[], total: number } | null> {
        const offset = (page - 1) * limit;
        const query = `
            SELECT * FROM products
            WHERE ($1::jsonb IS NULL OR (title ILIKE '%' || $1->>'title' || '%'))
            LIMIT $2 OFFSET $3;
        `;
        const countQuery = `SELECT COUNT(*) FROM products;`;
        const result = await this.db.query(query, [JSON.stringify(filter), limit, offset]);
        const countResult = await this.db.query(countQuery);
        return {
            products: result.rows,
            total: parseInt(countResult.rows[0].count, 10),
        };
    }

    async findByUserId(page: number, limit: number, filter: any): Promise<{ products: IProduct[], total: number } | null> {
        const offset = (page - 1) * limit;
        const query = `
            SELECT * FROM products
            WHERE created_by = $1
            LIMIT $2 OFFSET $3;
        `;
        const countQuery = `SELECT COUNT(*) FROM products WHERE created_by = $1;`;
        const result = await this.db.query(query, [filter.userId, limit, offset]);
        const countResult = await this.db.query(countQuery, [filter.userId]);
        return {
            products: result.rows,
            total: parseInt(countResult.rows[0].count, 10),
        };
    }

    async update(productId: string, productData: Partial<IProduct>): Promise<IProduct | null> {
        const fields = Object.keys(productData).map((key, index) => `"${key}" = $${index + 2}`).join(", ");
        const values = Object.values(productData);
        const query = `
            UPDATE products
            SET ${fields}, updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING *;
        `;
        const result = await this.db.query(query, [productId, ...values]);
        return result.rows[0] || null;
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM products WHERE id = $1;`;
        await this.db.query(query, [id]);
    }
}