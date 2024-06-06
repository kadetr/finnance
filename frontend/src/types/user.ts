export interface User {
  _id?: string
  email: string
  password: string
  token?: string
}

export interface UserData {
  email: string
  token?: string
}

export interface UserInfo {
  user: UserData
}

export interface Credentials{
  email: string
  password: string
}

export type UserAction = {
  type: string
  payload?: User
}
