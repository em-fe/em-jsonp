import O from './tools/o';
/*
 * url: string 请求地址
 * callback: string 回调的方法名 默认 callback
 * success: function 请求成功的回调
 * error: function 请求失败的回调
*/
export default (params) => {
  //创建script标签并加入到页面中
  const callbackName = params.callback || 'callback';
  const head = document.getElementsByTagName('head')[0];
  // 设置传递给后台的回调参数名
  const data = O.formatParams(params.data || {}, callbackName);
  const script = document.createElement('script');
  head.appendChild(script);
  //创建jsonp回调函数
  window[callbackName] = (json) => {
    head.removeChild(script);
    clearTimeout(script.timer);
    window[callbackName] = null;
    if (params.success) {
      params.success(json);
    }
  };
  //发送请求
  script.src = `${params.url}?${data}`;
  //为了得知此次请求是否成功，设置超时处理
  if (params.time) {
    script.timer = setTimeout(() => {
      window[callbackName] = null;
      head.removeChild(script);
      if (params.error) {
        params.error({
          message: '超时',
        });
      }
    }, params.time);
  }
};
