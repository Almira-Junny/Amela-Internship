import { Length, IsString, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Length(5, 50)
  name: string;

  @Length(5, 50)
  description: string;

  @IsDateString()
  when: string;

  @Length(5, 50)
  address: string;
}
