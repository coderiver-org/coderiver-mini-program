/*
 * @Description: 核心方法
 * @Author: LiuJia
 * @LastEditors: LiuJia
 * @Date: 2019-03-18 19:28:49
 * @LastEditTime: 2019-03-18 20:01:39
 */

const config = require('./config.js'); //引入config.js



/**
 * @description: 函数方法中参数校验,如果没有传参,则抛出错误
 * @param {type}
 */
const required = () => {
    throw new Error('参数不完整');
};



/**
 * @description: 小程序检测更新
 * @param {type} 
 */
const checkUpdata = () => {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
        //console.log(res);
    });
    updateManager.onUpdateReady(function () {
        wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，点击确定重启应用',
            showCancel: false, //不显示'取消'按钮
            success: function (res) {
                if (res.confirm) {
                    updateManager.applyUpdate();
                }
            }
        });
    });
    updateManager.onUpdateFailed(function () {});
};


/**
 * @description: get请求
 * @param {String} url 接口地址
 * @param {Object} params 请求参数
 */
const get = (url, params) => {
    const promise = new Promise((resolve, reject) => {
        wx.request({
            url: `${config.HOST_URL}${url}`,
            method: 'GET',
            data: params,
            header: {
                'content-type': 'application/json'
            },
            dataType: 'json',
            success: resolve,
            fail: reject,
        });
    });
    return promise;
};



/**
 * @description: post请求
 * @param {String} url 接口地址
 * @param {Object} params 请求参数
 */
const post = (url, params) => {
    const promise = new Promise((resolve, reject) => {
        wx.request({
            url: `${config.HOST_URL}${url}`,
            method: 'POST',
            data: params,
            header: {
                'Accept': 'application/json',
                'content-type': 'application/json',
            },
            dataType: 'json',
            success: resolve,
            fail: reject,
        });
    });
    return promise;
};



/**
 * @description: 获取url中特定参数的值
 * @param {String} 必填 url 链接地址
 * @param {String} 必填 name 参数名称
 * @return {String} 参数的值
 */
const getQueryByName = (url = required(), name = required()) => {
    const reg = new RegExp(`[?&]${name}=([^&#]+)`);
    const query = url.match(reg);
    return query ? query[1] : null;
};



/**
 * @description: 11位手机号码正则表达式
 * @param {String} phone 手机号码
 * @return {Booleans} true 手机号码正确 false 手机号码错误
 */
const phoneReg = (phone = required()) => {
    const re = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (re.test(phone)) {
        return true;
    } else {
        return false;
    }
};



/**
 * @description: 返回上一页
 * @param {Number} num 返回上一级页面的页面数,不传参的情况下,默认为1
 * @param {Number} time 等待多少毫秒返回上一页,不填写的情况下默认为0
 */
const back = (num, time) => {
    const _num = num || 1;
    const _time = time || 0;

    setTimeout(function () {
        wx.navigateBack({
            delta: _num,
        });
    }, _time);
};


/**
 * @description: 保留数字小数点后N位, 如N=2时, 3.1415处理后为 3.14 , 8.7896处理后位8.78
 * @param {Number/String} 必填 num 原数字
 * @param {Number} 必填 digit 想保留小数点后几位
 * @return {Number/String} finallNum 处理过的新数字
 */
const numFixed = (num = required(), digit = required()) => {
    const tempNum = String(num);
    const tempDigit = Number(digit);
    const re = new RegExp(`([0-9]+\.[0-9]{${tempDigit}})[0-9]*`);
    const finallNum = Number(tempNum.replace(re, "$1"));
    return finallNum;
};



/**
 * @description: showModal
 * @param {String} 必填 title 模态窗标题
 * @param {String} 必填 content 模态窗提示内容
 * @return promis
 */
const showModal = (title = required(), content = required()) => {
    const promise = new Promise((resolve, reject) => {
        wx.showModal({
            title: title,
            content: content,
            success: resolve,
            fail: reject,
        });
    });
    return promise;
};



/**
 * @description: 显示带有遮罩层的loading动画
 * @param {String} title 提示内容
 */
const showLoading = (title) => {
    const _title = title || '';
    wx.showLoading({
        title: _title,
        mask: true,
    });
};



/**
 * @description: toast
 * @param {String} title 提示内容 必填
 * @param {String} icon toast图标样式，默认为'none'，可选'success'
 * @param {Number} time toast持续显示的时间
 */
const toast = (title = required(), time, icon) => {
    const _time = time || 2000;
    const _icon = icon || 'none';

    const promise = new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: _icon,
            duration: _time,
            mask: true,
            success: () => {
                setTimeout(() => {
                    resolve();
                }, _time);
            },
            fail: () => {
                reject();
            },
        });
    });

    return promise;
};


module.exports = {
    checkUpdata: checkUpdata, //小程序检测更新
    get: get, //get请求
    post: post, //post请求
    getQueryByName: getQueryByName, //获取url中特定参数的值
    phoneReg: phoneReg, //手机号码验证
    back: back, //返回上一页
    numFixed: numFixed, //保留数字小数点后N位
    showModal: showModal, //模态弹窗
    showLoading: showLoading,   //显示加载遮罩层
    toast: toast,   //出现提示
};