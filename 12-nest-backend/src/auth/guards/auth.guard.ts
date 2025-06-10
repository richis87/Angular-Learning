import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ){}


  async canActivate(context: ExecutionContext, ):Promise<boolean>{

    // Obtiene la información del request
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    // console.log(request);
    // console.log({token: token});

    if (!token) {
      throw new UnauthorizedException('There is not Bearer Token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SEED
        }
      );

      const user = await this.authService.findUserById(payload.id);
      if (!user) throw new UnauthorizedException('User does not exists');
      if (!user.isActive) throw new UnauthorizedException('User is not active');


      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = user;

    } catch {
      throw new UnauthorizedException();
    }
    return true;

    
    return Promise.resolve(true);

  }


  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
