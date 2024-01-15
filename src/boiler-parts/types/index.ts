import { ApiProperty } from '@nestjs/swagger';

class BoilerParts {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Rerum tergeo.' })
  name: string;

  @ApiProperty({ example: 'Buderus' })
  boiler_manufacturer: string;

  @ApiProperty({ example: 35 })
  price: number;

  @ApiProperty({ example: 'Sensor' })
  parts_manufacturer: string;

  @ApiProperty({ example: 'R1_tHCkPrBWqykS' })
  vendor_code: string;

  @ApiProperty({
    example:
      'Defaeco apostolus tutis corrumpo civitas tametsi vehemens adversus terminatio correptius.',
  })
  description: string;

  @ApiProperty({
    example:
      '["https://loremflickr.com/640/480/technics?lock=3632097042366464","https://loremflickr.com/640/480/technics?lock=81757202284544","https://loremflickr.com/640/480/technics?lock=3573034705223680","https://loremflickr.com/640/480/technics?lock=5673246491934720","https://loremflickr.com/640/480/technics?lock=4767366906904576","https://loremflickr.com/640/480/technics?lock=818486142042112","https://loremflickr.com/640/480/technics?lock=5796210220728320"]',
  })
  images: string;

  @ApiProperty({ example: 6 })
  in_stock: string;

  @ApiProperty({ example: false })
  bestsellers: boolean;

  @ApiProperty({ example: false })
  new: boolean;

  @ApiProperty({ example: 737 })
  popularity: number;

  @ApiProperty({
    example: 'Vinitor accusamus tamisium alter temperantia valetudo vorago.',
  })
  compatibillity: string;

  @ApiProperty({ example: '2024-01-07T21:51:46.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-01-07T21:51:46.000Z' })
  updatedAt: string;
}

export class PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: BoilerParts, isArray: true })
  rows: BoilerParts;
}

export class Bestsellers extends BoilerParts {
  @ApiProperty({ example: true })
  bestsellers: boolean;
}

export class GetBestsellersResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: Bestsellers, isArray: true })
  rows: Bestsellers;
}

export class NewParts extends BoilerParts {
  @ApiProperty({ example: true })
  new: boolean;
}

export class GetNewResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: NewParts, isArray: true })
  rows: NewParts;
}

export class SearchByLetterResponse extends BoilerParts {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}

export class SearchResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: SearchByLetterResponse, isArray: true })
  rows: SearchByLetterResponse;
}
export class SearchRequest {
  @ApiProperty({ example: 'r' })
  search: string;
}

export class GetByNameResponse extends BoilerParts {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}

export class GetByNameRequest {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}

export class FindOneResponse extends BoilerParts {}

export interface IBoilerPartsQuery {
  limit: number;
  offset: number;
}
