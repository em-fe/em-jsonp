export default {
  hOwnProperty(item, attr) {
    return Object.prototype.hasOwnProperty.call(item, attr);
  },
  //格式化参数
  formatParams(data, callbackName) {
    const arr = [];
    Object.keys(data).forEach((dataKey) => {
      arr.push(`${encodeURIComponent(dataKey)}=${encodeURIComponent(data[dataKey])}`);
    });
    // 添加一个随机数，防止缓存
    if (!this.hOwnProperty(data, 'callback')) {
      arr.push(`callback=${callbackName}`);
    }
    arr.push(`v=${this.random()}`);
    return arr.join('&');
  },
  random() {
    return Math.floor((Math.random() * 10000) + 500);
  },
};
