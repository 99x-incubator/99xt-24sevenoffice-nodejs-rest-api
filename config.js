import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  console.log(
    'Development enviornment detected, loading enviornment variables from .env file.'
  );
  config();
}

export const core = {
  APP_NAME: process.env.APP_NAME || 'Server',
  APP_PORT: process.env.APP_PORT || 5000,
  ENABLED: process.env.ENABLED || 1,
  API_APP_ID: process.env.API_APP_ID || '00000000-0000-0000-0000-000000000000', // 24SevenOffice APP ID
  APPLICATION_SECRET: process.env.APPLICATION_SECRET || 'secret', // Application secret that is needed to authenticate JWT token
};

export function healthcheckHandler(req, res) {
  res.status(200).send({ done: 'true' });
}

export function appInit(app, { ENABLED, APP_NAME, APP_PORT }) {
  if (ENABLED) {
    app.listen(APP_PORT);
    console.log(`Application "${APP_NAME}" is running on port ${APP_PORT}`);
  } else {
    console.log(`"${APP_NAME}" App is disabled.`);
  }
}
