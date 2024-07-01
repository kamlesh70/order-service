import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class addAddressDTO {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
