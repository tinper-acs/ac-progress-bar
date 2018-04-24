## app-progress-bar

## API

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
|tenantId|接口请求的关键字，会在check中传递|String|default|
|startFlag|何时开始进行|Boolean|false|
|loadingDesc|描述|String|正在配置信息…|
|check|不断请求接口并反复调用的函数 |Function||
|loadingOverFunc|进度完成后的回调函数|Function||

#### 开发调试

```sh
$ npm install -g ac-tools
$ git clone git@github.com:tinper-acs/ac-pagination.git
$ cd ac-pagination
$ npm install
$ npm run dev
```