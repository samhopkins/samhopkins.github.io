#!/bin/bash

# pandoc options:
# -s -- generate standalone html
# -S -- smart html generation, gets em and en dashes right
# -c -- specify css file

pandoc -s -o index.html -c pandoc.css index.md
pandoc -s -o pubs.html -c pandoc.css pubs.md
pandoc -s -o fellowship_advice.html -c pandoc.css fellowship_advice.md
pandoc -s -o grad_advice.html -c pandoc.css grad_advice.md
pandoc -s -o restaurants.html -c pandoc.css restaurants.md
pandoc -s -o teaching.html -c pandoc.css teaching.md
pandoc -s -o sos-fall-22.html -c pandoc.css sos-fall-22.md




