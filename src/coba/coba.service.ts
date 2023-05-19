import { Injectable } from '@nestjs/common';
import { CreateCobaDto } from './dto/create-coba.dto';
import { UpdateCobaDto } from './dto/update-coba.dto';
import { coba } from 'models';
import { v4 as uuidv4} from 'uuid'

@Injectable()
export class CobaService {
  create(createCobaDto: CreateCobaDto) {
    const data = coba.create({
      id: uuidv4(),
      name: createCobaDto.name
    })
    return data
  }

  findAll() {
    return `This action returns all coba`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coba`;
  }

  update(id: number, updateCobaDto: UpdateCobaDto) {
    return `This action updates a #${id} coba`;
  }

  remove(id: number) {
    return `This action removes a #${id} coba`;
  }
}
