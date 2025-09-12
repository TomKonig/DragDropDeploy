import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  Length,
  Matches,
  IsBoolean,
  IsArray,
  ArrayMaxSize,
  ArrayUnique,
} from "class-validator";

export class UpdateProjectDto {
  @ApiPropertyOptional({
    minLength: 1,
    maxLength: 100,
    example: "renamed-project",
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @ApiPropertyOptional({
    description: "Custom apex or subdomain",
    example: "example.com",
  })
  @IsOptional()
  @IsString()
  @Matches(
    /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(?:\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*$/,
    { message: "Invalid domain format" },
  )
  domain?: string;

  @ApiPropertyOptional({
    description: "Disable HTML/CSS/JS minification for this project",
  })
  @IsOptional()
  @IsBoolean()
  optOutMinify?: boolean;

  @ApiPropertyOptional({
    description: "Additional build CLI flags (allow-listed)",
    maxItems: 20,
    example: ["--force", "--verbose"],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ArrayUnique()
  @IsString({ each: true })
  buildFlags?: string[];
}
