import { ApiProperty } from "@nestjs/swagger"

export class UpdateGroupDto {
  @ApiProperty({
    description: "group name",
    type: "string",
    required: true,
    example: "Example new name",
  })
  name: string
}
