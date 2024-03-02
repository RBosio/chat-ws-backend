import { ApiProperty } from "@nestjs/swagger"

export class CreateRoomDto {
  @ApiProperty({
    description: "user id send friend request",
    type: "number",
    required: true,
    example: 1,
  })
  userSendId: number

  @ApiProperty({
    description: "user id receive friend request",
    type: "number",
    required: true,
    example: 2,
  })
  userReceiveId: number
}
