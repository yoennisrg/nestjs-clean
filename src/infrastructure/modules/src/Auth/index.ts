import { JwtAuthGuard, Public, IS_PUBLIC_KEY } from './auth/jwt-auth.guard'
import { JwtStrategy } from './auth/jwt.strategy'
import { Scopes, SCOPES_KEY } from './auth/scopes.decorator'
import { ScopesGuard } from './auth/scopes.guard'
import { logger } from './utils/logger.middleware'
import { IJWTPayload } from './types/JWT'
import { JWTPayload } from './auth/jwt.decorator'

export * from './auth/roles.guard'
export * from './auth/contexts.guard'

export {
  JwtAuthGuard,
  Public, 
  IS_PUBLIC_KEY, 
  JwtStrategy, 
  Scopes, 
  SCOPES_KEY, 
  ScopesGuard, 
  logger,
  JWTPayload,
  IJWTPayload
}
