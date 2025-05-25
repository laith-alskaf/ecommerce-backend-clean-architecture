import { Pool } from "pg";
import { ICategory } from "../../../domain/entity/category";
import { CategoryRepository } from "../../../domain/repository/category.repository";
import Database from "../../database/postgreSQL/index";

export class PostgresCategoryRepository implements CategoryRepository {
    private db: Pool;

    constructor() {
        this.db = Database.getInstance().getPool();
    }

    async allCategory(): Promise<ICategory[] | null> {
        const query = `
            SELECT * FROM categories;
        `;
        const result = await this.db.query(query);
        return result.rows || null;
    }

    async create(category: Partial<ICategory>): Promise<void> {
        const query = `
            INSERT INTO categories (name, description, created_by)
            VALUES ($1, $2, $3);
        `;
        const values = [
            category.name,
            category.description || null,
            category.createdBy,
        ];
        await this.db.query(query, values);
    }

    async delete(id: string): Promise<void> {
        const query = `
            DELETE FROM categories
            WHERE id = $1;
        `;
        await this.db.query(query, [id]);
    }

    async update(id: string, category: Partial<ICategory>): Promise<ICategory | null> {
        const fields = Object.keys(category).map((key, index) => `"${key}" = $${index + 2}`).join(", ");
        const values = Object.values(category);
        const query = `
            UPDATE categories
            SET ${fields}, updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING *;
        `;
        const result = await this.db.query(query, [id, ...values]);
        return result.rows[0] || null;
    }

    async findById(id: string): Promise<ICategory | null> {
        const query = `
            SELECT * FROM categories
            WHERE id = $1;
        `;
        const result = await this.db.query(query, [id]);
        return result.rows[0] || null;
    }
}