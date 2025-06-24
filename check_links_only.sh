#!/data/data/com.termux/files/usr/bin/bash

# リンク切れチェック対象ディレクトリ（カレントディレクトリ）
TARGET_DIR="./"

echo "🔍 Markdownファイルのリンクチェック開始"

# Markdownファイル一覧取得
MD_FILES=($(find $TARGET_DIR -maxdepth 1 -type f -name '*.md'))

ERROR_COUNT=0

for FILE in "${MD_FILES[@]}"; do
  echo "● チェック中：$(basename "$FILE")"

  # Markdownファイル内のリンクだけ抽出し、リンク先ファイルが存在するかチェック
  # リンクは [テキスト](ファイル名.md) の形式を想定
  LINKS=$(grep -oP '[^]+\K[^)]+\.md(?=)' "$FILE" | sort | uniq)

  for LINK in $LINKS; do
    if [[ ! -f "$TARGET_DIR/$LINK" ]]; then
      echo "  🔸 リンク欠落：[$LINK] が見つかりません"
      ERROR_COUNT=$((ERROR_COUNT + 1))
    fi
  done
done

if (( ERROR_COUNT == 0 )); then
  echo "✅ リンク切れは見つかりませんでした。"
else
  echo "⚠️ リンク切れを合計 $ERROR_COUNT 件検出しました。"
fi
