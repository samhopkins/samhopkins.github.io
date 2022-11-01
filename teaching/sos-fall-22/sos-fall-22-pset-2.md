## Problem Set 1

\newcommand{\E}{\mathbb E}
\newcommand{\pE}{\tilde{\mathbb E}}
\newcommand{\e}{\varepsilon}
\newcommand{\proves}{\vdash}
\newcommand{\models}{\vDash}
\newcommand{\N}{\mathbb{N}}
\newcommand{\R}{\mathbb{R}}
\newcommand{\iprod}[1]{\langle #1 \rangle}
\newcommand{\Brac}[1]{\left [ #1 \right ]}
\newcommand{\poly}{\text{poly}}

Please turn in a PDF of typeset solutions solutions using LaTeX. Please turn in the pset by emailing me this pdf.

*This pset may have bugs! Please email me, or reach out on Piazza, if you think there is a bug in a problem!*

Due: TBD

You may use external resources such as Wikipedia to look up material which would reasonably be a prerequisite for this course (undergraduate-level algebra, linear algebra, probability, etc.). These exercises are designed to teach you something interesting about SoS and to acquaint you with an idea we won't have time to cover in lecture. As such, solutions to some of them may appear in the research literature or in reference material for this course. Please avoid using such solutions, and if you find you have already read one, please set aside the corresponding problem for a few days before working on it again.

**Problem 1, 10 pts** *(On "Satisfies," borrowed from Aaron Potechin)*: Consider the following polynomial equation in $3$ variables, $x,y,z$:
$$(x^2 + 1)y = z^2.$$
Since it implies $y = z^2 / (1+x^2)$, clearly any solution $(x,y,z)$ has $y \geq 0$. We will see if SoS can capture this reasoning.

*Part A:* Show that there is a degree-4 pseudoexpectation $\pE$ in variables $x,y,z$ such that $\pE \vDash (x^2 + 1)y = z^2$ but $\pE y < 0$. (Computer-aided proofs are fine.) In this exercise, take $\pE \vdash (x^2 + 1)y = z^2$, where $\pE$ is degree $4$, to mean that for any degree $\leq 1$ polynomial $p(x,y,z)$, we have $\pE p(x,y,z) (x^2 + 1)y = \pE p(x,y,z) z^2$. (This differs slightly from the definition we gave in class.)

*Part B:* Give an SoS refutation of the following system of inequalities, for any $c > 0$: $\{ (x^2 + 1)y = z^2, y \leq -c \}$.

**Problem 2, 20 pts** *(Robust Mean Estimation with Better Error Rates)*: Let $D$ be a distribution on $\R^d$, with mean $\mu$, such that $\{ \|v\|^2 = 1 \} \proves_{O(1)} \E_{X \sim D} \iprod{X-\mu,v}^4 \leq 1$. (We saw that if $D$ is a centered Gaussian then this is true.) For simplicity, assume also that $\|X\| \leq d^{O(1)}$ with probability $1$ for $X \sim D$.

In this problem you will show that there is a polynomial-time robust mean estimation algorithm which takes $\e$-corrupted samples $X_1,\ldots,X_n$ from $D$ and returns $\hat{\mu}$ such that $\|\hat{\mu} - \mu\| \leq O(\e^{3/4})$. (In class we proved only $O(\sqrt \e)$.)

*Part A:* Show that, with high probability over $X_1,\ldots,X_n \sim D$, for $n \leq d^{O(1)}$, $\{\|v\| = 1\} \proves_{O(d)} \frac 1 n \sum_{i \leq n} \iprod{X_i - \overline{\mu},v}^4 \leq 1.01$, where $\overline{\mu} = \frac 1 n \sum_{i \leq n} X_i$.

*Part B:* Construct a system of equations $Q_{Y_1,\ldots,Y_n}$ in variables $w_1,\ldots,w_n, X_1',\ldots,X_n'$, and $(nd)^{O(1)}$ auxiliary variables such that 

(i) if $Y_1,\ldots,Y_n$ are an $\e$-corruption of any $X_1,\ldots,X_n$ for which the conclusion of Part A holds, and $w_1,\ldots,w_n$ are the indicators for $i$ such that $X_i = Y_i$, and $X_i' = X_i$, then the auxiliary variables can be set so that $Q$ is satisfied, and

(ii) $Q \cup \{ \|v\|^2 = 1\} \proves_{O(1)} \frac 1 n \sum_{i \leq n} \iprod{ X_i' - \mu(X'),v}^4 \leq 1.01 \|v\|^2$, where $\mu(X') = \frac 1 n \sum_{i \leq n} X_i'$.

*Part C:* Show that the system of polynomials you constructed in Part B SoS-implies (in constant degree) the inequality $\|\overline{\mu} - \mu(X')\|^t \leq O(\e^{3/4})^t$, for some even $t$. (All whp over the non-corrupted samples $X_1,\ldots,X_n$.)

*Part D:* Describe a polynomial-time algorithm which achieves the robust mean estimation guarantee described above. (You don't need to provide a full analysis.)

*Part E:* Give 2 examples of non-Gaussian distributions on $\R^d$ which satisfy the hypotheses of this problem.


**Problem 3, 10 pts** *(Univariate Polynomials)*: Let $f(x) \, : \, \R \rightarrow \R$ be a nonnegative polynomial with real coefficients. Prove that $f$ is a sum of squares. You may assume the following form of the fundamental theorem of algebra: every univariate polynomial with real coefficients of degree $d$ has exactly $d$ complex roots (counted with multiplicity).

**Problem 4, 10 pts** *(Exact Matrix Completion)*: In class we saw a way to use SoS for matrix/tensor completion which incurred some error -- for instance, using $m$ randomly-chosen entries from a low-rank $n \times n$ matrix $M$ with entries in $[-1,1]$, we were able to find $\hat{M}$ such that $|\hat{M}_{ij} - M| \approx n/m$.

In this problem we will see a glimpse of how to do better, by constructing a more sophisticated kind of SoS proof.

Let $M$ be an $n \times n$ matrix of rank $r$, $M = \sum_{i=1}^r a_i a_i^\top$, such that $a_1,\ldots,a_r$ are orthonormal and $\|a_i\|_\infty \leq O(1/\sqrt n)$. It turns out that, under this assumption, if $\Omega$ is a randomly chosen set of $m \gg r n (\log n)^2$ entries of $M$, then with high probability there exists a symmetric matrix $A$ such that
$$-0.9(I - M) \preceq A - M \preceq 0.9(I - M),$$
and furthermore, $A$ is nonzero only on entries in $\Omega$. Intuitively, this says that there is a matrix $A$ which is zero off of $\Omega$ and which agrees perfectly with $M$ in directions $a_1,\ldots,a_r$, incurring error only in the orthogonal complement of $a_1,\ldots,a_r$.

(The construction of this matrix is not at all obvious and we will not investigate it here.)

Show the following consequence: if the matrix $A$ exists, then the following implication has a degree $O(1)$ SoS proof. If $B$ is an $n \times r$ matrix of variables, then $\{ (BB^\top)_{ij} = M_{ij} \text{ for } ij \in \Omega, B^\top B = I_{r \times r} \} \proves_{O(1)} \|BB^\top - M\|_F^2 = 0$. This says that the entries $\Omega$ perfectly identify $M$, and furthermore that this identifiability has an SoS proof.
