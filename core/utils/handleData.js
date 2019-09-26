/**
 * 处理数据库返回的数据
 */
function getFirstRow (dbData) {
  if (dbData.error_no) {
    return dbData;
  }
  if (dbData === '') {
    return '';
  }
  return dbData[0];
}

module.exports = {
  getFirstRow
}