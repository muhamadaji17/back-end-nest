import { Injectable } from '@nestjs/common';
import { CreateLogoutDto } from './dto/create-logout.dto';
import { UpdateLogoutDto } from './dto/update-logout.dto';
import { users } from 'models';

@Injectable()
export class LogoutService {
  create(createLogoutDto: CreateLogoutDto) {
    // const data = users.destroy({
    //   where:{

    //   }
    // })
  }

  findAll() {
    return `This action returns all logout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logout`;
  }

  update(id: number, updateLogoutDto: UpdateLogoutDto) {
    return `This action updates a #${id} logout`;
  }

  remove(id: number) {
    return `This action removes a #${id} logout`;
  }
}
