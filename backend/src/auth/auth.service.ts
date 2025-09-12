import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { pluginManager } from '../plugins/plugin-manager';

/**
 * Authentication and token issuance service.
 *
 * Responsibilities:
 * - User registration (first user bootstrap to operator handled in UsersService)
 * - Credential validation and JWT access token creation
 * - Lightweight user profile retrieval (without password hash)
 *
 * Notes:
 * - Refresh tokens are not yet implemented; callers must re-auth after expiry.
 * - Emits a best-effort plugin hook on user creation; failures are swallowed to avoid blocking auth flow.
 */
@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  /**
   * Register a new user by email + password.
   *
   * @param email Unique user email
   * @param password Raw password (will be hashed in UsersService)
   * @throws ConflictException if email already exists
   * @returns Access token response for immediate authentication
   */
  async register(email: string, password: string) {
    const existing = await this.users.findByEmail(email);
    if (existing) throw new ConflictException('Email already registered');
    const user = await this.users.create(email, password);
  // Fire plugin hook (non-blocking best-effort)
  pluginManager.emitUserCreated({ id: user.id, email: user.email }).catch(() => {});
  return this.tokenResponse(user.id, user.email, user.role);
  }

  /**
   * Validate credentials and issue an access token.
   *
   * @param email User email
   * @param password Raw password for comparison
   * @throws UnauthorizedException on invalid credentials
   * @returns Access token response including expiry metadata
   */
  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
  const ok = await bcrypt.compare(password, user.passwordHash || '');
    if (!ok) throw new UnauthorizedException('Invalid credentials');
  return this.tokenResponse(user.id, user.email, user.role);
  }
  
  /**
   * Retrieve a sanitized user profile (excludes password hash).
   *
   * @param userId Authenticated subject identifier (UUID)
   * @throws UnauthorizedException if user not found (treat as stale token)
   */
  async me(userId: string) {
    const user = await this.users.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    const { passwordHash, ...rest } = user;
    return rest;
  }

  /**
   * Build a normalized token response payload for auth endpoints.
   *
   * @param id User id (JWT subject)
   * @param email User email
   * @param role Current role
   * @internal Implementation detail shared by register/login.
   */
  private tokenResponse(id: string, email: string, role: string) {
    const payload = { sub: id, email, role };
    const accessToken = this.jwt.sign(payload);
    return { accessToken, tokenType: 'Bearer', expiresIn: process.env.JWT_EXPIRES_IN || '15m' };
  }
}
