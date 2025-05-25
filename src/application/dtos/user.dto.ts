export interface RegisterDTO {
    email: string,
    userName: string,
    password: string,
    role: 'customer' | 'admin' | 'superAdmin',
}

export interface LoginDTO {
    email: string,
    password: string,
}

export interface ChangePasswordDTO {
    email: string,
    newPassword: string,
}

export interface ForgotPasswordDTO {
    email: string
}
export interface VerifyEmailDTO {
    code: string
}

export interface UserInfoDTO {
    userName: string,
    email: string,
    role: "customer" | "admin" | "superAdmin"
}

export interface SecretTokenDTO {
    token: string,
    age: string,
}
