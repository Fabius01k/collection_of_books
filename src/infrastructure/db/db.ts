import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function connectToDatabase() {
    try {
        await prisma.$connect();
        console.log('Connected successfully to PostgreSQL database');
    } catch (e) {
        console.error('Failed to connect to the database', e);
        process.exit(1);
    }
}

export default prisma;