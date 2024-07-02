import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class addAddressDTO {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  address: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
