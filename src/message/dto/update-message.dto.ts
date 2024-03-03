import { ApiProperty } from "@nestjs/swagger"

export class UpdateMessageDto {
  @ApiProperty({
    description: "message",
    type: "string",
    required: true,
    example: "a simple message",
  })
  message: string
}
