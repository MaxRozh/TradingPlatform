import { MongoClient } from 'mongodb';
import logger from '../logger';

const connectDB = (dbUrl: string, dbName: string, callback: Function): void => {

    MongoClient.connect(dbUrl, (err: any, database: object) => {

        if (err) {
            logger.error(`Failed to connect to MongoDB, name - ${dbName}`, err);
            process.exit(1);
            return console.error(err);
        }

        const appDB: object = database.db(dbName);

        logger.info(`Success connected to ${dbName} database.`);

        callback(appDB);
    });
};

export default connectDB;
