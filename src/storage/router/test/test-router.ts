import Router from 'koa-router';
import * as test_controller from './test-controller';

const router = new Router();
router.prefix('/');

/**
 * @api {POST} /test 添加test
 * @apiDescription 添加test
 * @apiVersion 1.0.0
 * @apiName test
 * @apiGroup test
 *
 * @apiParam (body) {string} id id
 * @apiParam (body) {string} [name] name
 */
router.post('/test', test_controller.addTest);

export default router;