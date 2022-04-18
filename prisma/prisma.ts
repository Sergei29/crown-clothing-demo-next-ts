import { PrismaClient } from "@prisma/client"

export class PrismaClientSingleton extends PrismaClient {
  static instance: PrismaClient
  static getInstance(): PrismaClient {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClient()
    }
    return PrismaClientSingleton.instance
  }
}
