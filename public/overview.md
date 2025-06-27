---TEST

## 📂 ファイル構成と分類ルール（2025-06-25 時点）

本プロジェクトのドキュメントは、以下の6ファイルに分類されている：

| ファイル名         | 用途・内容 |
|--------------------|------------|
| `overview.md`      | プロジェクトの目的、構成、開発方針、運用ルールなどを統括的に記述 |
| `log_2025-06.md`   | 日々の進捗、試行錯誤、成功・失敗の記録、開発の歩み |
| `chatlog.md`       | ChatGPTとの会話要約、文脈の記録、セッション継続のための参照 |
| `commands.md`      | TermuxやGitなどの操作コマンド、Tips、Markdownでのコピペ用含む |
| `terms.md`         | 用語解説、略語一覧、開発中に頻出する専門用語の定義や背景 |
| `README.md`        | GitHub公開用の要約（概要・セットアップ・使用方法・ライセンス等） |

> この分類により、情報の整理・検索・運用が効率化される。



## 今日の作業概要

- プロジェクトのドキュメント6ファイル分類の再確認  
- ドキュメントファイル名に番号を付けて整理するルールを確立  
- ファイル移動とリネームの運用ルールの共有



---

## ✅ 自動バックアップ実行例（再確認）

```bash
devedit docs/overview_edit.md
```

---

よく使うコマンドは下記のスタイルで `overview_edit.md` に追記していく。

### 🔧 セクションタイトル

```bash
# Termuxで使うコマンド
your-command-here
```

- タイトルだけ書いて  
- その下に **コマンドのみ記載されたコードブロック**  
- **コピー可能ボタン**（GitHubやMarkdownビューアで有効）が出る形で  
- 内容は最低限に抑える

---

## 🎯 例：TermuxでNode.jsをインストールする場合

### 📦 Node.js インストール

```bash
pkg install nodejs
```

これをMarkdown対応エディタやGitHub上で開くと、コードの右上に「コピー」ボタンが出ます。

---

## 🔁 応用例：複数コマンドもOK

### 🛠 TypeScriptプロジェクト初期化

```bash
npm init -y
npm install typescript --save-dev
npx tsc --init
```

---

## 🔧 雛形テンプレ（空のブロックをすぐ追記できる）

```markdown
### 🔧 [ここにタイトル]

```bash
# コマンドを書く
```


```bash
cd ~/kompete-stat-dev/src
devedit docs/overview_edit.md
```
