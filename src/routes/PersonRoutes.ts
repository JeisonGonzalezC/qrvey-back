import { Router } from 'express';
import { personController } from '../controllers/PersonController';

class PersonRoutes {
    public router: Router = Router();
    constructor() {
        /**
         * 
         * @returns Init routes
         */
        this.config();
    }
    config(): void {
        this.router.get('/', personController.index);
        this.router.get('/:id', personController.show);
        this.router.post('/store', personController.store);
        this.router.put('/:id', personController.update);
        this.router.delete('/:id', personController.delete);
    }
}
const personRoutes = new PersonRoutes();
export default personRoutes.router;