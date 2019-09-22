export function phoneValid(rule, value, callback){
    var re = new RegExp(/^[1][3456789]\d{9}$/)
    if(re.test(value)){
      callback()
    }else{
      callback(new Error('请输入正确格式的手机号码'))
    }
  }
  // 验证汉字
  export function isHan(rule, value, callback){
    var re = new RegExp(/^[\u4e00-\u9fa5]+$/)
    if(re.test(value)){
      callback(new Error('请输入非汉字'))
    }else{
      callback(new Error('请输入非汉字'))
    }
  }
  // 验证密码
  export function passWord(rule, value, callback) {
    var re = new RegExp(/^(?!\D+$)(?![^a-zA-Z]+$)([\x20-\x7f]){8,32}$/);
    if (re.test(value)) {
      callback()
    } else {
      callback(new Error('必须为8-32位数字和字母或字符组合'))
    }
  }
  // 验证身份证
  export function isIdCard(rule, value, callback) {
    //身份证正则表达式(18位)
    var isIdCard2 = /^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i;
    var stard = "10X98765432"; //最后一位身份证的号码
    var first = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //1-17系数
    var sum = 0;
    if (!isIdCard2.test(value)) {
      callback(new Error('请输入正确的身份证号'))
    }
    var year = value.substr(6, 4);
    var month = value.substr(10, 2);
    var day = value.substr(12, 2);
    var birthday = value.substr(6, 8);
    if (birthday != dateToString(new Date(year + '/' + month + '/' + day))) {//校验日期是否合法
      callback(new Error('请输入正确的身份证号'))
    }
    for (var i = 0; i < value.length - 1; i++) {
      sum += value[i] * first[i];
    }
    var result = sum % 11;
    var last = stard[result]; //计算出来的最后一位身份证号码
    if (value[value.length - 1].toUpperCase() == last) {
      callback()
    } else {
      callback(new Error('请输入正确的身份证号'))
    }
  }
  // 验证营业执照号
  export function isbusinessLicenseId(rule, value, callback) {
    if(value.length == 15 || value.length == 18){
      callback()
    }else{
      callback(new Error('请输入正确格式的营业执照号'))
    }
  }
  // 验证图片验证码
  export function imgCodeValid(rule, value, callback) {
    var re = new RegExp(/^\d{4}$/);
    if(re.test(value)){
      callback()
    }else{
      callback(new Error('请输入正确的图片验证码'))
    }
  }
  // 验证短信验证码
  export function messageCodeValid(rule, value, callback){
    var re = new RegExp(/^\d{6}$/);
    if(re.test(value)){
      callback()
    }else{
      callback(new Error('请输入正确的短信验证码'))
    }
  }
  // 验证银行卡号
  export function bankCardValid(rule, value, callback) {
    var re = new RegExp(/^([1-9]{1})(\d{15}|\d{17}|\d{18})$/);
    if (re.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的银行卡号'))
    }
  }
  // 复制
  export function contentCopy(text) {
    let time = new Date().getTime();
    let div_temp = document.createElement('div');
    div_temp.innerHTML = '<input type="text" value="' + text + '" class="copy' + time + '"></input>';
    document.body.appendChild(div_temp);
    let ele = document.body.getElementsByClassName('copy' + time)[0];
    ele.select();
    ele.setSelectionRange(0, text.length);
    document.execCommand("Copy"); //执行浏览器复制命令
    this.$message.success('复制成功');
    document.body.removeChild(div_temp);
  }
  //金额转换
  export function fen_to_yuan(value, fixed_num, number) {
    if(!value){
      return 0
    }
    if (fixed_num == null) {
      fixed_num = 0;
    }
    if (number) {
      return Number(Decimal.div(value, 100).toFixed(fixed_num));
    }
    return Decimal.div(value, 100).toFixed(fixed_num);
  }
  //金额转换
  export function yuan_to_fen(val) {
    return Decimal.mul(Number(val).toFixed(2), 100).toNumber();
  }
  export function amountLimit(rule, value, callback) {
    var re = new RegExp(/^([0]|[1-9][0-9]*)(\.[0-9]{1,2})?$/)
    if (re.test(value) && value > 0) {
      callback()
    } else {
      callback(new Error('请输入正确的金额'))
    }
  }
  // 文件格式校验
  export function validFile(value, format) {
    let fileName = value.split('\\').pop();
    if (fileName == '') { return true }
    let fileTArr = fileName.toLowerCase().split(".");
    let filetype = fileTArr[fileTArr.length - 1];
    if (format.indexOf(filetype) <= -1) {
      return false;
    } else {
      return true;
    }
  }
  // 获取
  export function getParameterByName(name, url) {
    if (!url) url = decodeURIComponent(window.location.href)
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2]);
  }