interface ApiConfig {
    baseUrl: string;
    timeout: number;
}

interface Config {
    api: ApiConfig;
}

const config: Config = {
    api: {
        baseUrl: 'https://api.example.com', // Replace with your actual API URL
        timeout: 5000
    }
};

export default config; 