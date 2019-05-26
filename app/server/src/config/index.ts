import ConfigInterface from './ConfigInterface';

const dbHost: string = process.env.DB_HOST || 'localhost';
const dbPort: number = process.env.DB_PORT || 27017;
const serverProtocol: string = process.env.SERVER_PROTOCOL || "http";
const serverPort: number = process.env.SERVER_PORT || 8088;

const devConfig: ConfigInterface = {
    mode: 'dev',
    db: {
        host: dbHost,
        port: dbPort,
        name: process.env.DB_NAME || 'fast-choose',
        url: `mongodb://${dbHost}:${dbPort}/`,
        username: process.env.DB_USER_NAME || '',
        password: process.env.DB_USER_PASS || ''
    },
    server: {
        protocol: serverProtocol,
        port: serverPort,
        domain: `localhost:${serverPort}`,
        url: `${serverProtocol}://localhost:${serverPort}`
    }
};

const prodConfig: ConfigInterface = {
    mode: 'production',
    db: {
        host: dbHost,
        port: dbPort,
        name: process.env.DB_NAME || 'fast-choose',
        url: `mongodb://${dbHost}:${dbPort}/`,
        username: process.env.DB_USER_NAME || '',
        password: process.env.DB_USER_PASS || ''
    },
    server: {
        protocol: serverProtocol,
        port: serverPort,
        domain: `localhost:${serverPort}`,
        url: `${serverProtocol}://localhost:${serverPort}`
    }
};

export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
