import 'dotenv/config'

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  TYPEORM_HOST: string | undefined;
  TYPEORM_PORT: number | undefined;
  TYPEORM_USERNAME: string | undefined;
  TYPEORM_PASSWORD: string | undefined;
  TYPEORM_DATABASE: string | undefined;
  TESTING_HOST: string | undefined;
  TESTING_PORT: number | undefined;
  TESTING_USERNAME: string | undefined;
  TESTING_PASSWORD: string | undefined;
  TESTING_DATABASE: string | undefined;
}

interface Config {

  TYPEORM_HOST: string;
  TYPEORM_PORT: number;
  TYPEORM_USERNAME: string;
  TYPEORM_PASSWORD: string;
  TYPEORM_DATABASE: string;
  TESTING_HOST: string;
  TESTING_PORT: number;
  TESTING_USERNAME: string;
  TESTING_PASSWORD: string;
  TESTING_DATABASE: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    TYPEORM_HOST: process.env.TYPEORM_HOST,
    TYPEORM_PORT: process.env.TYPEORM_PORT ? Number(process.env.TYPEORM_PORT) : undefined,
    TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
    TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
    TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
    TESTING_HOST: process.env.TESTING_HOST,
    TESTING_PORT: process.env.TESTING_PORT ? Number(process.env.TESTING_PORT) : undefined,
    TESTING_USERNAME: process.env.TESTING_USERNAME,
    TESTING_PASSWORD: process.env.TESTING_PASSWORD,
    TESTING_DATABASE: process.env.TESTING_DATABASE
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
