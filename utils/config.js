/*
 * @Description: 全局配置文件
 * @Author: LiuJia
 * @LastEditors: LiuJia
 * @Date: 2019-03-18 19:29:00
 * @LastEditTime: 2019-03-18 19:32:09
 */

const CURRENT_ENV = 'dev'; //当前环境配置, 测试环境:dev  正式环境:build
const DEV_HOST_URL = 'https://www.xxx.com'; //测试环境API地址
const BUILD_HOST_URL = 'https://www.xxx.com'; //正式环境API地址
const VERSION = '/api/v1'; //接口版本号
const HOST_URL = CURRENT_ENV === 'dev' ? `${DEV_HOST_URL}${VERSION}` : `${BUILD_HOST_URL}${VERSION}`; //API地址

module.exports = {
    HOST_URL: HOST_URL,
};