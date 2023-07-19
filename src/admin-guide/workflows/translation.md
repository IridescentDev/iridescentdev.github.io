---
title: 翻译流程
icon: language
author: Ziling_uwu
copyright: Copyright © 2023 Iridescent
footer: Powered by Vuepress with vuepress-theme-hope
category:
  - 管理文档
tag:
  - 流程
---

## 插件添加汉化流程

```mermaid
flowchart TD
    B(新增插件) --> C{判定汉化支持}
    C -->|有| D(腐竹配置中文)
    C -->|无| E(汉化组覆写)
```

## 插件更新汉化流程

```mermaid
flowchart TD
    B(插件更新) --> C{是否跟进更新}
    C -->|是| D[执行插件更新]
    C -->|否| E[忽略]
    D --> F{检测配置文件更改}
    F -->|是| G[将更改部分发送汉化组]
    F -->|否| H[保持原有汉化文件不变]
```