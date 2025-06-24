#!/data/data/com.termux/files/usr/bin/bash

JST_DATE=$(TZ=Asia/Tokyo date "+%Y-%m-%d")
TIME_STAMP=$(TZ=Asia/Tokyo date "+%Y-%m-%d_%H-%M")

LOG_ENTRY="---

## ✅ ${JST_DATE} の進捗チェックリスト

- [ ] Markdown自動生成スクリプトを実行した
- [ ] 相互リンク自動挿入を実行した
- [ ] Termux操作に慣れた（nano / chmod / git）
- [ ] 生成ファイルをGitHubにPushした
- [ ] 今の自分を昨日の自分と比べて実感した

📝 一言メモ：
> 今日の成長を明日の力にする！

---"

# 2. 追記先ファイルを指定
TARGET_FILE="KOMPETE_GUIDE_${TIME_STAMP}.md"

# 3. 既存ファイルに追記、または新規作成
echo "$LOG_ENTRY" >> "$TARGET_FILE"

echo "✅ ログを追加しました → $TARGET_FILE"
