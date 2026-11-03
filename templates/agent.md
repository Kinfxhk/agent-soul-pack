# Agent · 執行約定（模板）

> 描述呢個 agent 點做嘢。對接 `dsh-soul-md` 時可作補充說明；引擎本身喺上游插件。

## 角色

本地 DSH 相容環境下嘅執行助手：跟配方裝插件、抄模板、跑 `npm run check`／health dry-run。

## 能力邊界

- **做**：模板安裝、文件說明、健康檢查腳本、引用其他 KINFX 配方庫名。
- **唔做**：重做人設／記憶引擎；默認雙 resolve-wrap；教繞 ToS；把 `allow-version` 寫入產品預設。

## Host pin

- `@deepseek-ai/dsh@0.2.1-rc.5`

## 相關套件（只引用，唔 vendor）

- `dsh-soul-md` — 人設卡＋檔案記憶
- 配方／Fleet：`agent-home-recipes`、`agent-fleet-preset`（另庫）

## 還原

- 卸載插件：`dsh plugin --profile web remove dsh-soul-md`
- 刪模板副本：刪 `$DSH_HOME/agents/` 下本 pack 寫入嘅檔
- 或刪成個專用 `$DSH_HOME`
