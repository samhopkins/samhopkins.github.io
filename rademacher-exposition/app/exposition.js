export const correspondence = [
  { id: "license", tone: "slate", ranges: [[1, 5]] },
  { id: "imports", tone: "slate", ranges: [[6, 10]] },
  { id: "overview", tone: "slate", ranges: [[11, 17]] },
  { id: "notation", tone: "slate", ranges: [[19, 22]] },
  { id: "namespace", tone: "slate", ranges: [[23, 24], [143, 143]] },
  { id: "matrix", tone: "blue", ranges: [[25, 30]] },
  { id: "measure", tone: "blue", ranges: [[32, 36]] },
  { id: "closed-walk", tone: "blue", ranges: [[38, 39]] },
  { id: "edge", tone: "blue", ranges: [[41, 44]] },
  { id: "multiplicity", tone: "blue", ranges: [[46, 49]] },
  { id: "double-covered", tone: "blue", ranges: [[51, 55]] },
  { id: "decidable", tone: "blue", ranges: [[57, 60]] },
  { id: "survivors", tone: "blue", ranges: [[62, 64]] },
  { id: "expectation", tone: "blue", ranges: [[66, 68]] },
  { id: "trace-power", tone: "blue", ranges: [[70, 74]] },
  { id: "spectral-lemma", tone: "gold", ranges: [[76, 84]] },
  { id: "expansion-lemma", tone: "gold", ranges: [[86, 92]] },
  { id: "counting-lemma", tone: "gold", ranges: [[94, 103]] },
  { id: "logarithmic-lemma", tone: "gold", ranges: [[105, 113]] },
  { id: "main-theorem", tone: "red", ranges: [[115, 122]] },
  { id: "proof-witness", tone: "red", ranges: [[123, 126]] },
  { id: "proof-moment", tone: "red", ranges: [[127, 129]] },
  { id: "proof-expansion", tone: "red", ranges: [[130, 135]] },
  { id: "proof-count", tone: "red", ranges: [[136, 138]] },
  { id: "proof-finish", tone: "red", ranges: [[139, 141]] }
];

