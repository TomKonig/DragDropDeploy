import { IsOptional, IsString, Length, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
	@ApiProperty({ minLength: 1, maxLength: 100, example: 'my-static-site' })
	@IsString()
	@Length(1, 100)
	name!: string;

	@ApiPropertyOptional({ description: 'Custom apex or subdomain', example: 'example.com' })
	@IsOptional()
	@IsString()
	@Matches(/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(?:\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*$/,{ message: 'Invalid domain format' })
	domain?: string;
}
