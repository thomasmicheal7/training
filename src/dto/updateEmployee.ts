import { IsNotEmpty, IsEmail, IsString, ValidateNested, IsOptional } from "class-validator";
import { AddressDto } from "./createAddress.dto";
import "reflect-metadata";
import { Type } from "class-transformer";
export class UpdateEmployeeDto {
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  address?: AddressDto;
}




