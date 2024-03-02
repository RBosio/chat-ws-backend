import { ApiProperty } from "@nestjs/swagger"

export class CreateCommentDto {
  @ApiProperty({
    description: "comment",
    type: "string",
    required: true,
    example: "a simple comment",
  })
  comment: string

  @ApiProperty({
    description: "user id send comment",
    type: "number",
    required: true,
    example: 1,
  })
  userSendId: number

  @ApiProperty({
    description: "user id send comment",
    type: "number",
    required: true,
    example: 2,
  })
  userReceiveId: number
}
