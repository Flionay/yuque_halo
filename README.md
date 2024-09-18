# Yuque + Elog + Halo + GitHub Actions 博客解决方案
# 快速开始

此工具借助 [Elog](https://github.com/LetTTGACO/elog) 实现了从 语雀 同步文档到 Halo 站点，并借助 Github Actions 实现了自动化部署。

## 拓展功能点
在语雀文档的开头，写一个yaml代码块，就能又漂亮又方便地配置博客文章的标题、分类、标签、封面等属性，比如：
![](https://angyi.oss-cn-beijing.aliyuncs.com/uPic/2024/1RAW4e.png)

借助elog的`FormatExt` 自定义文档适配处理器，将这个yaml代码块解析，并与elog生成的frontmatter合并，最终生成符合halo要求的文章元数据

# 博客工具

- 写作平台：语雀
- 博客平台：Halo
- 博客文档同步：[Elog](https://github.com/LetTTGACO/elog)

# 博客搭建指南


## Fork模板仓库

[点击 Fork](https://github.com/elog-x/notion-halo/fork) 该模板仓库到个人 Github 账号仓库下并 clone 到本地

## 安装依赖

在项目根目录下运行命令安装依赖

```shell
npm install
```
## 新建 Elog 本地调试文件

在项目根目录中复制`.elog.example.env`文件并改名为`.elog.env`，此文件将用于本地同步Notion 文档

## 配置 Yuque 关键信息

详细内容可以查看elog官方文档，详细信息获取部分

```yaml
#语雀（账号密码模式）
YUQUE_USERNAME=账号
YUQUE_PASSWORD=密码
# 语雀公共参数
YUQUE_LOGIN=空间名
YUQUE_REPO=知识库id

# 阿里云 oss 图床对象存储
OSS_SECRET_ID=xxxx
OSS_SECRET_KEY=xxx
OSS_BUCKET=用户名
OSS_REGION=oss-cn-beijing

# Halo 站点信息
HALO_ENDPOINT=Halo 站点地址
HALO_TOKEN=获取的 Halo 个人令牌
HALO_POLICY_NAME=获取的存储策略
```


## 本地调试


仓库中有两个 elog 配置文件：

1. `elog.config.js`：同步到 Halo 时的配置文件，用于同步 Notion 文档到 Halo
2. `elog.config.local.js`：同步到本地时的配置文件，用于备份 Notion 文档到本地

在正式上传到 Halo 站点前，建议先运行本地同步命令，从 Notion 拉取文档到本地


```shell
npm run dev:local
```


拉取到本地测试没问题时，再运行同步到 Halo 命令


```bash
npm run dev:halo
```


## 配置 Halo 站点


配置你的Halo 站点直到满意为止，可适当安装一些主题、插件

- 代码高亮插件
- markdown 编辑器

## 提交代码到 github


halo 站点访问没问题直接提交所有文件到 Github 仓库即可


## 自动化同步&部署


### 检查 Github Actions 权限

![img](https://image.1874.cool/1874/202311082349660.png)
### 配置环境变量
![image](https://image.1874.cool/1874/202311301327995.jpg)


### 语雀Webhook触发器

在语雀仓库中设置webhook之后，当在知识库中改动文档后，就会自动触发 Github Actions流水线，会重新从 Notion 增量拉取文档，并自动部署到 Halo 站点，如此就实现了自动化部署博客。

按照这个文档，配置语雀webhook触发器：[**ServerlessAPI**](https://github.com/elog-x/serverless-api)，按照文档配置好 URL 参数并浏览器访问即可触发流水线

```text
https://serverless-api-elog.vercel.app/api/github?user=xxx&repo=xxx&event_type=deploy&token=xxx
```

感谢作者：https://github.com/elog-x/notion-halo


