import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { users } from 'models';
import { Roles } from 'src/guard/metaData';

@Injectable()
export class LoginService {
  // constructor(private readonly jwtService:JwtService){}
  create(createLoginDto: CreateLoginDto) {
    return 'This action adds a new login';
  }

  async Login(createLoginDto: CreateLoginDto): Promise<any>{
    try {
      const username = createLoginDto.username
      const password = createLoginDto.password
  
      const user = await users.findOne({
        where:{
          username: username
        }
      })
      if(user == null){
        throw new Error('Username not found')
      }
      const compare = await bcrypt.compare(password, user.password)
      if(!compare){
        throw new Error('Password not be match')
      }
      const accessToken = jwt.sign({username: user.username, roles:user.roles}, process.env.SECRET_KEY, {
        expiresIn: 3600
      })
      return {
        message: 'Berhasil',
        Token: accessToken
            } 
      
    } catch (error) {
      return error.message
    }

  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
