To compile, use

pandoc -t revealjs -s testslides.md -o testslides.html -V theme=simple -V transition=none -V center=false -V progress=false -V controls=false --mathjax -f markdown+bracketed_spans
