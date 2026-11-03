# 對接 `dsh-soul-md` · agent-soul-pack

**狀態：M0 文件。** 本庫**不**實作人設引擎；引擎是 npm [`dsh-soul-md`](https://www.npmjs.com/package/dsh-soul-md)（上游 MIT）。

## 前提

| 項目 | 值 |
|------|-----|
| Host | `@deepseek-ai/dsh@0.2.1-rc.5` |
| Plugin | `dsh-soul-md@0.11.0`（或相容 peer） |
| Profile | 通常 `web`（Desktop 改 `desktop`） |
| 專用 home | `export DSH_HOME="${DSH_HOME:-$HOME/.agent-soul-pack-dsh}"` |
| 模板來源 | 本庫 `templates/{soul,user,agent}.md` |

## 安裝插件（可逆）

```bash
export DSH_HOME="${DSH_HOME:-$HOME/.agent-soul-pack-dsh}"
mkdir -p "$DSH_HOME"
npm i -g @deepseek-ai/dsh@0.2.1-rc.5
dsh plugin --profile web add dsh-soul-md
# 重啟 DSH 後：插件 → 已安裝 → dsh-soul-md
```

卸載：

```bash
dsh plugin --profile web remove dsh-soul-md
# 或：rm -rf "$DSH_HOME"   # 只影響該專用 home
```

## 模板落盤路徑（本 pack）

`scripts/install-templates.mjs` 預設複製到：

```text
$DSH_HOME/agents/default/soul.md
$DSH_HOME/agents/default/user.md
$DSH_HOME/agents/default/agent.md
```

用途：版本可控的「人設／用戶／執行」Markdown 源。  
上游 `dsh-soul-md@0.11.x` 主要用人設**卡**（設定頁）同記憶目錄 `$DSH_HOME/soul-md/memory/`；請將 `soul.md` 內容貼入新卡（或當種子），不當作本腳本會改插件內部卡庫。

## 建議步驟

1. `npm run install:templates`（dry）→ 確認路徑  
2. `npm run install:templates -- --apply`（需已設 `DSH_HOME`）  
3. 裝 `dsh-soul-md`（見上）  
4. 在插件頁開人設卡，貼上 `templates/soul.md`（或 agents 副本）  
5. `user.md`／`agent.md` 留作本地說明；需要時摘要入記憶 `core`（手動／工具）

## 記憶（上游）

依上游 README：記憶預設 `$DSH_HOME/soul-md/memory/`。本 pack **不**自動寫記憶檔。

## 合規

- 無 secret 入庫；`.env.example` 只是空鍵。  
- 同 DeepSeek／xAI **無隸屬**；公開名 `agent-soul-pack`。  
- 不像素抄商業 Bot UI。


## 同 L0 recipe 關係

[`agent-home-recipes`](../agent-home-recipes) 的 [`profiles/default/soul.md`](../../agent-home-recipes/profiles/default/soul.md) 是 **stub**（配方庫內短佔位）。  
本 pack 的 `templates/soul.md`（＋`user.md`／`agent.md`）是 **L1 完整模板種子**；Fleet／home 裝完後用本腳本抄入 `$DSH_HOME/agents/default/`，再貼入 `dsh-soul-md` 人設卡。
