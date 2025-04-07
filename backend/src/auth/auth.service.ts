
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
        countryCode: user.countryCode,
        phone: user.phone
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string, firstName: string, lastName: string, country: string, countryCode: string, phone: string) {
    const user = await this.usersService.create({
      email,
      password,
      firstName,
      lastName,
      country,
      countryCode,
      phone
    });
    
    const { password: _, ...result } = user;
    return result;
  }
}
