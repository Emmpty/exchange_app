import Interactive from './interactive';
import MD5 from '@/js_sdk/md5/md5.js'

const MD5Key = 'zykjvrm_@#';

const utils = {
    notOpen() {
        Interactive.interactive.toast('开发中...')
    },
    md5faceCheck(str) {
        let sign = MD5(str)
        return sign
    },
    //MD5加密方法
    md5Method(data) {
        //深度复制  避免与vue的对象混乱
        // var data = jQuery.extend(true, {}, arys);
        //密码加密
        this.password(data);

        var sign = this.getSign(data);
        data.sign = sign;
        return JSON.stringify(data);
    },

    /**
     * 签名
     * @param data
     * @returns
     */
    getSign(data) {
        //（1）排序  先用Object内置类的keys方法获取要排序对象的属性名数组，再利用Array的sort方法进行排序
        var keys = Object.keys(data).sort();
        var keyString = ''; //创建一个新的对象，用于存放排好序的键值对
        for (var i = 0; i < keys.length; i++) {
            //遍历keys数组
            keyString += [keys[i]] + '=' + data[keys[i]] + '&';
        }
        //（2）排序结果
        var signString = keyString.substring(0, keyString.length - 1) + "&key=" + MD5Key;
        //（3）获取sign
        var sign = MD5(signString).toString().toLowerCase();
        return sign;
    },

    /**
     * 密码加密
     * @param arys
     * @returns
     */
    password(arys) {
        if (arys.hasOwnProperty("password")) {
            arys.password = MD5(arys.password).toString();
        }
        if (arys.hasOwnProperty("newPassword")) {
            arys.newPassword = MD5(arys.newPassword).toString();
        }
        if (arys.hasOwnProperty("confirmPassword")) {
            arys.confirmPassword = MD5(arys.confirmPassword).toString();
        }


        if (arys.hasOwnProperty("payPassword")) {
            arys.payPassword = MD5(arys.payPassword).toString();
        }
        if (arys.hasOwnProperty("newPayPassword")) {
            arys.newPayPassword = MD5(arys.newPayPassword).toString();
        }
        if (arys.hasOwnProperty("confirmPayPassword")) {
            arys.confirmPayPassword = MD5(arys.confirmPayPassword).toString();
        }
    },
    /***校验身份证号
    @param {String} personnumber 身份证号码
    @example: checkIdcard(pass); //return true | false;
    */
    checkIdcard(personnumber) {
        personnumber = personnumber.toUpperCase();
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(personnumber))) {
            return false;
        }
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        //下面分别分析出生日期和校验位
        var len, re;
        len = personnumber.length;
        if (len == 15) {
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            var arrSplit = personnumber.match(re);

            //检查生日日期是否正确
            var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                return false;
            }
            else {
                //将15位身份证转成18位
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0, i;
                personnumber = personnumber.substr(0, 6) + '19' + personnumber.substr(6, personnumber.length - 6);
                for (i = 0; i < 17; i++) {
                    nTemp += personnumber.substr(i, 1) * arrInt[i];
                }
                personnumber += arrCh[nTemp % 11];
                return true;
            }
        }
        if (len == 18) {
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var arrSplit = personnumber.match(re);

            //检查生日日期是否正确
            var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                return false;
            } else {
                //检验18位身份证的校验码是否正确。
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var valnum;
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0, i;
                for (i = 0; i < 17; i++) {
                    nTemp += personnumber.substr(i, 1) * arrInt[i];
                }
                valnum = arrCh[nTemp % 11];
                if (valnum != personnumber.substr(17, 1)) {
                    return false;
                }
                return true;
            }
        }
        return false;
    },
    checkName(name) {
        var nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
        if (nameReg.test(name)) return true
        else return false
    },
    $videoContextList: []
}

export default {
    utils
}