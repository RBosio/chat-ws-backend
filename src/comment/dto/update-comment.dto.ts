import { ApiProperty } from "@nestjs/swagger"

export class UpdateCommentDto {
  @ApiProperty({
    description: "comment",
    type: "string",
    required: true,
    example: "a simple comment",
  })
  comment: string
}
