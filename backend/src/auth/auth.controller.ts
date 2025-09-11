import { Body, Controller, Post, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  @Public()
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto.email, dto.password);
  }

  @Post('login')
  @Public()
  // Rate limiting now handled solely by RateLimitMiddleware (see AppModule.configure).
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }
  
  @Get('me')
  me(@Req() req: any) {
    return this.auth.me(req.user.sub);
  }
}
