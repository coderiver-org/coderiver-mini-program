/*
 * @Description: app.js
 * @Author: LiuJia
 * @LastEditors: LiuJia
 * @Date: 2019-03-18 19:28:49
 * @LastEditTime: 2019-03-18 20:02:24
 */

const core = require('utils/core.js');

App({

    /**
     * @description: onLaunch
     * @param {type} 
     */
    onLaunch(options) {
        
    },


    /**
     * @description: onShow
     * @param {type} 
     */
    onShow(options) {
      core.keepScreenOn(); //当保持手机屏幕常亮
      core.checkUpdata(); //检测小程序更新
    },


    /**
     * @description: 引用js文件
     * @param {String} fileName:utils目录下的js文件名称
     * @return: fileName.js
     */
    requirejs: function (fileName) {
        return require(`utils/${fileName}.js`);
    },

});