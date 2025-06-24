#!/data/data/com.termux/files/usr/bin/bash

# ファイル一覧（リンク順もこの通りに）
FILES=(
  "KOMPETE_TERMS_v0.1.md"
  "KOMPETE_GUIDE_index.md"
  "KOMPETE_GUIDE_2025-06-24_18_11.md"
  "KOMPETE_GUIDE.md"
  "README.md"
)

# 最新GUIDEファイル名（例として今日の19:45に生成）
NEW_GUIDE_FILE="KOMPETE_GUIDE_$(TZ=Asia/Tokyo date '+%Y-%m-%d_%H-%M').md"

# 古いバージョンのGUIDEをコピーして新規ファイルとして作成
cp KOMPETE_GUIDE_2025-06-24_18_11.md "$NEW_GUIDE_FILE"

# すべてのファイルに共通で入れるリンクブロック
generate_links() {
  echo "---"
  echo "🔗 他のドキュメント:"
  for file in "${FILES[@]}"; do
    echo "- [$(basename "$file")]($file)"
  done
  echo "- [最新版ガイド]($NEW_GUIDE_FILE)"
  echo "---"
  echo ""
}

# 各ファイルにリンクを挿入（元の先頭に上書き）
for file in "${FILES[@]}" "$NEW_GUIDE_FILE"; do
  if [ -f "$file" ]; then
    # 元ファイルの本文を一時保存（リンク部分を除去）
    tail -n +1 "$file" | sed '/^---$/,/^---$/d' > tmp_content.md
    {
      generate_links
      cat tmp_content.md
    } > "$file"
  fi
done

# 後始末
rm tmp_content.md

echo "✅ 相互リンクを全Markdownファイルに追加しました。"
