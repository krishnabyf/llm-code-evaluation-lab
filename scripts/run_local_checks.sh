#!/usr/bin/env bash
set -euo pipefail

python3 -m pytest python_tasks/rate_limiter/tests
python3 -m ruff check python_tasks

node --test javascript_react_tasks/use_effect_fetch/tests/*.test.js

g++ -std=c++17 -Wall -Wextra -Werror cpp_tasks/two_sum/fixed_solution.cpp -o /tmp/two_sum_test
/tmp/two_sum_test

(cd go_tasks/retry_client && go test ./...)

if command -v javac >/dev/null 2>&1; then
  javac java_tasks/lru_cache/fixed_solution.java
  java -ea -cp java_tasks/lru_cache LruCacheTest
else
  echo "Skipping local Java check: javac not installed"
fi

if command -v rustc >/dev/null 2>&1; then
  rustc --test rust_tasks/result_parser/fixed_solution.rs -o /tmp/result_parser_test
  /tmp/result_parser_test
else
  echo "Skipping local Rust check: rustc not installed"
fi
