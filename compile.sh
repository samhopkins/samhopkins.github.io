#!/bin/bash

# pandoc options:
# -s -- generate standalone html
# -S -- smart html generation, gets em and en dashes right
# -c -- specify css file

pandoc -s -o index.html -c pandoc.css index.md
pandoc -s -o pubs.html -c pandoc.css pubs.md
pandoc -s -o fellowship_advice.html -c pandoc.css fellowship_advice.md
pandoc -s -o grad_advice.html -c pandoc.css grad_advice.md
