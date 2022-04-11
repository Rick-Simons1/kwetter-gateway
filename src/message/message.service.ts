import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject('User-service') private readonly messageClient: ClientProxy,
  ) {}

  async findMessageById(id: number): Promise<Observable<Message>> {
    const result = this.messageClient.send('message:find-by-id', id);
    return result;
  }

  async findMessages(): Promise<Observable<Message>> {
    return this.messageClient.send('message:find-all', {});
  }

  async postMessage(createMessageDto: CreateMessageDto): Promise<void> {
    this.messageClient.emit('message:create-message', createMessageDto);
  }

  async updateMessage(updateMessageDto: UpdateMessageDto) {
    return this.messageClient.send('message:update-message', updateMessageDto);
  }
}
