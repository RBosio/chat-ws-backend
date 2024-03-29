import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const PORT = process.env.PORT || 3000

  app.enableCors({
    credentials: true,
    origin: true,
  })

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("ChatApp")
    .setDescription("Social application")
    .setVersion("1.0")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  await app.listen(PORT, () => {
    console.log("Server listen on port", PORT)
  })
}
bootstrap()
