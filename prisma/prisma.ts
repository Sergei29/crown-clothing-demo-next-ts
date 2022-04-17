import { PrismaClient } from "@prisma/client"

export class PrismaClientSingle extends PrismaClient {
  static instance: PrismaClient
  static getInstance(): PrismaClient {
    if (!PrismaClientSingle.instance) {
      PrismaClientSingle.instance = new PrismaClient()
    }
    return PrismaClientSingle.instance
  }
}
