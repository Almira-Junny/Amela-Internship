import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateEventDto } from './input/update-event.dto';
import { Event } from './event.entity';
// import { MoreThan, Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
import { EventsService } from './event.service';
import { ListEvents } from './input/list.events';
import { AuthGuardJwt } from 'src/auth/auth-guard.jwt';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('/events')
@SerializeOptions({ strategy: 'excludeAll' })
export class EventController {
  private readonly logger = new Logger(EventController.name);

  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() filter: ListEvents) {
    const events =
      await this.eventsService.getEventsWithAttendeeCountFilteredPaginated(
        filter,
        {
          total: true,
          currentPage: filter.page,
          limit: 10,
        },
      );
    return events;
  }

  @Get('/practice')
  async practice() {
    // return await this.repository.find({
    //   where: {
    //     id: MoreThan(3),
    //   },
    // });
  }

  @Get('/practice2/:id')
  async practice2() {
    // const event = await this.repository.findOne({
    //   where: {
    //     id: id,
    //   },
    //   relations: ['attendees'],
    // });
    // return event;
    // const event = await this.repository.findOne({
    //   where: {
    //     id: id,
    //   },
    // });
    // const attendee = new Attendee();
    // attendee.name = 'Test';
    // attendee.event = event;
    // await this.attendeeRepository.save(attendee);
    // return event;
    // return await this.repository
    //   .createQueryBuilder('e')
    //   .select(['e.id', 'e.name'])
    //   .orderBy('e.id', 'ASC')
    //   .take(3)
    //   .getMany();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getEvent(@Param('id', ParseIntPipe) id): Promise<Event | undefined> {
    const event = await this.eventsService.getEventWithAttendeeCount(id);

    if (!event) {
      throw new NotFoundException('Not found this id');
    }

    return event;
  }

  @Post()
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() input, @CurrentUser() user) {
    return await this.eventsService.createEvent(input, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateEvent(
    @Param('id', ParseIntPipe) id,
    @Body() input: UpdateEventDto,
    @CurrentUser() user,
  ) {
    const event = await this.eventsService.findOne(id);

    if (!event) {
      throw new NotFoundException('Not found this id');
    }

    if (event.organizerId !== user.id) {
      throw new ForbiddenException(
        'You are not authorized to change this event',
      );
    }

    return await this.eventsService.updateEvent(event, input);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuardJwt)
  async deleteEvent(@Param('id', ParseIntPipe) id, @CurrentUser() user) {
    const event = await this.eventsService.findOne(id);

    if (!event) {
      throw new NotFoundException();
    }

    if (event.organizerId !== user.id) {
      throw new ForbiddenException(
        `You are not authorized to remove this event`,
      );
    }

    await this.eventsService.deleteEvent(id);
  }
}
