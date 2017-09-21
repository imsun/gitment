# Coding Comments

## 简介

静态博客是一种优雅地博客部署方式，但其一个痛点是难以在页面上与读者互动。  
[gitment](https://imsun.net/posts/gitment-introduction/) hack 了 Oauth 流程，使用 Github Issue 的 OpenApi 实现这样功能。  
只用创建一个 Oauth App，然后作为 js 插件引入就好，真的很方便。  
除了 Github 服务器在境外（所以有点慢）之外，别的都挺好的。  

试试做一个依托 [Coding.net](https://coding.net) 的版本，说不定能有更好的体验。

## 安全

按理说 Oauth App 的 client_id 和 client_secret 不应泄露。
因为这对密码是代表了你的身份，其他用户信任你，才把他们的数据交给你。  

如同原作 [About Security](https://github.com/imsun/gitment#about-security) 所说，
[Oauth 机制](http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html) 中 code 是跳回到源地址的，所以似乎并无安全漏洞。

如有 hack 的方式，欢迎以 [Issue](https://github.com/Coding/Comments/issues) 方式通知我们。

## 致谢

[imsun/gitment](https://github.com/imsun/gitment) 是该项目想法的源头。并且该项目是直接在其代码上进行修改实现的。