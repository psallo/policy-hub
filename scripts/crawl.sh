#!/bin/bash
# 정책허브 크롤러 실행 스크립트 (Mac launchd 용)

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_FILE="$SCRIPT_DIR/crawl.log"
MAX_LOG_LINES=1000

cd "$SCRIPT_DIR" || exit 1

echo "" >> "$LOG_FILE"
echo "===== $(date '+%Y-%m-%d %H:%M:%S') 크롤링 시작 =====" >> "$LOG_FILE"

npm run crawl >> "$LOG_FILE" 2>&1

echo "===== $(date '+%Y-%m-%d %H:%M:%S') 완료 =====" >> "$LOG_FILE"

# 로그 파일 크기 관리 (1000줄 초과 시 오래된 것 제거)
tail -n $MAX_LOG_LINES "$LOG_FILE" > "$LOG_FILE.tmp" && mv "$LOG_FILE.tmp" "$LOG_FILE"
