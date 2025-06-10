import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from './entities/user.entity';
import { scheduled } from 'rxjs';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [ 

    ConfigModule.forRoot(), 

    MongooseModule.forFeature([{
      name:User.name,
      schema: UserSchema
    }]),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    }),

  ]
})
export class AuthModule {}
