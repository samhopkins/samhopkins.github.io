# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is Samuel B. Hopkins' academic personal website (samhopkins.github.io), built as a static site using Pandoc to convert Markdown files to HTML. The site contains:
- Personal/professional information pages
- Publications list
- Teaching materials (course pages, lecture notes, problem sets)
- Advice for graduate students and fellowship applicants

## Build System

The website uses Pandoc to convert Markdown to HTML with custom styling.

### Build Commands

**Build entire site:**
```bash
./compile.sh
```

This script:
- Converts all root-level `.md` files to `.html` using Pandoc
- Includes `navbar.html` as a header for navigation
- Applies `styling.css` for consistent styling across pages
- Processes teaching materials with MathJax support for mathematical notation

**Build and deploy:**
```bash
./update.sh
```

This script:
1. Runs `compile.sh` to rebuild all pages
2. Stages all `.html`, `.md`, and `.pdf` files
3. Commits with an empty commit message
4. Pushes to the master branch (which deploys via GitHub Pages)

### Pandoc Usage

The site uses Pandoc with these key options:
- `-s`: Generate standalone HTML files
- `-c styling.css`: Apply consistent CSS styling
- `--include-before-body=navbar.html`: Include navigation bar
- `--mathjax`: Enable MathJax for mathematical equations (teaching materials)

## Site Architecture

### Core Pages

Root-level Markdown files generate the main site pages:
- `index.md` → Home page with bio and contact info
- `pubs.md` → Publications list (chronologically organized)
- `teaching.md` → Teaching overview and course links
- `fellowship_advice.md` → Fellowship application advice
- `grad_advice.md` → Graduate school advice
- `phd_student.md` → Information for prospective PhD students
- `restaurants.md` → Restaurant recommendations
- `other.md` → Miscellaneous content

### Teaching Materials Structure

Teaching content is organized in `teaching/` subdirectories:
- `teaching/sos-fall-22/` - Sum of Squares course (Fall 2022)
- `teaching/alg-stats-fall-23/` - Algorithmic Statistics (Fall 2023)
- `teaching/sos-fall-24/` - Sum of Squares course (Fall 2024)

Each course directory contains:
- Main course page (e.g., `sos-fall-24.md`)
- Lecture notes (typically as PDF files)
- Problem sets and solutions (as `.md` files converted to HTML)
- Additional notes and readings

Teaching materials use MathJax for rendering mathematical equations, enabling LaTeX-style math notation in Markdown.

### Navigation

The `navbar.html` file provides consistent navigation across all pages with links to:
- Home
- Publications
- Teaching
- Grab Bag (Other)

This navbar is injected into every page during the Pandoc build process.

## Content Guidelines

### Mathematical Content

Teaching materials extensively use LaTeX math notation, which Pandoc converts to MathJax-rendered HTML. Math can be inline (`$...$`) or display (`$$...$$`) mode.

### Publication Entries

Publications in `pubs.md` follow this format:
- Organized by year (reverse chronological)
- Include: Title (bold), authors, venue, and arxiv link
- Alphabetical author ordering unless noted otherwise
- Special note when author ordering is by contribution

### Links and References

- Use relative paths for internal site links (e.g., `../../index.html` from teaching subdirectories)
- External links use markdown format: `[text](url)`
- Course syllabi reference external resources (books, other courses, videos)

## Deployment

The site is hosted on GitHub Pages from the master branch. After running `./update.sh`, changes are automatically deployed. The custom domain is configured via the `CNAME` file.
