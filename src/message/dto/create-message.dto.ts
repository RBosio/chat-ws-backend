import { ApiProperty } from "@nestjs/swagger"

export class CreateMessageDto {
  @ApiProperty({
    description: "message",
    type: "string",
    required: true,
    example: "a simple message",
  })
  message: string

  @ApiProperty({
    description: "group id send message",
    type: "number",
    required: true,
    example: 1,
  })
  groupId: number

  @ApiProperty({
    description: "user id send message",
    type: "number",
    required: true,
    example: 1,
  })
  userSendId: number

  @ApiProperty({
    description: "user id send message",
    type: "number",
    required: true,
    example: 2,
  })
  userReceiveId: number
}
