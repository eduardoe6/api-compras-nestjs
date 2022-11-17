import { User } from './entities/user.entity';
import {
  Injectable,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const product = this.userRepository.create(createUserDto);

    return await this.userRepository.save(product);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'photo'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException();

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new NotFoundException();

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const person = await this.userRepository.findOne({ where: { id } });

    if (!person) throw new NotFoundException();

    await this.userRepository.update(id, { ...updateUserDto });

    return this.userRepository.create({ ...person, ...updateUserDto });
  }

  async remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const person = await this.userRepository.findOne({ where: { id } });

    if (!person) throw new NotFoundException();

    await this.userRepository.delete(id);

    return `A pessoa com id ${id} foi deletada com sucesso!`;
  }
}
