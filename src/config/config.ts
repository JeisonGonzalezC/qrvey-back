import * as dotenv from 'dotenv';
import * as path from 'path';

// NOTE: using full path for knex cli compatibility
if (/^test$/i.test(process.env.NODE_ENV!)) {
    dotenv.config({
        path: path.join(path.dirname(__filename), '../../.env'),
    });
}else{
    dotenv.config({
        path: path.join(path.dirname(__filename), '../../../.env'),
    });
}
export default {
    PORT: process.env.PORT as string,
    DB_CONNECTION: process.env.DB_CONNECTION as string,
}