import { Pool } from "pg";
import { UserRepository } from "../../../domain/repository/user.repository";
import { IUser } from "../../../domain/entity/user";
import Database from "../../database/postgreSQL";

export class PostgresUserRepository implements UserRepository {
    private db: Pool;

    constructor() {
        this.db = Database.getInstance().getPool();
    }

    async create(user: Partial<IUser>): Promise<IUser> {
        const query = `
            INSERT INTO users (email, password, user_name, role, last_login, is_email_verified, otp_code, otp_code_expires)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const values = [
            user.email,
            user.password,
            user.userName,
            user.role || "customer",
            user.lastLogin || new Date(),
            user.isEmailVerified || false,
            user.otpCode || null,
            user.otpCodeExpires || null,
        ];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async findById(id: string): Promise<IUser | null> {
        const query = `SELECT * FROM users WHERE _id = $1;`;
        const result = await this.db.query(query, [id]);
        return result.rows[0] || null;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        const query = `SELECT * FROM users WHERE email = $1;`;
        const result = await this.db.query(query, [email]);
        return result.rows[0] || null;
    }

    async findByCode(code: string): Promise<IUser | null> {
        const query = `SELECT * FROM users WHERE otp_code = $1;`;
        const result = await this.db.query(query, [code]);
        return result.rows[0] || null;
    }

    async update(userId: string, userData: Partial<IUser>): Promise<IUser | null> {
        const fields = Object.keys(userData).map((key, index) => `"${key}" = $${index + 2}`).join(", ");
        const values = Object.values(userData);
        const query = `
            UPDATE users
            SET ${fields}, updated_at = CURRENT_TIMESTAMP
            WHERE _id = $1
            RETURNING *;
        `;
        const result = await this.db.query(query, [userId, ...values]);
        return result.rows[0] || null;
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM users WHERE _id = $1;`;
        await this.db.query(query, [id]);
    }

    async findByRole(role: string): Promise<IUser | null> {
        const query = `SELECT * FROM users WHERE role = $1;`;
        const result = await this.db.query(query, [role]);
        return result.rows[0] || null;
    }
}