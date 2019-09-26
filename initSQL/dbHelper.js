/**
 * 连接数据库
 */
const mysql = require('mysql');
const mariadb = require('../config/mariadb.conf');

/**
 * getMariadbConf主要用来返回一个对象(配置sql连接信息)
 */
const dbConnectionString = mariadb.getMariadbConf();
let pool = null;
/**
 * 连接数据库
 */
function connect () {
  pool = mysql.createPool(Object.assign(dbConnectionString, { connectionLimit: 10 }));
};

connect();

function exeScript (sqlType, sql, params) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, result) => {
      if (error) {
        logger.error(sqlType + ': ' + error);
        reject(error);
      }
      resolve(results);
    });
  });
}

async function callExeScript (sqlType, sql, params) {
  let result;
  result = await exeScript(sqlType, sql, params);
  return result;
}

/**
 * query 查找数据
 */
async function query (sql, params) {
  const result = await callExeScript('query', sql, params);
  if (result.error_no) {
    return result;
  }
  if (result.length >= 1) {
    return result;
  } else {
    return '';
  }
}

async function insert (sql, params) {
  const result = await callExeScript('insert', sql, params);
  if (result.error_no) {
    return result;
  }
  return result;
}

module.exports = {
  query,
  insert
}