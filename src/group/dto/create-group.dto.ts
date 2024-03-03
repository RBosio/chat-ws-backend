import { ApiProperty } from "@nestjs/swagger"

export class CreateGroupDto {
  @ApiProperty({
    description: "group name",
    type: "string",
    required: true,
    example: "Example name",
  })
  name: string
}
