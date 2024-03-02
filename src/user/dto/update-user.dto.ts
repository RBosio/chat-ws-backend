import { ApiProperty } from "@nestjs/swagger"

export class UpdateUserDto {
  @ApiProperty({
    description: "user name",
    type: "string",
    required: false,
    example: "bruce",
  })
  name?: string

  @ApiProperty({
    description: "user surname",
    type: "string",
    required: false,
    example: "wayne",
  })
  surname?: string

  @ApiProperty({
    description: "user password",
    type: "string",
    required: false,
    example: "$uperp4ssw0rd",
  })
  password?: string
}
