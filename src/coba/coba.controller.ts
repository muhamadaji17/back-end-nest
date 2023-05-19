import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CobaService } from './coba.service';
import { CreateCobaDto } from './dto/create-coba.dto';
import { UpdateCobaDto } from './dto/update-coba.dto';

@Controller('coba')
export class CobaController {
  constructor(private readonly cobaService: CobaService) {}

  @Post()
  create(@Body() createCobaDto: CreateCobaDto) {
    return this.cobaService.create(createCobaDto);
  }

  @Get()
  findAll() {
    return this.cobaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cobaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCobaDto: UpdateCobaDto) {
    return this.cobaService.update(+id, updateCobaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cobaService.remove(+id);
  }
}
