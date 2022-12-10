import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from './../users/users.service';
import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Res,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { access_token, refresh_token } =
      await this.authService.generateTokens(req.user);

    res.cookie('refresh_token', refresh_token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
    });
    return res.send({ access_token });
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);

      return user;
    } catch (error) {
      console.log('error in auth controller', error);
      if (error.driverError?.code === '23505') {
        throw new BadRequestException('Email already exist', {
          cause: new Error(),
          description: 'Some error description',
        });
      }
    }
  }

  @Get('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const { refresh_token } = req.cookies;

    const user = await this.authService.verifyRefreshToken(refresh_token);

    // generate new tokens
    // attach new refresh token to cookie
    // and return access token
    const { access_token, refresh_token: new_refresh_token } =
      await this.authService.generateTokens(user);

    res.cookie('refresh_token', new_refresh_token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
    });
    return res.send({ access_token });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async me(@Req() req: any) {
    return req.user;
  }
}
