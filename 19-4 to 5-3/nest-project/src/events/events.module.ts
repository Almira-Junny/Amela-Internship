import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventController } from './event.controller';
import { Attendee } from './attendee.entity';
import { EventsService } from './event.service';
import { AttendeesService } from './attendee.service';
import { EventAttendeesController } from './event-attendees.controller';
import { EventsOrganizedByUserController } from './event-organized-by-user.controller';
import { CurrentUserEventAttendanceController } from './current-user-event-attendance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee])],
  controllers: [
    EventController,
    EventAttendeesController,
    EventsOrganizedByUserController,
    CurrentUserEventAttendanceController,
  ],
  providers: [EventsService, AttendeesService],
})
export class EventsModule {}
