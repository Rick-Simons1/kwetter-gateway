import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.postMessage(createMessageDto);
  }

  @Get()
  findAllMessages() {
    return this.messageService.findMessages();
  }

  @Get(':id')
  findOneMessage(@Param('id') id: string) {
    return this.messageService.findMessageById(+id);
  }

  @Put()
  updateMessage(@Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.updateMessage(updateMessageDto);
  }

  // @Delete(':id')
  // removeMessage(@Param('id') id: string) {
  //   return this.messageService.remove(+id);
  // }
}
