#!/bin/bash

# URL API
URL="https://10.0.2.148:9000/api/query"

# File lưu kết quả
OUTPUT_FILE="result.json"

# Kiểm tra tham số dòng lệnh
if [ $# -eq 0 ]; then
    echo "Cách dùng: $0 \"<câu lệnh SQL>\""
    exit 1
fi

# Lấy toàn bộ câu lệnh SQL từ tham số
SQL_QUERY="$1"

# Tạo JSON query
QUERY_JSON=$(jq -n --arg q "$SQL_QUERY" '{query: $q}')

echo "Đang gửi truy vấn đến API..."
curl -X POST "$URL" \
     -H "Content-Type: application/json" \
     -d "$QUERY_JSON" \
     --insecure -o "$OUTPUT_FILE"

if [ $? -ne 0 ]; then
    echo "Lỗi khi lấy dữ liệu từ API."
    exit 1
fi

# Kiểm tra xem có kết quả không
ROW_COUNT=$(jq '.rowCount' "$OUTPUT_FILE")
if [ "$ROW_COUNT" -eq 0 ]; then
    echo "Không có dữ liệu trả về từ truy vấn."
    exit 0
fi

echo "Hiển thị bảng kết quả..."

# In bảng tổng quát (tự động lấy cột và dữ liệu)
jq -r '
  (.rows[0] | keys_unsorted) as $keys
  |
  ($keys | @tsv),
  (.rows[] | [ .[$keys[]] ] | @tsv)
' "$OUTPUT_FILE" | column -t -s $'\t'
