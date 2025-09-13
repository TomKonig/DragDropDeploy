import { SetMetadata } from "@nestjs/common";
export const ROLES_KEY = "roles";
// Constrain role to known literals; allow extension through declaration merging if needed.
export type Role = "USER" | "ADMIN" | "OPERATOR";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
