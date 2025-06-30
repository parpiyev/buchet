import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
	await env();

	const app = await NestFactory.create(AppModule);
	app.use(
		['/api-swagger'],
		expressBasicAuth({
			challenge: true,
			users: {
				us: 'jdI1o3',
			},
		}),
	);

	const options = new DocumentBuilder()
		.setTitle('api documentation')
		.setVersion('1.0')
		.addTag('auth')
		.addBearerAuth(
			{
				name: 'authorization',
				type: 'apiKey',
				in: 'header',
			},
			'authorization',
		)
		.build();
	app.setGlobalPrefix('api');
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api-swagger', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	});

	const port = +process.env.HTTP_PORT || 3000;
	await app.listen(port, async () => {
		console.log('Bouquet contracts listening port: ', port);
	});
}
bootstrap();

async function env() {
	if (fs.existsSync(`${__dirname}/../.env`)) {
		console.log('has vault file:', true);
		const envLoad = dotenv.config({ path: `${__dirname}/../.env` });
		if (envLoad.error) {
			throw envLoad.error;
		}
	} else {
		console.log('has vault file:', false, fs.existsSync(`${__dirname}/../.env`));
		const envLoad = dotenv.config();
		if (envLoad.error) {
			throw envLoad.error;
		}
	}
}
