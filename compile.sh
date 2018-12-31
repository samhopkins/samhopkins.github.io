#!/bin/bash

# pandoc options:
# -s -- generate standalone html
# -S -- smart html generation, gets em and en dashes right
# -c -- specify css file

pandoc -s -o index.html -c pandoc.css index.md
pandoc -s -o pubs.html -c pandoc.css pubs.md
