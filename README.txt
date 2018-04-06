to compile:

pandoc -s -S -o index.html -c pandoc.css index.md

-s -- generate standalone html
-S -- smart html generation, gets em and en dashes right
-c -- specify css file
