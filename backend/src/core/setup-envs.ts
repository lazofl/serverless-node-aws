import * as dotenv from 'dotenv';


export function setupEnvs() {
  dotenv.config({ path: '.env.local' });
  dotenv.config();
}