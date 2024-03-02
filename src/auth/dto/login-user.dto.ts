import { ApiProperty } from "@nestjs/swagger"

export class LoginUserDto {
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
