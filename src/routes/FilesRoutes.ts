import { Router } from 'express';
import { personController } from '../controllers/PersonController';

class PersonRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    /**
     * 
     * @returns Download excel
     */
    config(): void {
        this.router.get('/', personController.excel);
    }
}
const personRoutes = new PersonRoutes();
export default personRoutes.router;