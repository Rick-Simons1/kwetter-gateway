import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Message-service',
        transport: Transport.TCP,
        options: {
          port: 5002,
        },
      },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
