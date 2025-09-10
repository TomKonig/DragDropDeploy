import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(email: string, password: string) {
    const hash = await bcrypt.hash(password, 12);
    return this.prisma.user.create({
      data: { email, passwordHash: hash },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        isOperator: true,
        displayName: true,
      },
    });
  }
}