export const exposition = [
  {
    number: "00",
    eyebrow: "The setting",
    title: "A symmetric sign matrix",
    blocks: [
      {
        kind: "paragraph",
        content: [
          {
            map: "overview",
            html: "We study a real symmetric matrix with zero diagonal and independent uniform signs above the diagonal."
          },
          {
            map: "license",
            html: "The source is released under Apache 2.0 by the random-matrices-lean contributors."
          },
          {
            map: "imports",
            html: "The Lean file uses Mathlib’s probability measure on binomial random graphs, its adjacency-matrix API, and the standard \\(\\ell^2\\) operator norm."
          },
          {
            map: "notation",
            html: "Throughout, it opens the usual measure, operator-norm, and unit-interval notation."
          },
          {
            map: "namespace",
            html: "All declarations lie in <code>RandomMatrices.IndependentRademacher</code>."
          }
        ]
      },
      {
        kind: "paragraph",
        content: [
          {
            map: "matrix",
            html: "For a simple graph \\(G\\) on \\(\\{0,\\ldots,n-1\\}\\), define the signed adjacency matrix"
          }
        ]
      },
      {
        kind: "formula",
        map: "matrix",
        html: "\\[M(G)=2A(G)-A(K_n).\\]"
      },
      {
        kind: "paragraph",
        content: [
          {
            map: "matrix",
            html: "Thus \\(M_{ii}=0\\), while \\(M_{ij}=1\\) on an edge and \\(M_{ij}=-1\\) on a non-edge."
          },
          {
            map: "measure",
            html: "Sampling \\(G\\sim G(n,\\tfrac12)\\) makes these off-diagonal signs independent and symmetric."
          },
          {
            map: "measure",
            html: "The definition <code>symmetricRademacherMeasure</code> is precisely this graph law."
          }
        ]
      }
    ]
  },
  {
    number: "01",
    eyebrow: "Definitions",
    title: "The walks which survive",
    blocks: [
      {
        kind: "paragraph",
        content: [
          {
            map: "closed-walk",
            html: "A closed walk of length \\(\\ell\\) is represented by a function \\(w:\\operatorname{Fin}(\\ell)\\to\\operatorname{Fin}(n)\\)."
          },
          {
            map: "closed-walk",
            html: "The cyclic permutation <code>finRotate</code> sends each time to the next time and the last time back to zero."
          }
        ]
      },
      {
        kind: "paragraph",
        content: [
          {
            map: "edge",
            html: "At time \\(t\\), the walk crosses the unordered edge \\(\\{w(t),w(t+1)\\}\\), represented by Mathlib’s <code>Sym2</code>."
          },
          {
            map: "multiplicity",
            html: "The multiplicity \\(m_e(w)\\) is the number of times that edge \\(e\\) occurs."
          }
        ]
      },
      {
        kind: "definition",
        label: "Double coverage",
        map: "double-covered",
        content: [
          {
            map: "double-covered",
            html: "A walk is double-covered when it has no stationary step and every edge multiplicity is even."
          },
          {
            map: "double-covered",
            html: "Unused edges have multiplicity zero, which is even."
          }
        ],
        formula: "\\[w(t)\\ne w(t+1),\\qquad m_e(w)\\equiv0\\pmod 2\\quad\\text{for every }e.\\]"
      },
      {
        kind: "paragraph",
        content: [
          {
            map: "decidable",
            html: "All indexing sets are finite, so Lean can decide this predicate by finite computation."
          },
          {
            map: "survivors",
            html: "The subtype <code>DoubleCoveredClosedWalk</code> packages a cyclic walk together with this property."
          }
        ]
      },
      {
        kind: "paragraph",
        content: [
          {
            map: "expectation",
            html: "Write \\(E_n=\\mathbb E\\lVert M\\rVert\\) for the expected operator norm."
          },
          {
            map: "trace-power",
            html: "For a moment order \\(k\\), write \\(T_{n,k}=\\mathbb E\\operatorname{tr}(M^{2k})\\)."
          }
        ]
      }
    ]
  },
  {
    number: "02",
    eyebrow: "Analytic input",
    title: "Norm from trace moments",
    blocks: [
      {
        kind: "lemma",
        label: "Lemma 1",
        map: "spectral-lemma",
        title: "Even trace moments control the mean norm",
        content: [
          {
            map: "spectral-lemma",
            html: "Let \\(k\\ge1\\) and \\(B\\ge0\\)."
          },
          {
            map: "spectral-lemma",
            html: "If \\(T_{n,k}\\le B^{2k}\\), then \\(E_n\\le B\\)."
          }
        ],
        formula: "\\[\\mathbb E\\operatorname{tr}(M^{2k})\\le B^{2k}\\quad\\Longrightarrow\\quad\\mathbb E\\lVert M\\rVert\\le B.\\]",
        proof: [
          {
            map: "spectral-lemma",
            html: "Indeed, symmetry gives \\(\\lVert M\\rVert^{2k}\\le\\operatorname{tr}(M^{2k})\\), and the power-mean inequality gives \\((\\mathbb E\\lVert M\\rVert)^{2k}\\le\\mathbb E\\lVert M\\rVert^{2k}\\)."
          },
          {
            map: "spectral-lemma",
            html: "The Lean proof is intentionally left as <code>sorry</code>."
          }
        ]
      }
    ]
  },
  {
    number: "03",
    eyebrow: "Combinatorial input",
    title: "Trace as a walk count",
    blocks: [
      {
        kind: "lemma",
        label: "Lemma 2",
        map: "expansion-lemma",
        title: "Exact trace expansion",
        content: [
          {
            map: "expansion-lemma",
            html: "For \\(k\\ge1\\), the expected trace power is exactly the number of double-covered closed walks of length \\(2k\\)."
          }
        ],
        formula: "\\[T_{n,k}=\\#\\mathcal W^{\\mathrm{even}}_{n,2k}.\\]",
        proof: [
          {
            map: "expansion-lemma",
            html: "Expanding the trace produces one monomial for each cyclic vertex sequence."
          },
          {
            map: "expansion-lemma",
            html: "A stationary step contributes zero because the matrix diagonal vanishes."
          },
          {
            map: "expansion-lemma",
            html: "For a loopless walk, independence and centering make the expected monomial zero unless every edge occurs an even number of times; in that case it equals one."
          },
          {
            map: "expansion-lemma",
            html: "The Lean proof is left as <code>sorry</code>."
          }
        ]
      },
      {
        kind: "lemma",
        label: "Lemma 3",
        map: "counting-lemma",
        title: "A crude pairing bound",
        content: [
          {
            map: "counting-lemma",
            html: "For \\(k\\ge1\\), the surviving walks satisfy"
          }
        ],
        formula: "\\[\\#\\mathcal W^{\\mathrm{even}}_{n,2k}\\le n(n-1)n^{k-1}(4k)^k.\\]",
        proof: [
          {
            map: "counting-lemma",
            html: "Pair the occurrences of each edge."
          },
          {
            map: "counting-lemma",
            html: "There are at most \\((2k)^k\\) pairings and at most \\(2^k\\) orientation choices."
          },
          {
            map: "counting-lemma",
            html: "The used graph is connected and has at most \\(k\\) edges, hence at most \\(k+1\\) vertices."
          },
          {
            map: "counting-lemma",
            html: "Choosing the first distinct pair and the remaining vertex labels gives the displayed bound."
          },
          {
            map: "counting-lemma",
            html: "The Lean proof is left as <code>sorry</code>."
          }
        ]
      }
    ]
  },
  {
    number: "04",
    eyebrow: "Choice of moment",
    title: "Pay only a square root of a logarithm",
    blocks: [
      {
        kind: "lemma",
        label: "Lemma 4",
        map: "logarithmic-lemma",
        title: "Logarithmic optimization",
        content: [
          {
            map: "logarithmic-lemma",
            html: "Set \\(k=\\lfloor\\log_2 n\\rfloor+1\\), written in Lean as <code>Nat.log 2 n + 1</code>."
          },
          {
            map: "logarithmic-lemma",
            html: "Then the crude count is bounded by the \\(2k\\)-th power of \\(8\\sqrt n\\sqrt{\\log n}\\)."
          }
        ],
        formula: "\\[n(n-1)n^{k-1}(4k)^k\\le\\bigl(8\\sqrt n\\sqrt{\\log n}\\bigr)^{2k}.\\]",
        proof: [
          {
            map: "logarithmic-lemma",
            html: "This is elementary arithmetic: taking a \\(2k\\)-th root turns \\((4k)^k\\) into \\(2\\sqrt k\\), while the choice of \\(k\\) keeps \\(n^{1/(2k)}\\) bounded."
          },
          {
            map: "logarithmic-lemma",
            html: "For \\(n\\le1\\), the factor \\(n(n-1)\\) makes the estimate immediate."
          },
          {
            map: "logarithmic-lemma",
            html: "The generous constant eight absorbs the change from binary to natural logarithms and the small dimensions."
          },
          {
            map: "logarithmic-lemma",
            html: "The Lean proof is left as <code>sorry</code>."
          }
        ]
      }
    ]
  },
  {
    number: "05",
    eyebrow: "Conclusion",
    title: "The expected norm bound",
    blocks: [
      {
        kind: "theorem",
        label: "Main theorem",
        map: "main-theorem",
        content: [
          {
            map: "main-theorem",
            html: "There is a universal constant \\(C>0\\) such that, for every \\(n\\),"
          }
        ],
        formula: "\\[\\mathbb E\\lVert M\\rVert\\le C\\sqrt n\\sqrt{\\log n}.\\]"
      },
      {
        kind: "proof",
        label: "Proof from the lemmas",
        steps: [
          {
            number: "1",
            map: "proof-witness",
            html: "Take \\(C=8\\) and \\(k=\\lfloor\\log_2 n\\rfloor+1\\); this moment order is positive."
          },
          {
            number: "2",
            map: "proof-moment",
            html: "Apply Lemma 1 with \\(B=8\\sqrt n\\sqrt{\\log n}\\); it remains to bound \\(T_{n,k}\\) by \\(B^{2k}\\)."
          },
          {
            number: "3",
            map: "proof-expansion",
            html: "Lemma 2 identifies \\(T_{n,k}\\) with \\(\\#\\mathcal W^{\\mathrm{even}}_{n,2k}\\)."
          },
          {
            number: "4",
            map: "proof-count",
            html: "Lemma 3 bounds this cardinality by \\(n(n-1)n^{k-1}(4k)^k\\)."
          },
          {
            number: "5",
            map: "proof-finish",
            html: "Lemma 4 bounds the latter quantity by \\(B^{2k}\\), completing the proof."
          }
        ]
      }
    ]
  }
];
