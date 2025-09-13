import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as jwt from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";

function buildVerifier() {
  const primary = process.env.JWT_SIGNING_SECRET || process.env.JWT_SECRET; // backward compat
  if (!primary) throw new Error("JWT_SIGNING_SECRET or JWT_SECRET must be set");
  const rawList = process.env.JWT_VERIFICATION_SECRETS || primary;
  const secrets = Array.from(
    new Set(
      rawList
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  );
  return { primary, secrets };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private secrets: string[];
  constructor() {
    const { secrets } = buildVerifier();
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secrets[0], // Passport requires a value; we'll override validate for multi-key
      passReqToCallback: true,
    });
    this.secrets = secrets;
  }

  // Passport calls validate with (req, payload) because passReqToCallback=true; no awaits needed.
  validate(
    req: { headers?: Record<string, unknown> },
    payload: Record<string, unknown>,
  ) {
    const tokenExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();
    const token = tokenExtractor(req as unknown as Request);
    if (!token) throw new UnauthorizedException("Missing token");
    for (const secret of this.secrets) {
      try {
        jwt.verify(token, secret); // throws if invalid/expired
        return payload; // payload already validated by passport-jwt basic checks
      } catch {
        /* continue */
      }
    }
    throw new UnauthorizedException("Invalid token");
  }
}
