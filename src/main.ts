import "dotenv/config"
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "./guard/auth.guard";

const port = process.env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  app.useGlobalGuards(new AuthGuard(new Reflector()))
  await app.listen(port, () => {

    console.log(`server has been online at port ${port}`)
  });
}
bootstrap();
