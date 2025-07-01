import connectDatabase from '#config/db';
import env from '#config/env';
import server from '#config/server';
import { createDbIfNotPresent } from '#utils/general';
import chalk from 'chalk';

await createDbIfNotPresent();
/** Connect to MongoDB Database ***/
connectDatabase()
	.then(() => {
		server.listen(env.SERVER_PORT, () => {
			console.log(chalk.green(`Server is running on http://localhost:${env.SERVER_PORT}`));
		});
	})
	/** When connection failed to connect, it will throw an error */
	.catch((error) => {
		console.log('Could not connect to database', error);
	});

function shutdown(signal) {
	console.log(chalk.yellow(`\n${signal} received, shutting down server...`));
	server.close((err) => {
		if (err) {
			console.error(chalk.red('Error during shutdown:'), err);
			process.exit(1);
		}
		console.log(chalk.blueBright('✅ Server closed gracefully.'));
		process.exit(0);
	});
}

['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach((signal) => {
	process.on(signal, () => shutdown(signal));
});
