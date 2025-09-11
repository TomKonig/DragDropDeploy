import { Test } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService; let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();
    service = moduleRef.get(UsersService);
    prisma = moduleRef.get(PrismaService);
    // Cleanup tables
    await (prisma as any).deployment.deleteMany();
    await (prisma as any).project.deleteMany();
    await (prisma as any).user.deleteMany();
  });

  it('first created user becomes operator', async () => {
    const u = await service.create('first@example.com', 'Password123!');
    expect(u.role).toBe('OPERATOR');
    expect(u.isOperator).toBe(true);
  });

  it('second user is plain USER', async () => {
    const u = await service.create('second@example.com', 'Password123!');
    expect(u.role).toBe('USER');
    expect(u.isOperator).toBe(false);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
