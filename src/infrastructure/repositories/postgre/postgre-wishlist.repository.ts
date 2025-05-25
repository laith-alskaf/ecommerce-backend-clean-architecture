import { Pool } from "pg";
import { IWishlist } from "../../../domain/entity/wishlist";
import { WishlistRepository } from "../../../domain/repository/wishlist.repository";
import Database from "../../database/postgreSQL/index";

export class PostgresWishlistRepository implements WishlistRepository {
    private db: Pool;

    constructor() {
        this.db = Database.getInstance().getPool();
    }

    async create(userId: string): Promise<IWishlist> {
        const query = `
            INSERT INTO wishlists (user_id, products_id)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const values = [userId, []]; // Initialize with an empty array for products
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async findById(userId: string): Promise<IWishlist | null> {
        const query = `
            SELECT * FROM wishlists
            WHERE user_id = $1;
        `;
        const result = await this.db.query(query, [userId]);
        if (result.rows.length === 0) return null;

        // Convert PostgreSQL array to IWishlist format
        return {
            userId: result.rows[0].user_id,
            productsId: result.rows[0].products_id,
        };
    }

    async add(userId: string, productId: string): Promise<void> {
        const query = `
            UPDATE wishlists
            SET products_id = array_append(products_id, $1)
            WHERE user_id = $2 AND NOT (products_id @> ARRAY[$1]::uuid[]);
        `;
        await this.db.query(query, [productId, userId]);
    }

    async removeProdut(userId: string, productId: string): Promise<void> {
        const query = `
            UPDATE wishlists
            SET products_id = array_remove(products_id, $1)
            WHERE user_id = $2;
        `;
        await this.db.query(query, [productId, userId]);
    }

    async removeAllProdut(userId: string): Promise<void> {
        const query = `
            UPDATE wishlists
            SET products_id = '{}'
            WHERE user_id = $1;
        `;
        await this.db.query(query, [userId]);
    }
}