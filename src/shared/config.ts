const headers = {
	app_id: process.env.AUTH_SERVICE_APP_ID || '766eb748-e61d-4d03-bc87-f167786276ba',
	app_secret:
		process.env.AUTH_SERVICE_APP_SECRET ||
		'5Y83aVD5TzZh98A6RvejVMNsjUZCXTpLVqbNwhMCKGd66F7Y2tnnahrPYrzHdv8JcLHqLnBmvSYEHQUZgY3nB5geFPaHH4wSKVKqD5YV6TFntFdrWmmr5pTN5mvbEamj',
};

export const config = {
	CURVE_NAME: 'secp521r1',
	AUTH_SERVICE: {
		headers,
		host: process.env.AUTH_SERVICE_HOST || 'localhost',
		port: process.env.AUTH_SERVICE_PORT || 1201,
	},
};
