import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { validate } from 'class-validator';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthorizationGuard)
  @Post()
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    validate(createMessageDto, { validationError: { target: false } }).then(
      (errors) => {
        if (errors.length > 0) {
          console.log('validation failed. errors: ', errors);
        } else {
          console.log('validation succeed');
          return this.messageService.postMessage(createMessageDto);
        }
      },
    );
  }

  @UseGuards(AuthorizationGuard)
  @Get()
  findAllMessages() {
    return this.messageService.findMessages();
  }

  @UseGuards(AuthorizationGuard)
  @Get('all/:userId')
  findAllMessagesByUserId(@Param('userId') userId: string) {
    return this.messageService.findMessagesByUserId(userId);
  }

  @UseGuards(AuthorizationGuard)
  @Get(':id')
  findOneMessage(@Param('id') id: string) {
    return this.messageService.findMessageById(+id);
  }

  @UseGuards(AuthorizationGuard)
  @Put()
  updateMessage(@Body() updateMessageDto: UpdateMessageDto) {
    console.log(updateMessageDto);
    validate(updateMessageDto, { validationError: { target: false } }).then(
      (errors) => {
        if (errors.length > 0) {
          console.log('validation failed. errors: ', errors);
        } else {
          console.log('validation succeed');
          return this.messageService.updateMessage(updateMessageDto);
        }
      },
    );
  }
}
