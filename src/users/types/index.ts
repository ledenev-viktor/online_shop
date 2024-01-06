import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'ivan' })
  username: string;

  @ApiProperty({ example: 'ivan1234' })
  password: string;
}

export class LoginUserResponse {
  @ApiProperty({
    example: {
      userId: 1,
      username: 'Ivan',
      password: 'ivan1234',
    },
  })
  user: {
    userId: number;
    username: string;
    password: string;
  };

  @ApiProperty({ example: 'Logged in' })
  msg: string;
}

export class LogoutUserResponse {
  @ApiProperty({ example: 'session has ended' })
  msg: string;
}

export class LoginCheckResponse {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Ivan' })
  username: string;

  @ApiProperty({ example: 'ivan@gmail.com' })
  email: string;
}

export class SignupResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'oleg' })
  username: string;

  @ApiProperty({
    example: '$2b$10$nmiG9kuNAEu/K3V8tlpneu0GwNLD5WLexwQJWU0bhRn418KofQbcW',
  })
  password: string;

  @ApiProperty({ example: 'oleg@gmail.com' })
  email: string;

  @ApiProperty({ example: '2024-01-06T09:48:41.804Z' })
  updatedAt: string;

  @ApiProperty({ example: '2024-01-06T09:48:41.804Z' })
  createdAt: string;
}
