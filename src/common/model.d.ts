export type AccountType = 'electricityAccount' | 'gasAccount'

export type HistoryItem = {
  record: Record
  date: Date
}

export type Record = {
  day: string
  night: string
}

export type RecordHistoryType = 'electricityHistory' | 'waterHistory' | 'gasHistory'

export type UserItemModel = {
  id: string
  username: string
  avatarUrl?: string
  address: string
  electricityAccount?: string
  gasAccount?: string
  electricityHistory?: HistoryItem[]
  waterHistory?: HistoryItem[]
  gasHistory?: HistoryItem[]
}

export type UserModel = {
  id: number
  email: string
  users: UserItem[]
}
