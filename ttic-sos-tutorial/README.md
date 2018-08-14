To compile, use

pandoc -t revealjs -s slides.md -o slides.html -V theme=simple -V transition=none -V center=false -V progress=false -V controls=false --mathjax -f markdown+bracketed_spans
