import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './input/create.user.dto';

@Controller('/users')
export class UserController {
  constructor(
    private readonly authService: AuthService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  async create(@Body() input: CreateUserDto) {
    const user = new User();

    if (input.password !== input.retypedPassword) {
      throw new BadRequestException('Password is not the same');
    }

    const existUser = await this.userRepository.findOne({
      where: [{ email: input.email }, { username: input.username }],
    });

    if (existUser) {
      throw new BadRequestException('Email or username is already taken');
    }

    user.username = input.username;
    user.password = await this.authService.hashPassword(input.password);
    user.email = input.email;
    user.firstName = input.firstName;
    user.lastName = input.lastName;

    return {
      ...(await this.userRepository.save(user)),
      token: this.authService.getTokenForUser(user),
    };
  }
}
