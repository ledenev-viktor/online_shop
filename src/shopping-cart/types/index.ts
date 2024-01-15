import { ApiProperty } from '@nestjs/swagger';

class ShoppingCartItem {
  @ApiProperty({ example: 26 })
  partId: number;

  @ApiProperty({ example: 2976 })
  price: number;

  @ApiProperty({ example: 2 })
  in_stock: number;

  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ example: 2976 })
  total_price: number;

  @ApiProperty({ example: 3 })
  id: number;

  @ApiProperty({ example: 3 })
  userId: number;

  @ApiProperty({ example: 'Strategist' })
  boiler_manufacturer: string;

  @ApiProperty({ example: 'Lesly' })
  parts_manufacturer: string;

  @ApiProperty({
    example: 'https://loremflickr.com/640/480/technics?lock=6802607515369472',
  })
  image: string;

  @ApiProperty({ example: 'Amaritudo ater.' })
  name: string;

  @ApiProperty({ example: '2024-01-13T10:47:57.599Z' })
  updatedAt: string;

  @ApiProperty({ example: '2024-01-13T10:47:57.599Z' })
  createdAt: string;
}

export class GetAllResponse extends ShoppingCartItem {}
export class AddToCartResponse extends ShoppingCartItem {}

export class UpdateCountResponse {
  @ApiProperty({ example: 1 })
  count: number;
}
export class UpdateCountRequest {
  @ApiProperty({ example: 1 })
  count: number;
}

export class TotalPriceResponse {
  @ApiProperty({ example: 1000 })
  total_price: number;
}
export class TotalPriceRequest {
  @ApiProperty({ example: 1000 })
  total_price: number;
}
