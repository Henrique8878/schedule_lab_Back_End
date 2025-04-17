export interface typeUser {
  id: string
  name: string
  email: string
  password_hash: string
  category: string
  created_at: string
}

export interface EmailVerificationRepository {
  create(email: string, newUser: typeUser): Promise<void>
}
