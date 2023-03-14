import { Injectable, CanActivate, ExecutionContext, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export enum Context {
    Price = 'prices',
    Promotion = 'promotions',
  }

  const userContexts: Context[] = [];
export const CONTEXTS_KEY = 'contexts';
export const Contexts = (...contexts: Context[]) => SetMetadata(CONTEXTS_KEY, contexts);
  
@Injectable()
export class ContextsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredContexts = this.reflector.getAllAndOverride<Context[]>(CONTEXTS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredContexts) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if(Array.isArray(user?.contexts)){
      (user?.contexts || []).forEach((context: Context) => {

         if(requiredContexts.includes(context)){
            userContexts.push(context);
         }
      })
    }
    
    if(requiredContexts.length !== userContexts.length) {
      throw new UnauthorizedException('User does not provide the context authorized to access this resource');
    }

    return true;
  }
}

