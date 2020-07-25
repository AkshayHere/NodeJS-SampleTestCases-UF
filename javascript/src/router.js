import Express from 'express';
import DataImportController from './controllers/DataImportController';
import HealthcheckController from './controllers/HealthcheckController';
import ClassStudentsController from './controllers/ClassStudentsController';
import ChangeClassNameController from './controllers/ChangeClassNameController';
import ExportWorkloadController from './controllers/ExportWorkloadController';

const router = Express.Router();

router.use('/', DataImportController);
router.use('/', HealthcheckController);
router.use('/', ClassStudentsController);
router.use('/', ChangeClassNameController);
router.use('/', ExportWorkloadController);

export default router;
