#!/bin/bash

# Run the compile.sh script
./compile.sh

# Add all new or changed .html, .md, and .pdf files recursively
git add $(find . -type f \( -name "*.html" -o -name "*.md" -o -name "*.pdf" \))

# Commit with an empty message
git commit --allow-empty-message -m ""

# Push to the current branch
git push
