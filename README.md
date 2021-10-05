# seeai-vue-template-mobile

恒企SEEAI平台前端项目开发的通用vue3应用mobile模板([6+通用模板源](https://gitee.com/xccjh-zjh))

属于seeai技术转型方案的一部分：

![](https://oss.xccjh.top/vuebloger/img/post/Snipaste_2021-06-15_16-57-39.png)

## 技术栈
[vue3](https://v3.cn.vuejs.org/)+[typescript](https://www.tslang.cn/)+[vant](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/quickstart#fang-shi-yi.-tong-guo-babel-cha-jian-an-xu-yin-ru-zu-jian)+ [ckeditor5-xccjh](https://gitee.com/xccjh/ckeditor5-xccjh) + [vue3-theme-peel](https://gitee.com/xccjh/vue3-theme-peel) + 
[vue3-draggable-drop](https://gitee.com/xccjh/vue3-draggable-drop)

## 项目运行
1. 使用[开源seeai-cli脚手架](https://www.npmjs.com/package/@xccjh/ky-seeai-cli)拉取代码,初始化项目 seeai-cli create [project-name]
2. 安装依赖 yarn
3. 本地运行项目 yarn start

6. 环境变量注入示例

配置相关
- VUE_APP_deploy：0 | 1 用来标志是否用来部署，为1时在eslint检测debugger/console警告，注册serviceWorker和进行gzip压缩，抽离主题文件
- VUE_APP_SourceMap：0 | 1 开发环境一定会有源码映射，部署环境下控制sourceMap生成
- NODE_ENV：vue和插件系统依赖内部进行优化处理
- VUE_APP_environment：微服务区分不同配置环境
- VUE_APP_HTTPS：开发环境是否开启https

题库相关
- VUE_APP_questionBank：题库后台地址，如增加问卷试卷用
- VUE_APP_tkPage：题库前台地址，如做试卷问卷用
- VUE_APP_questionBankGateway：智适应题库api服务域名(只抽题)
- VUE_APP_questionBankApi：题库网关地址
- VUE_APP_paperApi：swagger做题api服务域名

保利威相关
- VUE_APP_polywayApi：保利威API接口前缀
- VUE_APP_polywayUpload：保利威上传视频接口前缀
- VUE_APP_writetoken：保利威文件写token
- VUE_APP_cataid：启课程加密分类id
- VUE_APP_userid：保利威用户id
- VUE_APP_secretkey：保利威密钥

后端对接相关
- VUE_APP_commonViewer：公共服务预览的地址
- VUE_APP_endpoint：oss访问域名
- VUE_APP_OSS_URL：oss资源路径前缀
- VUE_APP_SERVER_URL：seeai后台接口地址前缀

nc相关
- VUE_APP_ncCourseType：nc课程科目类型接口地址前缀

## 目录结构
由于vue3对typescript的支持已经成熟，不采用装饰器的写法，也省去了`class-style component syntax`中`vue-class-component`和扩展`vue-property-decorator`插件的安装。
**主业务逻辑在app-main主应用开发部署即可**。
```sh
    |- doc/                                          项目关键技术文档
    |- script/                                       工具脚本
        |- git/                                      git相关脚本
        |- utils/                                    项目外工具方法和调试方法
    |- public/                                       首页模板资源
        |- index.html
    |- localfile/                                    本地文件服务器文件存放位置
    |- server/                                       本地项目托管，用来模拟生产情况等
        |- csr.key                                   https认证key
        |- file.crt                                  https证书
        |- private.key                               https私钥
        |- server.js                                 本地服务托管
        |- fileServer.js                             本地文件服务器
    |- layout/                                       全局布局模块组件
        |- AppIndex.vue                              总业务承载组件
        |- Home.vue                                  其他边缘业务组件
        |- Login.vue                                 登录
    |- deploy/                                       部署相关
    |- typings/                                      编辑器类型定义扩展
        |- index.d.ts
    	|- custom-typings.d.ts
    |- local/                                        本地服托管的目录，用来多项目同域联调，不参与项目编译
    |- src/                                          项目主代码
        |- app/                                      总业务逻辑
            |- api/                                  后端api联调
                |- common/                           公共请求接口
                |- auth.ts                           认证
                |- error-code.ts                     错误码
                |- http.ts                           公共请求方法
                |- interceptors.ts                   请求拦截器
                |- requestInstant.ts                 源实例
                |- index.ts                          总导出
            |- router/                               总路由注册
                |- guard.ts                          路由拦截器
                |- index.ts                          总路由管理
            |- store/                                总数据仓库注册
                |- index.ts                          总状态管理
            |- views/                                总业务逻辑代码
                 |- demo-construct/                  单模块
                    |- api/                          单模块请求方法清单
                         |- demo-children.api.ts     子组件请求方法清单
                         |- demo-construct.api.ts    模块组件请求方法清单
                         |- index.ts
                    |- components/                   单模块组件
                         |- demo-children.vue        子组件
                         |- index.ts                 子组件导出
                    |- demo-construct.vue            单模块入口组件
                    |- demo-construct.route.ts       单模块子路由
                    |- demo-construct.store.ts       单模块子数据仓库
                    |- demo-construct.util.ts        单模块工具方法
                    |- demo-construct-constants.ts   单模块常量定义
                    |- index.ts                      单模块导出
        |- assets/                                   静态文件资源
            |- iconfont/                             图标
            |- images/                               图片
            |- plugins                               第三方插件总注册
                |- antd.ts                           antd按需注册
                |- global-svg.ts                     svg全局注册
                |- index.ts                          插件总导出
            |- svg/                                  所有svg图片，创建即注册
        |- common /                                  公共服复用逻辑
            |- base/                                 全局泛型
                |- enum.ts                           公共枚举
                |- common.ts                         公共泛型
                |- index.ts
            |- components/                           公共组件
                |- index.ts
                |- svg-icon/                         单个公共组件
                    |- index.ts
                    |- svg-icon.vue                  单个公共组件逻辑
                    |- svg-icon.scss                 单个公共组件样式
                    |- README.md                     单个组件用法说明
            |- constants/                            公共常量
                |- index.ts
                |- uploadDir.ts                      oss目录常量
                |- static-data.ts                    全局常量
            |- directives/                           公共指令
                |- index.ts
                |- click-outside.ts                  单个指令
                |- README.md                         指令用途说明
            |- mixins/                               公共混入
                |- index.ts
                |- base.ts                           公共逻辑
            |- services/                             公共服务
                |- index.ts
                |- normal-menu/                      单个服务
                     |- normal-menu.scss             样式
                     |- normal-menu.scss             逻辑
                     |- README.md                    服务用途说明
            |- utils/                                公共工具类
                |- index.ts
                |- localstorage.util.ts              本地数据操作工具
                |- sessionstorage.util.ts            会话数据操作工具
                |- tools.util.ts                     通用工具
                |- common.ts                         公共工具
                |- crypto.ts                         加盐算法
                |- base64.ts                         base64解码加码
                |- download.ts                       oss下载
                |- uuid.ts                           随机串
                |- validator.ts                      全局正则
            |- index.ts
    |- style/                                        全局样式
    	|- index.scss
        |- style.scss                                全局样式定义
        |- _mixin.scss                               全局样式工具
    	|- reset.scss                                清零化样式
        |- normalize.scss                            归一化样式
    |- theme/                                        主题
        |- default/                                  默认主题
            |- index.scss
            |- _variable.scss                        修改组件主题变量列表
    |- App.vue                                       主组件入口
    |- main.ts                                       单页面启动入口
    |- polyfills.js                                  兼容垫片
    |- vue.config.js                                 vue全局配置
    |- README.md                                     项目主要信息介绍
    |- release-prod.log                              正式线发版记录
    |- release-test.log                              测试线发版记录
    |- CHANGELOG.zh-CN.md                            项目版本更新中文记录
    |- .env.development                              开发环境变量注入
    |- .env.intranet                                 beta环境变量注入
    |- .env.production                               生产环境变量注入
    |- .env.test                                     测试环境变量注入
    |- .eslintrc.js                                  eslint全局配置
    |- tsconfig.json                                 tslint全局配置
    |- babel.config.js                               babel编译配置
    |- .npmrc                                        npm变量配置
    |- .yarnrc                                       yarn变量配置
```

## tag介绍
+ v1.0.0 一键初始化SEEAI通用vue3应用模板

## 模板优化点建议
+ 待补充

## 项目注意点
1. [团队合作开发规范要点](https://xccjh.gitee.io/vuebloger/technology/vue团队开发规范.html)
3. [ow365](https://officeweb365.com/Help/Default/5)
4. [wps-jsSDK](https://wwo.wps.cn/docs-js-sdk/#/)
5. [百度统计](https://tongji.baidu.com/web/welcome/login)
6. [保利威](https://dev.polyv.net/2020/videoproduct/v-player-sdk/v-player-sdk-web/v-player-sdk-web-feature/play/)
7. [SEEAI项目标准开发脚手架](http://oss.xccjh.top/vuebloger/)
8. [SEEAI标准项目模板gitee源](https://gitee.com/xccjh-zjh)
9. [一键换肤方案](https://gitee.com/xccjh/vue3-theme-peel)
10. [富文本方案](https://gitee.com/xccjh/ckeditor5-xccjh)
11. [网格拖拽方案](https://gitee.com/xccjh/vue3-draggable-drop)


