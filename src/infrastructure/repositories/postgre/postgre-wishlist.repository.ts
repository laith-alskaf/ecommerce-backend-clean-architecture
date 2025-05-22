import Database from "../../database/postgreSQL";

export class WishlistRepository {
    private db = Database.getInstance().getPool();

    async createWishlist(userId: string, productsId: string[]): Promise<any> {
        const query = `
            INSERT INTO wishlists (user_id, products_id)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const result = await this.db.query(query, [userId, productsId]);
        return result.rows[0];
    }

    async getWishlistByUserId(userId: string): Promise<any> {
        const query = `
            SELECT * FROM wishlists
            WHERE user_id = $1;
        `;
        const result = await this.db.query(query, [userId]);
        return result.rows[0];
    }

    async updateWishlist(userId: string, productsId: string[]): Promise<any> {
        const query = `
            UPDATE wishlists
            SET products_id = $1, updated_at = CURRENT_TIMESTAMP
            WHERE user_id = $2
            RETURNING *;
        `;
        const result = await this.db.query(query, [productsId, userId]);
        return result.rows[0];
    }

    async deleteWishlist(userId: string): Promise<any> {
        const query = `
            DELETE FROM wishlists
            WHERE user_id = $1;
        `;
        await this.db.query(query, [userId]);
        return { message: "Wishlist deleted successfully" };
    }
}