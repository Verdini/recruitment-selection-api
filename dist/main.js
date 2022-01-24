"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.disable('x-powered-by');
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api');
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Recruitment and Selection API v1')
        .setDescription('The R&S API description')
        .setVersion('1.0.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api/v1/docs', app, document);
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map