#!/bin/bash

# pandoc options:
# -s -- generate standalone html
# -S -- smart html generation, gets em and en dashes right
# -c -- specify css file

pandoc -s -o index.html -c styling.css --include-before-body=navbar.html index.md
pandoc -s -o pubs.html -c styling.css --include-before-body=navbar.html pubs.md
pandoc -s -o fellowship_advice.html -c styling.css --include-before-body=navbar.html fellowship_advice.md
pandoc -s -o grad_advice.html -c styling.css --include-before-body=navbar.html grad_advice.md
pandoc -s -o restaurants.html -c styling.css --include-before-body=navbar.html restaurants.md
pandoc -s -o other.html -c styling.css --include-before-body=navbar.html other.md

# teaching files
pandoc -s -o teaching.html -c styling.css --include-before-body=navbar.html teaching.md
pandoc -s -o teaching/sos-fall-22/sos-fall-22.html -c ../../styling.css --mathjax teaching/sos-fall-22/sos-fall-22.md
pandoc -s -o teaching/sos-fall-22/global-correlation-rounding.html -c ../../styling.css --mathjax teaching/sos-fall-22/global-correlation-rounding.md
pandoc -s -o teaching/sos-fall-22/refuting-random-csps.html -c ../../styling.css --mathjax teaching/sos-fall-22/refuting-random-csps.md
pandoc -s -o teaching/sos-fall-22/sos-fall-22-pset-1.html -c ../../styling.css --mathjax teaching/sos-fall-22/sos-fall-22-pset-1.md
pandoc -s -o teaching/sos-fall-22/sos-fall-22-pset-1-solutions.html -c ../../styling.css --mathjax teaching/sos-fall-22/sos-fall-22-pset-1-solutions.md
pandoc -s -o teaching/sos-fall-22/sos-fall-22-pset-2.html -c ../../styling.css --mathjax teaching/sos-fall-22/sos-fall-22-pset-2.md

pandoc -s -o teaching/alg-stats-fall-23/alg-stats-fall-23.html -c ../../styling.css --mathjax teaching/alg-stats-fall-23/alg-stats-fall-23.md
pandoc -s -o teaching/alg-stats-fall-23/lec1-sam.html -c ../../styling.css --mathjax teaching/alg-stats-fall-23/lec1-sam.md

pandoc -s -o teaching/sos-fall-24/sos-fall-24.html -c ../../styling.css --mathjax teaching/sos-fall-24/sos-fall-24.md
