import server from './app';
import connectDB from './db';
import config from './config';
import logger from './logger';

const start = (): void => {

    const app = (appDb: any) => {

        console.log(`  App is running at http://localhost:${config.server.port} in ${process.env.NODE_ENV || config.mode} mode`);
        console.log('  Press CTRL-C to stop\n');

        logger.info(`Server started in ${process.env.NODE_ENV || config.mode} mode.`);

        // console.log('connected', appDb);
    };

    connectDB(config.db.url, config.db.name, app);

    // let port = await server.start(process.env.PORT || config.server.port);
};

start();

export default start;
