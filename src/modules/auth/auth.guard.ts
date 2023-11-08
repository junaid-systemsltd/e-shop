// Libs
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
// Modules
import { AuthService } from '@auth/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const { authorization }: any = request.headers;

            if (!authorization || authorization.trim() === '') {
                throw new UnauthorizedException('Please provide token');
            }


            const authToken = authorization.replace(/bearer/gim, '').trim();

            const resp = await this.authService.validateToken(authToken);

            request.user = resp;

            return true;

        } catch (error) {
            throw new ForbiddenException(error.message || 'session expired! Please sign In');
        }
    }
}