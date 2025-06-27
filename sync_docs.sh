#!/bin/bash
LOCAL_DOCS_DIR="$HOME/kompete-stat-dev/local/docs"
PUBLIC_DOCS_DIR="$HOME/kompete-stat-dev/public/docs"

echo "Copying clean *_edit.md docs from $LOCAL_DOCS_DIR to $PUBLIC_DOCS_DIR ..."

mkdir -p "$PUBLIC_DOCS_DIR"

shopt -s nullglob

for file in "$LOCAL_DOCS_DIR"/[0-9][0-9]_*.md; do
  # ベース名だけ取り出し
  filename=$(basename "$file")
  
  # "_edit.md" で終わるものだけを対象にする
  if [[ "$filename" =~ _edit\.md$ ]]; then
    dest_file="${filename/_edit/}"
    cp "$file" "$PUBLIC_DOCS_DIR/$dest_file"
    echo "Copied $file to $PUBLIC_DOCS_DIR/$dest_file"
  else
    echo "Skipped $file (not ending with _edit.md)"
  fi
done

echo "Copy complete."
