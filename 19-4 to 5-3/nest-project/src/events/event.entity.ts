import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attendee } from './attendee.entity';
import { User } from 'src/auth/user.entity';
import { Expose } from 'class-transformer';
import { PaginationResult } from 'src/pagination/paginator';

@Entity('event')
export class Event {
  constructor(partial: Partial<Event>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  description: string;

  @Column()
  @Expose()
  when: Date;

  @Column({
    type: 'varchar',
    length: 300,
  })
  @Expose()
  address: string;

  @DeleteDateColumn()
  @Expose()
  deletedAt?: Date;

  @OneToMany(() => Attendee, (attendee) => attendee.event, {
    cascade: true,
  })
  @Expose()
  attendees: Attendee[];

  @ManyToOne(() => User, (user) => user.organized)
  @JoinColumn({
    name: 'organizerId',
  })
  @Expose()
  organizer: User;

  @Column({ nullable: true })
  organizerId: number;
}

export type PaginatedEvents = PaginationResult<Event>;
