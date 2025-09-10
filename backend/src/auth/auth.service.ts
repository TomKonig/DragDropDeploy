import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { pluginManager } from '../plugins/plugin-manager';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async register(email: string, password: string) {
    const existing = await this.users.findByEmail(email);
    if (existing) throw new ConflictException('Email already registered');
    const user = await this.users.create(email, password);
  // Fire plugin hook (non-blocking best-effort)
  pluginManager.emitUserCreated({ id: user.id, email: user.email }).catch(() => {});
  return this.tokenResponse(user.id, user.email, user.role);
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
  const ok = await bcrypt.compare(password, user.passwordHash || '');
    if (!ok) throw new UnauthorizedException('Invalid credentials');
  return this.tokenResponse(user.id, user.email, user.role);
  }
  
  async me(userId: string) {
    const user = await this.users.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    const { passwordHash, ...rest } = user;
    return rest;
  }

  private tokenResponse(id: string, email: string, role: string) {
    const payload = { sub: id, email, role };
    const accessToken = this.jwt.sign(payload);
    return { accessToken, tokenType: 'Bearer', expiresIn: process.env.JWT_EXPIRES_IN || '15m' };
  }
}
