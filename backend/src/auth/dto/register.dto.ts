import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', format: 'email' })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 6, example: 'p@ssw0rd!' })
  @IsString()
  @MinLength(6)
  password!: string;
}
