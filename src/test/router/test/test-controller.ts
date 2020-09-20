import { TestDB, test_dao, DaoType  } from '../../dao';
import { ResponseUtils } from '@service-fw';
import Joi from '@hapi/joi';


export async function addTest(ctx) {
  const addTest: TestDB = {
    id: null,
    name: null
  };
  const testModelKeys = Object.keys(addTest);
  testModelKeys.forEach(item => {
    if (ctx.request.body[item] !== undefined) {
      addTest[item] = ctx.request.body[item];
    } else {
      delete addTest[item];
    }
  });
  
  // 验证参数
  const schema = Joi.object({
    name: Joi.number().required(),
  });
  const validateResult = schema.validate({
    name: addTest.name
  });
  if (validateResult.error) {
    ctx.body = ResponseUtils.error<any>({ error_no: 100150 });
    return;
  }
  // 添加数据
  const addTestRes = await test_dao.insert(addTest);
  const getTest: DaoType<TestDB> = {
    model: {id: addTestRes}
  };
  const getTestRes = await test_dao.getTest(getTest);
  // 返回添加的数据
  ctx.body = ResponseUtils.normal<any>({ data: getTestRes });
}