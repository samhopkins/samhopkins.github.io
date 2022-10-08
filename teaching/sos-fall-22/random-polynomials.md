## Random Polynomials and Random CSPs

**Alert: these notes are a work in progress, and have not been subjected to the usual scrutiny reserved for formal publications!**

\newcommand{\E}{\mathbb E}
\newcommand{\pE}{\tilde{\mathbb E}}
\newcommand{\e}{\varepsilon}
\newcommand{\proves}{\vdash}
\newcommand{\N}{\mathbb{N}}
\newcommand{\R}{\mathbb{R}}
\newcommand{\iprod}[1]{\langle #1 \rangle}
\newcommand{\Paren}[1]{\left ( #1 \right )}
\newcommand{\Brac}[1]{\left [ #1 \right ]}
\newcommand{\poly}{\text{poly}}
\newcommand{\cN}{\mathcal{N}}
\newcommand{\tensor}{\otimes}

We have seen examples of worst-case analysis as well as how SoS can exploit strucure to improve on its worst-case performance.

Today's theme: random polynomials.

First question: what upper bound can SoS certify on a random polynomial over the cube?

Most convenient today to work over the $\{\pm 1\}$ hypercube.

Question 1: Let $f(x) = \sum_{\alpha \subseteq [n]} g_\alpha x^\alpha$ where $g_\alpha \sim \cN(0,1)$, with $|\alpha| = k$. Let $d \geq k$ an integer. What is the least $c = c_n$ such that (whp) $\proves_d f(x) \leq c$?

(We'll assume every term appears only once in the sum above.)

Most important cases: $k = 2,3,4$.

Applications later in lecture: random CSPs, finding optimum of random polynomial, tensor completion.

(There are other applications: privacy, robust stats,...)

### $k=1$

When $k=1$, have a linear function -- should be easy. True opt is $\sum |g_i|$, and degree-2 SoS certifies this via $x_i \leq 1$.

### $k=2$

Quadratic optimization problem. Not hard to show that OPT is of order $\Theta(n^{1.5})$.
(sqrt $n$ standard deviations, Gaussian of variance $n^2$.)

Certificate: opportunity to use spectral to SoS lemma. (which we have seen implicitly before).

*Lemma:* Suppose $f(x) = (x^{\tensor d})^\top M x^{\tensor d}$, $M$ symmetric$. Then $\proves_d f \leq \|M\| \cdot n^d$.

*Proof:* $\|M\| I - M \succeq 0$. QED

Now we'd like to give an SoS certificate that whp, $f(x) \leq O(n^{1.5})$ for degree-2 Gaussian $f$.

We will construct a random matrix $M$ out of the coefficients of $f$.

Need some insight into random matrices.

*Singular values and norms, refresher:* for an $s \times t$ matrix $M$, with $s \leq t$, have $\leq s$ positive singular values. $\|M\|_F^2 = $ sum of squared entries of $M$, also $\|M\|_F^2 = \sum \sigma_i^2$. And $\|M\| = \sigma_{\max}$.

*Random matrix rule of thumb:* if $M$ is an unstructured random matrix, there are no extreme singular values --> $\sigma_\max^2 \approx \frac 1 s \|M\|_{F}^2$.

Lots of tools for making this formal in various cases. Our main tool today: Matrix Bernstein inequality.

*Matrix Bernstein:* Let $A_1,\ldots,A_n \in \R^{d \times d}$ indepedent, symmetric, $\E A_i = 0$, $\|A_i\| \leq R$ w.p. 1. Then $\E \|\sum A_i\| \leq O(\| \sum \E A_i^2 \|^{1/2} \sqrt{\log d} + R \log d)$.

Now to show $\proves_2 f(x) \leq O(n^{1.5} \log n)$.

*Lemma:* If $M \in \R^{n \times n}$ has iid $N(0,1)$ entries (subject to symmetry), $\E \|M\| \leq O(\sqrt{n \log n})$.

*Proof:* Write $M$ as a sum of independent matrices $A_{ij}$. $\E A_{ij}^2 = E_{ii} + E_{jj}$. So $\sum \E A_{ij}^2 = O(n I)$. Furthermore, can condition on $\|A_{ij}\| \leq O(\log n)$. So w.p. 0.99 have $\|M\| \leq O(\sqrt{n \log n} + \log n) = O(\sqrt{n \log n})$. QED.

This immediately proves that $\proves_2 f(x) \leq O(n^{1.5} \sqrt{\log n})$.

Maximum of degree-$2$ polynomial over hypercube can be certified by eigenvalues of associated random matrix, up to logarithmic factor. (Can be removed.)

### Even $k$.

In general, optimum value is now seen to be $\Theta(n^{(k+1)/2})$.
But, $\proves_{O(k)} f(x) \leq O(n^{(k+1)/2})$?

*Lemma:* For even $k$, $\proves_{O(k)} f(x) \leq n^{3k/4}$.

*Proof:* Treat $f(x)$ as a degree-$2$ polynomial in $N = n^{k/2}$ variables. Apply $k=2$ case to get the bound $N^{1.5} = n^{3k/4}$.

Natural question: can you do better? For degree-$O(k)$ SoS, answer is no.
(We will see related ideas later in the course.)
Can any algorithm do better? We also believe no though evidence is thinner.

### Odd $k$.

Optimum value still $n^{(k+1)/2}$.
Turns out still have $\proves_{O(k)} f(x) \leq n^{3k/4}$, but needs additional idea to prove this.

Consider $k=3$.
For $k=2$ and $k=4$, there are square matrices we can associate to the random polynomial $f$ -- $n \times n$ and $n^2 \times n^2$, which have maximum singular value comparable to average singular value.
What about for $k=3$? Pattern matching suggests we want an $n^{1.5} \times n^{1.5}$ random matrix to spread out the coefficients of $f$.

Natural approach: $f(x) = x^\top M x^{\tensor 2}$, where $M \in \R^{n \times n^2}$ has $M_{i,jk} = g_{ijk}$.
Problem: this matrix is rectangular -- will only have $n$ nonzero singular values in which to spread out the Frobenius mass.
What is the best bound we could hope to certify with this matrix?
Best-case scenario: top singular value will is $\Theta(n)$.
Best we could hope to certify is $f(x) \leq \|M\| \|x\|^{1.5} = \|M\| \cdot n^{3/2} \approx n^{10/4}$ (assuming we prove a non-square version of the spectral upper bound lemma).
We're looking for $n^{9/4}$ -- might seem like a small difference, but translates to a big difference in e.g. how many entries of a tensor are needed to complete it (as we will see later in lecture).

Let's look for a polynomial which upper-bounds $f$ and which has an associated square matrix with nice singular values.

\begin{align*}
f(x)^2 & = \Paren{\sum_{ijk} g_{ijk} x_i x_j x_k}^2\\
& = \Paren{\sum_i x_i \sum_{jk} g_{ijk} x_j x_k}^2\\
& \preceq \Paren{\sum_i x_i^2} \Paren{ \sum_i (\sum_{jk} g_{ijk} x_j x_k)^2}\\
& = n \cdot \Paren{ \sum_i (\sum_{jk} g_{ijk} x_j x_k)^2}
\end{align*}

(Notation $\preceq$ means RHS - LHS is an SoS.)

Now look at $\sum_{jk, j'k'} x_j x_k x_{j'} x_{k'} \sum_i g_{ijk} g_{ij'k'}$.
We can build a $n^2 \times n^2$ matrix (square!) out of it, $M_{jk, j'k'} = \sum_{i} g_{ijk} g_{i j'k'}$.
But this matrix has rank $n$, at most $n$ singular values -- bad news! Can write it as $M =\sum_i g_i g_i^\top$.

Cool trick: switch some indices! 
$M_{jk, j'k'} = \sum_i g_{ijj'} g_{ikk'}$ still has $x^{\tensor 2} M x^{\tensor 2} = \sum_i (\sum_{jk} g_{ijk} x_j x_k)^2$, but now doesn't have this rank-$n$ factorization.

We can visualize this transformation a bit: the polynomial $f$ can be viewed as a tensor, then the $g_{i,\cdot,\cdot}$ are matrix slices of this tensor.
The degree-4 form $\iprod{x, g_i x}^2$ can be written as $(x^{\tensor 2})^\top (g_i^{flat} (g_i^{flat})^\top) x^{\tensor 2}$ or as $x^{\tensor 2} (g_i \tensor g_i) x^{\tensor 2}$.

Since it's "unstructured", we can hope that the rule of thumb applies.
Computing the Frobenius norm -- each entry is like $\sqrt{n}$ and there are $n^4$ entries, so get $n^{5}$. $n^2$ singular vals so hopefully $\|M\| \approx n^{1.5}$.
(This is true; you can prove it with Matrix Bernstein; can shave log factors if you want using fancier methods.)

So get $\proves_{2(k+1)} f(x)^2 \leq n \cdot n^{1.5} \cdot n^2 = n^{9/2}$. Looking good! Just need to get rid of the square.

*Lemma:* if $\proves_{2d} f^2 \leq B$ then $\proves_d f \leq \sqrt{B}$.
*Proof:* $f = f \tfrac 1 {B^{1/4}} B^{1/4} \preceq \tfrac 12 (f^2/{\sqrt{B}} + \sqrt{B})$, then compose with hypothesis. 

This completes the proof that w.p. $0.99$, for $k=3$, $\proves_{O(1)} f(x) \leq n^{9/4} (\log n)^{O(1)}$.

## Getting past constant-degree SoS: Kikuchi matrices

What can we do with higher degree SoS proofs here?
Let's return to $k=4$ for concreteness.

*Theorem:* For degree-$4$ random $f$, for all $d$, whp $\proves_{O(d)} f(x) \leq n^3 / \sqrt{d} \cdot (\log n)^{O(1)}$.

(This can be extended to other degrees $k$ in the natural way.)

We need to spread $f$ out into a bigger matrix.

Several approaches to do this -- one approach is to take a high power of $f$, say $f^d$, expand into a matrix, and then play tricks with coefficients somewhat analogous to what we did with $d=3$, exploiting the power to average over all permutations of $[d]$.

A simpler approach: Kikuchi matrices.

We need to relate $f$ to some higher-degree polynomial. We choose

$$f(x) = \sum_{ijk \ell} \E_{S \sim [n]^{(d-4)/2}} g_{ijk\ell} x_i x_j x_k x_\ell x^{2S}$$

which we can alternatively write as

$$f(x) = \frac 1 {\binom{n}{(d-4)/2}} (x^{\tensor d/2})^\top \sum_{ijk \ell} g_{ijk\ell}  A_{ijk\ell} x^{\tensor d/2}$$

where $A_{ijk \ell}[S,T] = 1$ if $S \Delta T = \{ijk \ell\}$ and otherwise $0$.

$\sum_{ijk\ell} g_{ijk\ell} A_{ijk\ell}$ is the *Kikuchi matrix* associated to $f$.

Computation shows that $A_{ijk\ell} A_{ijk\ell}^\top$ is diagonal, with $1$ on the diagonal only if $S$ contains some $2$ of $\{ijk\ell\}$.
So $\sum_{ijk\ell} A_{ijk\ell}A_{ijk\ell}^\top \preceq d^2 n^2 I$.
