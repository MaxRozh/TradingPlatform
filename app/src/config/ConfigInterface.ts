interface ConfigInterface {
    mode: string,
    db: {
        host: string,
        port: number,
        name: string,
        url: string,
        username: string,
        password: string
    },
    server: {
        protocol: string,
        port: number,
        domain: string,
        url: string
    }
}

export default ConfigInterface;
