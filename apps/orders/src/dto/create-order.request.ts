import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
} from 'class-validator';

export class CreateOrderRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  price: number;

  @IsPhoneNumber()
  phoneNumber: string;
}
