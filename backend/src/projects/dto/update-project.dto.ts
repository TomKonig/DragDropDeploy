import { IsOptional, IsString, Length, Matches, IsBoolean, IsArray, ArrayMaxSize, ArrayUnique } from 'class-validator';

export class UpdateProjectDto {
	@IsOptional()
	@IsString()
	@Length(1, 100)
	name?: string;

	@IsOptional()
	@IsString()
	@Matches(/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(?:\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*$/,{ message: 'Invalid domain format' })
	domain?: string;

	@IsOptional()
	@IsBoolean()
	optOutMinify?: boolean;

		@IsOptional()
		@IsArray()
		@ArrayMaxSize(20)
		@ArrayUnique()
		@IsString({ each: true })
		buildFlags?: string[];
}
