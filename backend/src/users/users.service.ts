import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { PrismaService } from "../prisma/prisma.service";

// Lightweight in-module interfaces to give explicit structure without relying on generated Prisma types.
// They mirror the current Prisma schema fields used by this service.
interface DBUser {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  passwordHash: string | null;
  role: string;
  isOperator: boolean;
  displayName: string | null;
}

export interface UserPublic {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  isOperator: boolean;
  displayName: string | null;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string): Promise<DBUser | null> {
    return this.prisma.user.findUnique({
      where: { email },
    }) as unknown as Promise<DBUser | null>;
  }

  findById(id: string): Promise<DBUser | null> {
    return this.prisma.user.findUnique({
      where: { id },
    }) as unknown as Promise<DBUser | null>;
  }

  async create(email: string, password: string): Promise<UserPublic> {
    const hash = await bcrypt.hash(password, 12);
    let role: "USER" | "ADMIN" | "OPERATOR" = "USER";
    let isOperator = false;
    const userCount = await this.prisma.user.count();
    const bootstrapEmail = process.env.OPERATOR_BOOTSTRAP_EMAIL;
    const makeOperator =
      userCount === 0 ||
      (bootstrapEmail && bootstrapEmail.toLowerCase() === email.toLowerCase());
    if (makeOperator) {
      role = "OPERATOR";
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
    }) as unknown as UserPublic;
  }
}
