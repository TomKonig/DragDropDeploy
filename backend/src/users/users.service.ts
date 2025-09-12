import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

/**
 * Data-layer service for user retrieval and creation.
 *
 * Handles bootstrap operator promotion logic for the first user or a
 * specifically designated bootstrap email (via OPERATOR_BOOTSTRAP_EMAIL).
 */
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Locate a user by email (case-sensitive by default).
   * @param email User email
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  /**
   * Fetch a user by id.
   * @param id User UUID
   */
  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  /**
   * Create a new user, hashing password and optionally elevating to operator.
   *
   * Elevation rules:
   * - If no users exist yet OR
   * - If OPERATOR_BOOTSTRAP_EMAIL matches the registering email (case-insensitive)
   * @param email New user email
   * @param password Raw password (bcrypt hashed)
   * @returns Sanitized user projection (no password hash)
   */
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
