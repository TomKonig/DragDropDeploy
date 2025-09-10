import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateProjectDto {
	@IsString()
	@Length(1, 100)
	name!: string;

	@IsOptional()
	@IsString()
	@Matches(/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(?:\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*$/,{ message: 'Invalid domain format' })
	domain?: string;
}
