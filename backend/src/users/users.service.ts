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
    // Determine if this should be the bootstrap operator user
    let role: any = 'USER';
    let isOperator = false;
    const userCount = await this.prisma.user.count();
    const bootstrapEmail = process.env.OPERATOR_BOOTSTRAP_EMAIL;
    const makeOperator =
      userCount === 0 || (bootstrapEmail && bootstrapEmail.toLowerCase() === email.toLowerCase());
    if (makeOperator) {
      role = 'OPERATOR';
      isOperator = true;
    }
    return this.prisma.user.create({
      data: { email, passwordHash: hash, role, isOperator },
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
