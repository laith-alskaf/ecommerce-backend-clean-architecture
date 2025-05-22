import Database from "../../database/postgreSQL/index";

export class CartRepository {
    private db = Database.getInstance().getPool();

    async createCart(userId: string, items: any[]): Promise<any> {
        const query = `
            INSERT INTO carts (user_id)
            VALUES ($1)
            RETURNING id;
        `;
        const result = await this.db.query(query, [userId]);
        const cartId = result.rows[0].id;

        for (const item of items) {
            await this.db.query(
                `
                INSERT INTO cart_items (cart_id, product_id, quantity)
                VALUES ($1, $2, $3);
                `,
                [cartId, item.productId, item.quantity]
            );
        }

        return this.getCartByUserId(userId);
    }

    async getCartByUserId(userId: string): Promise<any> {
        const query = `
            SELECT c.id as cart_id, c.user_id, ci.product_id, ci.quantity
            FROM carts c
            LEFT JOIN cart_items ci ON c.id = ci.cart_id
            WHERE c.user_id = $1;
        `;
        const result = await this.db.query(query, [userId]);
        return result.rows;
    }

    async updateCart(userId: string, items: any[]): Promise<any> {
        const cart = await this.getCartByUserId(userId);
        if (!cart.length) throw new Error("Cart not found");

        const cartId = cart[0].cart_id;

        // Delete existing items
        await this.db.query(
            `
            DELETE FROM cart_items
            WHERE cart_id = $1;
            `,
            [cartId]
        );

        // Insert new items
        for (const item of items) {
            await this.db.query(
                `
                INSERT INTO cart_items (cart_id, product_id, quantity)
                VALUES ($1, $2, $3);
                `,
                [cartId, item.productId, item.quantity]
            );
        }

        return this.getCartByUserId(userId);
    }

    async deleteCart(userId: string): Promise<any> {
        const query = `
            DELETE FROM carts
            WHERE user_id = $1;
        `;
        await this.db.query(query, [userId]);
        return { message: "Cart deleted successfully" };
    }
}