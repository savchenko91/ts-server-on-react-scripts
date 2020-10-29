/* eslint-disable max-classes-per-file */
// import * as md5 from 'md5'

import { Column, CreatedAt, Model, Table, UpdatedAt, Unique, AllowNull, Validate, DataType } from 'sequelize-typescript'

import { UserModel } from '@/common/model'

import * as jwt from 'jsonwebtoken'

import * as bcrypt from 'bcryptjs'

interface TokenResponse {
  token: string
  refreshToken: string
  user: User
}

export interface Record {
  day: string
  night: string
}

export interface HistoryItem {
  record: Record
  date: Date
}

@Table({ modelName: 'users' })
export class User extends Model implements UserModel {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.NUMBER,
  })
  public id!: number

  @Validate({
    isEmail: {
      msg: 'Email has invalid format',
    },
  })
  @AllowNull(false)
  @Unique({
    name: 'UniqEmail',
    msg:
      'This email is already taken%&please choose another one or try to login. If you forget a password try to recover it',
  })
  @Column(DataType.STRING)
  public email!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  public password!: string

  @CreatedAt
  @Column(DataType.DATE)
  public readonly createdAt!: Date

  @UpdatedAt
  @Column(DataType.DATE)
  public readonly updatedAt!: Date

  public validatePassword(password: string): boolean {
    // TODO hash
    // const test = bcrypt.compareSync(password, this.password)
    // console.log(test, password, this.password)
    return bcrypt.compareSync(password, this.password)
  }

  public hashPassword(): void {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
  }

  public generateJWT(): TokenResponse {
    const today = new Date()
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() + 60)
    const { id } = this

    const token = jwt.sign({ id }, process.env.JWT_SECRET || '', { expiresIn: '1h' })
    const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET || '', { expiresIn: '37d' })

    return {
      token,
      refreshToken,
      user: this,
    }
  }
}
