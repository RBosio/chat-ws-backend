import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty({
    description: "user name",
    type: "string",
    required: true,
    example: "bruce",
  })
  name: string

  @ApiProperty({
    description: "user surname",
    type: "string",
    required: true,
    example: "wayne",
  })
  surname: string

  @ApiProperty({
    description: "user email",
    type: "string",
    required: true,
    example: "example@gmail.com",
  })
  email: string

  @ApiProperty({
    description: "user password",
    type: "string",
    required: true,
    example: "$uperp4ssw0rd",
  })
  password: string
}
