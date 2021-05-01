import express from 'express';
import config from '../src/config/config';
import cors from 'cors';
// Routes
import PersonRoutes from './routes/PersonRoutes';
import FilesRoutes from './routes/FilesRoutes';

class Applicaction {
    app: express.Application;

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        /**
         * 
         * Settings port and cors
         */
        this.app.set('port', config.PORT || 3001);
        this.app.use(cors())
    }

    middlewares() {
        /**
         * 
         * Use Json Return API
         */
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
    }

    routes() {
        /**
         * 
         * Routes API
         */
        this.app.use('/person', PersonRoutes);
        this.app.use('/files', FilesRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('>>> Server is running at', this.app.get('port'));
        });
    }
}

export default Applicaction;