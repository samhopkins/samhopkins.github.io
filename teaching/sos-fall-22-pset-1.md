## Problem Set 1

\newcommand{\E}{\mathbb E}
\newcommand{\pE}{\tilde{\mathbb E}}
\newcommand{\e}{\varepsilon}
\newcommand{\proves}{\vdash}
\newcommand{\N}{\mathbb{N}}
\newcommand{\R}{\mathbb{R}}
\newcommand{\iprod}[1]{\langle #1 \rangle}
\newcommand{\Brac}[1]{\left [ #1 \right ]}
\newcommand{\poly}{\text{poly}}

Please turn in a PDF of typeset solutions solutions using LaTeX. (Turn-in instructions TBA.)

*This pset may have bugs! Please email me, or reach out on Piazza, if you think there is a bug in a problem!*

Due: October 14

You may use external resources such as Wikipedia to look up material which would reasonably be a prerequisite for this course (undergraduate-level algebra, linear algebra, probability, etc.). These exercises are designed to teach you something interesting about SoS and to acquaint you with an idea we won't have time to cover in lecture. As such, solutions to some of them may appear in the research literature or in reference material for this course. Please avoid using such solutions, and if you find you have already read one, please set aside the corresponding problem for a few days before working on it again.


**Problem 1, 10 pts** *(Size of SoS coefficients)*:  In lecture 1, we stated, but did not prove, that SoS proofs of nonnegativity over the hypercube can without loss of generality be taken to have coefficients expressible in a small number of bits. This is an important component of the proof that a polynomial-time algorithm using semidefinite programming can find such SoS proofs, if they exist.

*Part A:* Let $f \, : \, \{0,1\}^n \rightarrow \R$ be a Boolean function on $n$ bits, with $|f(x)| \leq n^{O(d)}$ for all $x$, and let $d \in N$ be even. Suppose that $\proves_d f \geq 0$. Show that there are $p_1,\ldots,p_m \in \R[x]_{\leq d}$ with $m \leq n^{O(d)}$ such that the magnitude of every coefficient of each $p_i$ when written as a multilinear polynomial is at most $n^{O(d)}$.

<details>
<summary>Hint 1 (click to expand)</summary>
If $p_1,\ldots,p_m$ witness $\proves_d f \geq 0$, then what can we say about the magnitude of $\E_{x \sim \{0,1\}^n} \sum p_i(x)^2$?
</details>

<details>
<summary>Hint 2 (click to expand)</summary>
Take $p_1,\ldots,p_m$ to be multilinear. Then what does a bound on $\E_{x \sim \{0,1\}^n} \sum p_i(x)^2$ say about the magnitude of the coefficients of the $p_i$'s?
</details>

*Part B:* The Ellipsoid algorithm for finding a point in a convex set has the following guarantee. If $\mathcal{C} \subseteq \R^n$ is contained in a ball of radius $R$ and contains a ball of radius $r$, then Ellipsoid returns a point in $\mathcal{C}$ after $O(\log R / r)$ calls to a separation oracle for $\mathcal{C}$.

Show that there is a polynomial-time algorithm which takes as input a degree-$d$ function $f \, : \, \{0,1\}^n \rightarrow \R$, represented as a list of $n^{O(d)}$ rational coefficients of magnitude at most $n^{O(d)}$, and a parameter $\e > 0$, and if $\proves_d f \geq 0$, returns a proof $p_1,\ldots,p_m$ witnessing $\proves_d f + \epsilon \geq 0$, in time $(n^d \cdot \log (1/\e))^{O(1)}$.

You may assume that there is a polynomial-time separation oracle for the set of PSD matrices -- that is, an algorithm which, given an $N \times N$ matrix $M$ of rationals as input, either certifies that this matrix is PSD or returns a PSD matrix $X$ such that $\iprod{X,M} < 0$ but $\iprod{X,P} \geq 0$ for all $P \succeq 0$.

**Problem 2, 10 pts** *(Max cut in almost-bipartite graphs):* Show that there is a polynomial-time algorithm with the following guarantee: given a graph $G = (V,E)$ such that there is a cut which cuts $(1-\e)|E|$ edges, the algorithm outputs a cut which cuts $(1-\tilde{O}(\sqrt{\e}))|E|$ edges. $(\tilde{O}$ can hide factors of $\log(1/\e)$, though this is not strictly necessary.)

You may use the following basic anticoncentration fact for Gaussians: if $Z \sim N(0,1)$, then $Pr(|Z| \leq \delta) = O(\delta)$.

<details>
<summary>Hint 1 (click to expand)</summary>
Use the Gaussian rounding scheme from lecture.
</details>

<details>
<summary>Hint 2 (click to expand)</summary>
What is the probability that a 2-variable Gaussian distribution $(g,h)$ with $\E g^2 = \E h^2 = 1$ and $\E (g-h)^2 \geq 4-\e$ has $sign(g) \neq sign(h)$?
</details>


**Problem 3, 10 pts** *(Min Bisection):* Min-bisection is the following optimization problem on graphs. Given a graph $G = (V,E)$, with $|V|$ an even number, the goal is to find
$$ \min_{S \subset V, |S| = n/2} E(S,\overline{S})$$
where $E(S,\overline{S})$ denotes the set of edges crossing the cut $(S,\overline{S})$.

In this exercise, we will see another application of the *low global correlation* idea to round pseudoexpectations for min bisection. The goal will be to prove the following theorem:

*Theorem:* For every $\e > 0$, there is an algorithm running in time $n^{(1/\e)^{O(1)}}$ which $(1+\e)$-approximates the min-bisection value in dense graphs.

It turns out that the ideas to prove this result can be combined with an extension of the ideas in Problem 2 to prove the following stronger theorem (which is not conceptually different but requires more technical work to prove): there is a polynomial time algorithm which, given a graph in which the min-bisection value is at most $\e |E|$, returns a bisection cutting $O(\sqrt{\e})|E|$ edges.


*Constrained pseudoexpectations:* You may assume that there is an $n^{O(d)}$-time algorithm for the following problem: given a graph $G$, find a pseudoexpectation $\pE$ of degree $d$ minimizing $\pE \sum_{i \sim j} (x_i - x_j)^2$ among all $\pE$ with the following "balance" property: for all polynomials $p$ of degree at most $d-1$, $\pE p(x) \cdot \sum_{i \leq n} x_i = \tfrac n 2 \pE p(x)$. (We are ignoring some minor numerical issues here.) Notice that this property would be satisfied by $\E_\mu p(x)$ for any distribution $\mu$ on bisections; that is, on Boolean vectors with $\sum_{i \leq n} x_i = n/2$.

*Part A:* Prove that if $\pE$ is a degree-$d$ pseudoexpectation satisfying the balance property above, and if $\pE'$ is the result of conditioning $\pE$ on the values of $t \ll d$ variables, then $\pE'$ also satisfies the balance property.

*Part B:* Consider independent rounding applied to $\pE$ to produce a Boolean vector $y \in \{0,1\}^n$. Show that if the global information of $\pE$ is $\delta$, then $Var(\sum y_i) \leq \delta^{\Omega(1)} n^2$.

*Part C:* Prove the above theorem on the min-bisection value in dense graphs. You may appeal to any facts from lecture about global information, correlation rounding, etc.

**Problem 4, 10 pts** *(Fun with SoS Proofs):* 

*Part A (Cauchy-Schwarz):* For every family of degree-$d$ polynomials $p_1(x),\ldots,p_m(x), q_1(x),\ldots,q_m(x)$, show that 
$$\proves_{4d} (\sum_{i \leq m} p_i(x)^2 )(\sum_{i \leq m} q_i(x)^2) - (\sum_{i \leq m} p_i(x) q_i(x))^2 \geq 0.$$

*Part B (Cauchy-Schwarz, Pseudoexpectation version):* Show that for every degree-$d$ pseudoexpectation $\pE$ and every degree $d/2$ polynomials $p,q$, $\pE pq \leq \sqrt{\pE p^2 \cdot \pE q^2}$. 

*Part C (Approximate Triangle Inequalities):* Show that there is a constant $C$ (indep. of $m$) such that for vectors of polynomials $p_1(x),\ldots,p_m(x), q_1,(x),\ldots,q_m(x)$,
$$ \proves_{O(1)} C (\|p\|_2^2 + \|q\|_2^2) - \| p + q \|_2^2 \geq 0$$
and in fact for every even $t$, there is $C_t$ such that
$$ \proves_{O(t)} C_t (\|p\|_t^t + \|q\|_t^t) - \|p+q\|_t^t \geq 0.$$


**Problem 5, 10 pts** *(Finding hidden cliques):* 

*Part A:* A random graph $G$ on $n$ vertices (containing each possible edge independently with probability $1/2$) contains, with high probability, a clique of size $(2 -o(1))\log n$, and no clique larger than $(2+ o(1)) \log n$. But, are there SoS proofs of the latter fact? 

Show that the following sort of SoS proof (somwhat different from what we have discussed thus far) exists with high probability over choice of a random $G$:
$$O(\sqrt n) - \sum_{i \leq n} x_i = \sum_{i,j \leq n, i \not \sim j} p_{ij}(x) x_i x_j + \sum_{i \leq m} q_i(x)^2, \text{ for all } x \in \{0,1\}^n,$$
where $p_{ij}, q_i$ are polynomials of degree at most $O(1)$, and $i \not \sim j$ means that $i$ and $j$ are not adjacent in $G$.

(First, argue that the existence of such polynomials rules out cliques in $G$ of size $\gg \sqrt n$.)

You may use the following fact about random graphs. If $G$ is a random graph and $A$ is its adjacency matrix, then with high probability, $\|A - \tfrac 12 11^\top\| \leq O(\sqrt n)$, where $1$ denotes the all-$1$s vector.

*Part B (robustness against monotone adversary):* Argue that the same type of SoS proof exists with high probability for a random graph $G$ which has been adversarially perturbed in the following way: observing the graph, a malicious adversary removes (but does not add) an arbitrary set of edges.

*Part C (recovering a clique):* Consider the following *planted clique* distribution on random graphs: a graph $G$ is sampled uniformly, and then a subset $S$ of vertices of size $k$ is also chosen uniformly at random. Any edges with both endpoints in $S$ are added to $G$, so that $S$ is a clique in $G$. 

Show that there is a polynomial-time algorithm which, with probability at least $0.99$, finds $S$ given $G$, assuming $k \geq C\sqrt{n}$ for a large-enough constant $C$.

Show furthermore that this algorithm still finds $S$ even if a monotone adversary removes any non-clique edges from $G$ before your algorithm receives $G$ as input.

You may assume that there is a polynomial-time algorithm for the following problem: given a graph $G$ and constant $d$, find a degree-$d$ pseudoexpectation maximizing $\pE \sum_{i \leq n} x_i$ among all $\pE$ with the following property: for each non-edge $(i,j)$ in $G$, and every polynomial $p$ of degree at most $d-2$, $\pE p(x) \cdot x_i x_j = 0$. (That is, $\pE$ ``looks like'' the moments of a distribution supported only on cliques in $G$.)

*Explanation:* There are less-sophisticated algorithms for finding a planted clique of size $\gg \sqrt n$ in a random $n$-vertex graph. So, why study the SoS-based algorithm?

Take, for instance, an algorithm based on eigenvectors of the adjacency matrix -- it turns out that for $k \gg \sqrt n$, the top eigenvector of the (centered) adjacency matrix is well-aligned with the indicator vector for the clique (in the non-adversarial case), and this can be used to find the hidden clique. However, this algorithm is in some sense *overfit* to the random-graph model: the monotone adversary, who intuitively shouldn't make finding a planted clique harder -- after all, she is making the rest of the graph *less* "clique-y" -- can actually make this spectral algorithm fail.

SoS-based algorithms often have appealing robustness guarantees, making the details of the theoretical model in which one analyzes them less important. This is nice, since in real life you rarely know if any assumptions you have made about input data to make some theoretical analysis work actually hold for the data you have in hand.