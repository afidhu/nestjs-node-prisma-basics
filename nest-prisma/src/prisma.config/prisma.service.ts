/*
https://nestjs.com
*/
import "dotenv/config";
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  constructor() {
    // 1. Initialize the native PostgreSQL driver adapter
    const adapter = new PrismaPg({ 
      connectionString: process.env.DATABASE_URL 
    });

    // 2. Pass the adapter instance directly down to the parent PrismaClient constructor
    super({ adapter });
  }

  // Connect to the PostgreSQL database when the module initializes
  async onModuleInit() {
    await this.$connect();
  }

  // Gracefully disconnect from the database when the application shuts down
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
