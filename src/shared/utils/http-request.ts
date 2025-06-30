import * as http from 'http';

export const parseBody = (request: http.IncomingMessage) => {
	return new Promise<Buffer>((resolve, reject) => {
		const chunks = [];
		request.on('data', (chunk) => chunks.push(chunk));
		request.on('end', () => resolve(Buffer.concat(chunks)));
		request.on('error', reject);
	});
};

export const httpRequest = (method: string, url: string, body?: Buffer) => {
	return new Promise<Buffer>((resolve, reject) => {
		const client = http.request(url, { method }, async (response) => {
			const body = await parseBody(response);
			if (response.statusCode >= 200 && response.statusCode < 300) {
				resolve(body);
			} else {
				reject(body.toString());
			}
		});
		client.on('error', reject);
		client.end(body);
	});
};
