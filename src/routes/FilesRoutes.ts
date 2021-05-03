import { Router } from 'express';
import { personController } from '../controllers/PersonController';

class PersonRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    /**
     * 
     * @returns Download excel and pdf
     */
    config(): void {
        this.router.get('/', personController.excel);
        this.router.get('/pdf', personController.pdf);
    }
}
const personRoutes = new PersonRoutes();
export default personRoutes.router;