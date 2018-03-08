// url前缀
export const BASE_URL = '/apiAdmin/admin/v1'
export const JWT_TOKEN_HEAD = 'Bearer '
export const JWT_HEADER = 'Authorization'
// 两位小数正则
export const RE_MONEY = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/
// 正整数
export const RE_POSITIVE_INT = /^[0-9]*$/
// 手机号码
export const RE_PHONE = /1[3|4|5|7|8|][0-9]{9}/
// 邮箱地址
export const RE_EMAIL = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
// 身份证号
export const RE_ID_CARD = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
export const CUSTOMER_SERVICE_TEL = '0431-81806110'
export const SECURITY_ADMIN_CODE = 'admin'
export const SECURITY_MENUS_CODE = 'listMenusUserId'
