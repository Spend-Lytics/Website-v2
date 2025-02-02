interface User {
  id: string
  name: string
  email: string
  password: string
  dateOfBirth: string
  postcode: string
  country: string
  address: string
  mobileNumber: string
}

class InMemoryDB {
  private users: User[] = []

  async createUser(userData: Omit<User, "id">): Promise<User> {
    const id = Math.random().toString(36).substr(2, 9)
    const user = { id, ...userData }
    this.users.push(user)
    return user
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email)
  }

  async findUserById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id)
  }
}

export const db = new InMemoryDB()

