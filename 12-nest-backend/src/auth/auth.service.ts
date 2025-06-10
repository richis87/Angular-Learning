import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './Interfaces/jwt-payload';

import { RegisterUserDto } from './dto';
import { LoginResponse } from './Interfaces/login-response';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
  

      const {password, ...userData} = createUserDto;

      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password,10),
        ...userData
      })


      await newUser.save();

      const { password:_, ...user } = newUser.toJSON();

      return user;

    } catch (error) {
      if (error.code === 11000) {
        // console.log(error)
        throw new BadRequestException(`${createUserDto.email} alredy exists`);
      }
      throw new InternalServerErrorException('Something terrible happends!!!');
    }

    //1-Encriptar la contraseña

    //2-Guardar el usuario

    //3-Generar el JWT
  }


  async register(registerUserDto: RegisterUserDto):Promise<LoginResponse>{

    const user = await this.create(registerUserDto);



    return{
      user: user,
      token: this.getJwtToken({id: user._id})
    }



  }




  async login(loginDto: LoginDto) : Promise<LoginResponse>{
    /**
     * User {_id, name, email, roles, }
     * Token -> ASFDS.DFDSFSF.FS
     */

    console.log(loginDto);

    const { email, password } = loginDto;

    const user = await this.userModel.findOne ({email});

    if (!user){
      throw new UnauthorizedException('Not valid credentials - email');
    }

    if (!bcryptjs.compareSync(password, user.password)){
      throw new UnauthorizedException('Not valid credentials - password');
    }

    const { password:_, ...rest } = user.toJSON();


    return{
      //...rest,
      user: rest,
      token: this.getJwtToken({id: user.id})
    }

  

  }


  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById(id: string){
    const user = await this.userModel.findById(id);
    const {password, ...rest} = user.toJSON();
    return rest;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken( payload: JwtPayload  ){
    const token = this.jwtService.sign(payload);
    return token;
  }



}
