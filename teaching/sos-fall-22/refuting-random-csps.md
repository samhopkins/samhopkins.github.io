# Refuting Random CSPs

Lecturer: Sam Hopkins
Scribe: Benjamin Qi

**Alert: these notes are a work in progress, and have not been subjected to the usual scrutiny reserved for formal publications!**

$$
\newcommand{\O}{\mathcal O}
\newcommand{\TO}{\tilde{\mathcal O}}
\newcommand{\E}{\mathbb E}
\newcommand{\pE}{\tilde{\mathbb E}}
\newcommand{\e}{\varepsilon}
\newcommand{\vphi}{\varphi}
\newcommand{\proves}{\vdash}
\newcommand{\N}{\mathbb{N}}
\newcommand{\R}{\mathbb{R}}
\newcommand{\iprod}[1]{\langle #1 \rangle}
\newcommand{\Brac}[1]{\left [ #1 \right ]}
\newcommand{\paren}[1]{\left ( #1 \right )}
\newcommand{\poly}{\text{poly}}
\newcommand{\vmag}[1]{\left \| #1 \right \|}
$$

We've already seen how SOS can provide better worst-case guarantees for max-cut. Today we'll take our first foray into random instances. 

<!-- The key is going to be constraint satisfication. We're going to generalize past max-cut as our sandbox. (?) -->

## Constraint Satisfication Problems

For this lecture, we will consider the hypercube over $\{-1,1\}^n$ rather than $\{0,1\}^n$. 

**Definition (Constraint):** We define a constraint to be a predicate of the form $\phi \colon \{\pm 1\}^k\to \{0,1\}.$ The constraint is said to be satisfied if it evaluates to $1$. Throughout this lecture we assume that $k$ is constant, and that the constraint is non-trivial: there exists $z\in \{\pm 1\}^k$ such that $\phi(z)=0$.

**Definition (Constraint Satisfication Problem).** An instance $\vphi\in \text{CSP}_{\phi}^{n,m}$ on $n$ variables $x_1,\dots,x_n\in \{\pm 1\}$ and $m$ constraints can be written as $\vphi(x)=\sum_{i=1}^m\phi(x_{S_i}\circ y_i).$ The constraints are represented by tuples $S_1,\dots, S_m\in [n]^k$ and $y_1,\dots, y_m\in \{\pm 1\}^k$, which specify whether the variables will be negated in each constraint. 

*Note on Notation:* If $S=(1,2)$ and $y=(+1, -1)$ then $x_S\circ y=(x_1,-x_2)$.

We can express interesting combinatorial objects as instances of CSPs. Some examples:
 - max-cut: $\phi(x_1,x_2)=\Brac{x_1\neq x_2}$.
 - SAT: $\phi(x_1,\dots,x_k)=\text{OR}(x_1,\dots,x_k)$
 - NAE-SAT (NAE stands for "not all equal"): $\phi=1$ if at least one $x_i$ is $1$ and not all $x_i$ are $1$.

## Random CSPs

CSPs also give us an interesting class of optimization problems. Specifically, how can we find a satisfying assignment or an assignment that satisfies as many constraints as possible? Formally, given $\vphi \sim \text{CSP}_{\phi}^{n,m}$, what is $\max_{x\in \{\pm 1\}^n}\vphi(x)$?


In the worst case, CSPs are hard. By the PCP Theorem, there exists $\e>0$ such that distinguishing between satisfiable 3SAT formulas and 3SAT formulas where at most $1-\e$ of the clauses can be satisfied (Gap-3SAT$[1-\e, 1]$) is NP-Hard. But some SAT-solvers (e.g., [Z3](https://en.wikipedia.org/wiki/Z3_Theorem_Prover)) do well in practice. Worst-case analysis isn't telling us the whole story. Sometimes analyzing behavior on random instances is more useful.

<!-- Maybe behavior on random instances is more useful than worst-case instances. Sometimes useful to have problems that are average-case hard. -->

<!-- Worst-case CSPs are NP-Hard $\to$ "choked-off" from algorithm design?? -->

*Standard model of random CSPs:* An instance of CSP with $m$ clauses $S_{1\dots m}, y_{1\dots m}$, where each $S_i$ and $y_i$ is chosen and independently and uniformly at random.

The model we consider today is slightly different than the standard one; it makes the math easier but is essentially the same. Specifically, we include every possible $S\in [n]^k$ independently with probability $m/n^k$. We refer to this probability as the clause density, and it is typically much less than $1$.

-----

<!-- If you just want to output the number, just compute:

$$\max_{x}\vphi(x)\approx \E_{\vphi}\max_x\vphi(x).$$

But this is not very useful.


What if we want to find $x$?
 -->
 
There are several regimes depending on how $m$ compares to $n$.
 - $m\gg n\implies$ no "interesting" $x$'s. $\max_{x}\vphi(x)\approx \E_{\vphi}\max_x\vphi(x)$.
 - $m\ll n \implies$ many $x$'s such that $\vphi(x)=m$. Use local search (not particularly interesting).
 - $m=\Theta(n)$: studied heavily in statistical physics. There are interesting algorithmic ideas (belief propagation and survey propagation, for instance).

<!-- In between, we don't know how to do better than local search. -->


## Refutations

**Definition (Refutation):** An algorithm $\text{ALG}$ that given $\vphi\in \text{CSP}_{\phi}^{n,m}$, outputs $\text{ALG}(\vphi)\in [0,m]$ such that:

1. $\text{ALG}(\vphi)\ge \max_x\vphi(x)$ for any $\vphi$
2. $\E\Brac{\text{ALG}(\vphi)} \le (1-\delta)m$ where $\delta=\Omega(1)$. This is known as *strong* refutation.

This is interesting in the regime where $m\gg n$.

Note that if $\text{ALG}$ runs in polynomial time and $\text{ALG}(\vphi)\le (1-\Omega(1))m$, then $\text{ALG}$ is a "proof system" for $\vphi$. Specifically, the computation trace of $\text{ALG}$ (i.e., the list of Turing machine moves when executed on $\vphi$) provides a proof (a $\text{poly}(|\vphi|)$-length string) that $\text{ALG}(\vphi)\le (1-\Omega(1))m$, and hence that $\max_x \phi(x) \leq (1-\Omega(1))m$. So if a polynomial-time $\text{ALG}$ exists, then proofs for most $\vphi$ will exist.

<!-- *Claim:* If we design an algorithm that runs in polynomial time, we have a proof system.

(TODO: figure out what this means) -->

*Question:* How big does $m=m(n)$ need to be so that such $\text{ALG}$ exists? The intution is that the more clauses there are, the easier it should be to refute the existence of highly satisfying assignments.

<!-- Last time, we used SOS of degree 2 to refute max-cuts. -->

-----

Potential $\text{ALG}$: For $d\in \N$: find the least $c$ such that $\proves_d \phi(x)\le c$ in $n^{O(d)}$ time.

**Theorem:** $\forall \phi$, if $m\gg n^{k/2}\cdot (\log n)^{O(1)}$, $\exists \delta>0$ such that whp, $\proves_{O(k)}\vphi(x)\le (1-\delta)m$.

**Proof:** We will show that we can reduce general $\phi$ to the case of $k$-XOR. $k$-XOR is defined as 

$$\phi(z)=\begin{cases}
+1 & \prod_{i=1}^kz_i=1 \\
0 & \prod_{i=1}^kz_i=-1
\end{cases}.$$

Note that when $\phi$ represents $k$-XOR, $\phi(x_{S_i}\circ y_i)$ depends only on $\prod_{j\in S_i} x_j\cdot \prod_{j\le k}y_{ij}$, so we can replace the list of signs $y_{i,1\dots k}$ with a single sign $a_i\in \{\pm 1\}$.

*Definition:* Assume that $\phi$ represents $k$-XOR (where $k>0$). Given $\vphi\in \text{CSP}_{\phi}^{n,m}$, define $\psi(x)\triangleq \sum_{i=1}^ma_i \prod_{j\in S_i}x_j=(\#\text{ sat})-(\#\text{ unsat})$.

-----

Now let's return to the case of general $\phi$. We can decompose $\phi$ into its fourier coefficients: $\phi(z)=\sum_{T\subseteq [k]}\hat{\phi}_T\cdot z_T$. Given any instance $\vphi\sim \text{CSP}_{\phi}^{n,m}$, we may decompose it into $2^k$ $k'$-XOR instances with $0\le k'\le k$ like so:

$$\vphi(x)=\sum \phi(x_{S_i}\circ y_i)=\sum_{T\subseteq [k]}\hat{\phi}_T\sum_{i}\prod_{j\in T}y_{ij}\prod_{j\in T}(x_{S_i})_j=\hat{\phi}_{\emptyset}+\sum_{\emptyset\neq T\subseteq [k]}\hat{\phi}_T\psi_T(x).$$

-----

Observe that each $\psi_T$ is a random instance of $k'$-XOR for $0< k'\le k$. If we can show $\proves_{O(k)}\psi_T(x)\le \e \cdot m$ and $\proves_{O(k)}-\psi_T(x)\le \e \cdot m$ for all $T$, then

\begin{align*}
\proves_{O(k)}\vphi(x)&\le \hat{\phi}_{\emptyset}+\sum_{T\subseteq [k], T\neq \emptyset}\hat{\phi}_T \psi_T(x)\\
&\le (\hat{\phi}_{\emptyset}+\O(2^k\e))m.
\end{align*}

If $\e \ll 2^{-k}$, we've refuted $\vphi(x)$, since $\hat{\phi_\emptyset} < 1$ by our assumption that $\phi(z) = 0$ for some choice of $z \in \{ \pm 1\}^k$.


*Note:* if the max degree over all nonzero coefficients in the Fourier expansion of $\phi$ is $k'<k$, then we only need $m\ge \tilde{\Omega}\paren{n^{k'/2}}$ rather than $m\ge \tilde{\Omega}\paren{n^{k/2}}$. For example, 3-NAE-SAT has $\hat{\phi}_{\{1,2,3\}}=0$, so it can be refuted with $m\le \TO(n^{2/2})=\TO(n)$. Here, the tilde hides factors of $\log n$.

## Refutation for XOR

It remains to tackle the case of $k$-XOR. *Weakly* refuting $k$-XOR is actually easy -- treating a $k$-XOR instance as a set of linear equations over $\mathbb{F}_2$, you can use Gaussian elimination to check if there is an assignment $x \in \{\pm 1\}^n$ which satisfies all the equations; if there isn't, you know that $\psi(x) \leq m - 1$. But we need a much stronger refutation: $\psi(x) \leq \e m$ for some tiny $\e$. That is, we want a proof that no assignment satisfies more than a $(1/2 + \e)$-fraction of the clauses -- note that this is the best we can hope for, since a random assignment satisfies $1/2$ of the clauses.

The main tools we use are as follows:

1. Spectral SoS certificates.

   *Claim:* Let $d$ be even and let $f \, : \, \{-1,1\}^n \rightarrow \R$. Suppose $f(x)$ has $f(x) = (x^{\otimes d/2})^T M x^{\otimes d/2}$ over $x\in \{\pm 1\}^n$, where $M$ is a symmetric matrix. Then $\proves_d f(x)\le n^{d/2}\vmag{M}$.
   
   *Proof:* 
   
   \begin{align*}
   \vmag{M}I-M\succeq 0 \implies 0&\preceq (x^{\otimes d/2})^T(\vmag{M}I-M)x^{\otimes d/2} \\
   &=\vmag{M}\cdot \vmag{x}_2^d-f(x)\\
   &=\vmag{M}n^{d/2}-f(x).
   \end{align*}
   Here we have used the notation that $g(x) \succeq 0$ for a polynomial $g$ if it is a sum of squares.
   
   
2. Matrix Bernstein Inequality.

   *Aside:* The [Ordinary Bernstein Inequality](https://en.wikipedia.org/wiki/Bernstein_inequalities_(probability_theory)) is *roughly* as follows. Given independent random variables $a_1,\dots,a_n$ such that $\E a_i=0$ and $|a_i|\le R$, $\sum a_i$ is approximately Gaussian with variance $\E[\sum a_i^2]$ close to the origin.
   
   The matrix version is as follows. Given independent random symmetric matrices $A_1,\dots, A_n\in \R^{d\times d}$ with $\E A_i=0$ and $\vmag{A_i}\le R$ with probability 1,
   
   $$\E\vmag{\sum A_i}\le \O\paren{\vmag{\E \sum A_i^2}^{1/2}\cdot \sqrt{\log d}+R\log d}.$$

<!-- (BREAK 1)
 -->

### Part 1: $k=2$

Let $a_{ij}$ equal $\pm 1$ (whichever sign is appropriate) if $\phi(\pm x_i,\pm x_j)$ appears as a clause in $\vphi$, or $0$ otherwise. Then

$$\psi(x)=\sum_{ij}a_{ij}x_ix_j=x^T\paren{\sum a_{ij} E_{ij}}x.$$

Here $E_{ij}$ is the $n\times n$ matrix $M$ with $M_{ij}=M_{ji}=\frac{1}{2}$ if $i\neq j$ or $M_{ii}=1$ if $i=j$, and zeros everywhere else.

*Random matrix rule of thumb:* Let $M$ be a $D\times D$ symmetric matrix. It is [well-known](https://math.stackexchange.com/questions/620870/prove-that-the-square-sum-of-eigenvalues-is-no-more-than-the-frobenius-norm-for) that
$$\vmag{M}_F=(\ell_2\text{ norm of }M)=\sqrt{\sum \lambda_i^2}.$$ 

If $M$ is "unstructured" (not a well defined notion), then we can hope that $M$'s largest squared eigenvalue behaves like the average squared eigenvalue, in which case we would have that $\max \lambda_i\approx \frac{\vmag{M}_F}{\sqrt D}$.

If this occurs for the matrix $\sum a_{ij} E_{ij}$, we can see that the spectral norm would be around $\|\sum_{aij} E_{ij}\| \approx \sqrt{m/n}$. The calculation below shows that this is correct, at least when $m \gg n$.


-----

Now let's try to bound $\vmag{\sum a_{ij}E_{ij}}$. Observe that $\E \Brac{\sum_{ij} a_{ij}^2 E_{ij}^2}\approx \sum_{ij} \frac{m}{n^2}E_{ij}^2$ and

$$E_{ij}^2=\begin{pmatrix}
0 & 1/2 \\
1/2 & 0
\end{pmatrix}^2=\begin{pmatrix}
1/4 & 0\\
0 & 1/4
\end{pmatrix}=\frac{1}{4}\paren{E_{ii}+E_{jj}}.$$

So

\begin{align*}
\sum_{ij} \frac{m}{n^2}E_{ij}^2
&\preceq \O\paren{\frac{m}{n^2}\sum_{i,j}\paren{E_{ii}+E_{jj} }}\\
&= \O\paren{m/n^2\cdot n\cdot I_n}\\
&= \O(m/n\cdot I_n).
\end{align*}

Now by Matrix Bernstein, 
$$\E \vmag{\sum a_{ij}E_{ij}}\le \O\paren{\sqrt{m/n}\cdot \sqrt{\log n}+\log n}=\O\paren{\sqrt{m/n}\cdot \sqrt{\log n}}.$$

Furthermore, by Markov's inequality, we can adjust the constant hidden by the $\O$ such that $\vmag{\sum a_{ij}E_{ij}}\le \O\paren{\sqrt{m/n}\cdot \sqrt{\log n}}$ holds with probability at least $1-\e$ for any constant $\e>0$ of our choice.

-----

So we've shown that whp,

\begin{align*}
\proves_{2}\psi(x)&=x^T\paren{\sum a_{ij} E_{ij}}x\\
&\le (\sqrt n)^2 \vmag{\paren{\sum a_{ij} E_{ij}}} \\
&\le \O\paren{n\cdot \sqrt{m/n}\cdot \sqrt{\log n}}.
\end{align*}

For this to be $\ll \e m$, we need:

$$\sqrt n \sqrt{\log n}\ll \e \sqrt m \implies m\gg \frac{n\log n}{\e^2}.$$

As long as the inequality on the right is true, then whp degree-2 SOS refutes 2-XOR.

### $k=4$

$$\psi(x)=\sum a_{ijkl}\cdot x_ix_jx_kx_l=\paren{x^{\otimes 2}}^T\overbrace{\paren{\sum a_{ijkl}E_{ij,kl}}}^{n^2\times n^2}x^{\otimes 2}$$

Using a similar heuristic argument as $k=2$:

\begin{align*}
\vmag{\sum a_{ijkl}E_{ij,kl}}_F^2 \le \O(m) &\implies \vmag{\sum a_{ijkl}E_{ij,kl}}\lesssim \sqrt{\frac{m}{n^2}}=\frac{\sqrt m}{n} \\
&\implies \proves_{4}\psi(x)\le \TO\paren{n\sqrt m}.
\end{align*}

We conclude that $\psi(x)$ is much less than $m$ if $m\gg n^2$. The reasoning for larger even $k$ is similar.

### $k=3$

This case is trickier than the previous two. Firstly, we can write

\begin{align*}
\psi(x)&=\sum_{ijk} a_{ijk}x_ix_jx_k\\
&=x^T \cdot \paren{\overbrace{\sum_{ijk} a_{ijk}E_{i,jk}}^{A}} \cdot x^{\otimes 2},
\end{align*}

where $A$ is an $n\times n^2$ matrix. Naively, we could rewrite this expression as:

$$=(x,x^{\otimes 2})^T\cdot \overbrace{\begin{bmatrix}0_{n\times n} & A/2 \\
A^T/2 & 0_{n^2\times n^2} \end{bmatrix}}^{M} \cdot (x,x^{\otimes 2})$$

where $M$ is an $(n+n^2)\times (n+n^2)$ symmetric matrix, and try to use the same approach as in the even-$k$ case, using the maximum eigenvalue of $M$. But the maximum eigenvalue of $M$ is much larger than we would like, because even though $M$ is $(n+n^2) \times (n+n^2)$, it has rank at most $2n$.

-----

Another approach: using Cauchy-Schwarz,

\begin{align*}
\psi(x)^2&=\paren{\sum a_{ijk}x_ix_jx_k}^2\\
&=\paren{\sum_i x_i\cdot \sum_{j,k}a_{ijk}x_jx_k}^2\\
&\le \paren{\sum_i x_i^2}\cdot \paren{\sum_i \paren{\sum_{j,k}a_{ijk}x_jx_k}^2} \\
&\triangleq n\cdot \paren{\sum_i (x^TA_ix)^2},
\end{align*}

where $A_i$ is the symmetric $n\times n$ matrix such that $A_i(j,k)=\frac{a_{ijk}+a_{ikj}}{2}$. The next step is to define a matrix $A'$ such that

$$\sum_i (x^TA_ix)^2=(x^{\otimes 2})^TA'x^{\otimes 2}.$$

We need to choose $A'$ such that $\psi(x)^2=n\paren{x^{\otimes 2}}^TA'x^{\otimes 2} \ll m^2$ when $m\gg n^{1.5}$. There are several possible ways to define $A'$ given $A_i$:

1. $A'\triangleq \sum_iA_i^f(A_i^f)^T$
  - Here, $A_i^f\in \R^{n^2}$ is a flattened version of $A_i$ where $A_i^f(jk)=A_i(j,k)$. Then each $A_i^f(A_i^f)^T$ will have rank $1$, so $A'$ will have rank at most $n$. As in the naive approach, due to $A'$ having low rank, it can have relatively large eigenvalues, which is bad.

2. $A'\triangleq \sum_i A_i\otimes A_i$
  - Let's proceed with this way. 
  
Define the $n^2\times n^2$ matrix $B_i$ to be equal to $A_i\otimes A_i$, except with $B_i(jj',kk')=0$ whenever $\{j,k\}=\{j',k'\}$. Informally, $B_i$ ignores all terms in the summation $\sum_{i}(x^TA_ix)^2$ that are definitely non-negative (that is, of the form $A_i(j,k)^2x_j^2x_k^2$). Then

$$A'=\sum_i B_i+\sum_i (A_i\otimes A_i-B_i).$$

The second summation is easy to deal with; for all $x \in \{\pm 1\}^{n}$,

$$\proves_4 \paren{x^{\otimes 2}}^T\sum_i (A_i\otimes A_i-B_i)\paren{x^{\otimes 2}}\le  \O\paren{\#\text{ nonzero }a_{ijk}} \le \O\paren {m}$$

whp, where we used $\proves_4 x_i^2 x_j^2 \leq 1$.

It remains to deal with the first summation. We can bound $\E\vmag{\sum_{i\le n}B_i}$ using the Matrix Bernstein Inequality. Firstly, note that $\E[B_i]=0$ for all $i$, because all entries of $B_i$ that weren't zeroed out are equal to the product of two independently distributed entries of $A_i$, each with mean zero. Secondly, we bound the operator norm of $B' \triangleq \E\sum_{i\le n}B_i^2$. By definition of $B'$,
\begin{align*}
B'(jj',kk')&=\sum_{i,l,l'\le n}\E \Brac{B_i(jj',ll')B_i(ll',kk')}\\
&=\E\sum_{i,l,l'\le n, \{j,l\}\neq \{j',l'\}, \{l,k\}\neq \{l',k'\}}\Brac{A_i({j,l})A_i(j',l')A_i(l,k)A_i(l',k')}\\
&=n\cdot \begin{cases}
\O\paren{(m/n^3)^2\cdot n^2} & \{j,j'\}=\{k,k'\} \\
0 & \text{otherwise } \\
\end{cases} \\
\end{align*}
so $\vmag{B'}\le \O\paren{n\cdot (m/n^3)^2\cdot n^2}=\O\paren{m^2/n^3}$. Next, by Matrix Bernstein, 
$$\vmag{\sum_{i\le n} B_i}\le \O\paren{\sqrt{m^2/n^3}\sqrt{\log n}+R\log n}.$$
From our work for $k=2$, $\vmag{A_i}\le \TO\paren{\sqrt{m/n^2}+1}$ whp, which in turn implies $\vmag{A_i\otimes A_i}\le \TO\paren{m/n^2+1}$ whp. Therefore we can set $R=\TO\paren{m/n^2+1}$. It remains to verify that
$$\psi(x)^2=\TO\paren{n\paren{n^2\vmag{\sum_{i\le n} B_i}+m+n^2}} \ll m^2$$
when $m\ge \tilde\Omega\paren{n^{1.5}}$, which is true.

<!-- 
We can rewrite 
\begin{align*}
A'&=\sum_i \Brac{\E A_i\otimes A_i+\paren{A_i\otimes A_i-\E A_i\otimes A_i}}\\
&\triangleq \sum_i [\E A_i\otimes A_i+B_i] \\
&= \sum_i \E A_i\otimes A_i + \sum_i B_i.
\end{align*}

First, we need to compute $\E A_i\otimes A_i$. Observe that
  
$$\E (A_i\otimes A_i)_{jj',kk'}=\E A_i(j,k)A_i(j',k')=\begin{cases}
\O\paren{m/n^3} & \{j,k\}=\{j',k'\} \\
0 & \text{otherwise}
\end{cases}.$$

Therefore,

\begin{align*}
\sum_{i\le n} (x^{\otimes 2})^T\paren{\E A_i\otimes A_i}x^{\otimes 2}&=\sum_{ i,j,j',k,k'\le n} x_{j}x_{j'}x_kx_{k'}\E A_i(j,k)A_i(j',k')\\
&= \O\paren{n\cdot \sum_{1\le j,k\le n}\frac{m}{n^3}x_j^2x_k^2}\\
&= \O\paren{\frac{m}{n^2}\vmag{x}^4}\\
&= \O\paren{m}
\end{align*}

Next, let's upper bound $\E\vmag{\sum_{i\le n}B_i}$ using the Matrix Bernstein Inequality. To do so, we first need to bound the operator norm of $B' \triangleq \E\sum_{i\le n}B_i^2$. By definition of $B'$,
\begin{align*}
B'(jj',kk')&=\sum_{i,l,l'\le n}\E\Brac{A_i({j,l})A_i(j',l')A_i(l,k)A_i(l',k')}-\E\Brac{A_i({j,l})A_i(j',l')}\E\Brac{A_i(l,k)A_i(l',k'}\\
&=n\cdot \begin{cases}
\O\paren{m/n^3\cdot n+(m/n^3)^2\cdot n^2} & j=j'=k=k' \\
\O\paren{(m/n^3)^2\cdot n^2} & \{j,j'\}=\{k,k'\} \\
0 & \text{otherwise } \\
\end{cases} \\
\end{align*}
so $\vmag{B'}\le \O\paren{m/n+m^2/n^3}$. Next, by Matrix Bernstein, 
$$\vmag{\sum_{i\le n} B_i}\le \O\paren{\sqrt{m/n+m^2/n^3}\sqrt{\log n}+R\log n}.$$
From our work for $k=2$, $\vmag{A_i}\le \TO\paren{\sqrt{m/n^2}+1}$ whp. Therefore we can set $R=\TO\paren{m/n^2+1}$. It remains to check that
$$n^3\vmag{\sum_{i\le n} B_i} \ll m^2$$
when $m\ge \tilde\Omega\paren{n^{1.5}}$, but this seems like it's not true ...

Conclusion: $\proves_6 \psi_T(x)\le \e m$ whp if $m\ge n^{1.5}\text{poly}(\log n,1/\e)$. -->

-----

So we've shown that $\proves_6 \psi(x)^2\ll m^2$. By the following lemma we may conclude that $\proves_6 \psi(x)\ll m$.

**Fact:** Let $B$ be a positive constant. $\proves_d f^2\le B\implies \proves_d f\le \sqrt B$.

*Proof:* Clearly
$$\proves_d (f/B^{1/4}-B^{1/4})^2\ge 0,$$

as the LHS is a square of degree at most $d$. Expanding the LHS, we get
$$\proves_d f^2/\sqrt B-2f+\sqrt B\ge 0$$

$$\implies \proves_d f\le \frac{f^2/\sqrt B+\sqrt B}{2}.$$
Since $\proves_d f^2\le B$ by assumption, the inequality above simplifies to $\proves_d f\le \sqrt B$, as desired.

Conclusion: $\proves_6 \psi_T(x)\le \e m$ whp if $m\ge n^{1.5}\text{poly}(\log n,1/\e)$.


<!-- (BREAK 2) -->

## Application: Tensor Completion

Related to learning theory. 

**Matrix Completion Problem (AKA Netflix Problem).**  Consider an $n\times m$ matrix $M$ with rows indexed by $n$ users and $m$ columns indexed by movies. You know only a few entries of the matrix, each corresponding to a user rating a movie. For example, $+1$ could represent a user strongly liking a movie, and $-1$ could represent a user strongly disliking a movie. The goal is to recover the rest of $M$.

*Question:* Assume that $M$ has low rank $r$; that is, $M=\sum_{i=1}^r u_iv_i^T$. How many random entries of $M$ need to be revealed in order to recover the rest of $M$? 

It turns out that we can do so with $\O(n+m)$ entries, given $r\le \O(1)$ and some other assumptions (including bounds on the magnitudes of $u_i$ and $v_i$).

-----

**Tensor Completion Problem (AKA Yelp Problem).** Consider an $n\times n\times n$ tensor $T$ indexed by users, restaurants, and time of day. Again, assume $T$ has a low-rank decomposition $\sum_{i=1}^ru_i\otimes v_i\otimes w_i$. The task is the same: recover $T$ from as few entries as possible.

Naive solution: Flatten the tensor into an $n\times n^2$ matrix: $T=\sum u_i (v_i\otimes w_i)^T$. Then run matrix completion. This requires $\Omega(n^2)$ entries to be revealed.

-----

**Theorem (Boaz Barak, Ankur Moitra):** Consider an $n\times n\times n$ tensor $T$ that can be written in the form:

$$T=\sum_{i=1}^r u_i\otimes u_i\otimes u_i, \vmag{u_i}_{\infty}\le 1.$$

Then there exists a polynomial time algorithm to complete $T$ using $\TO(n^{1.5})$ observed entries. The set of observed entries is given by $\Omega\subseteq [n]^3$, where $\E |\Omega|=m$ and $\Omega$ was chosen by sampling each entry of $T$ independently with probability $\frac{m}{n^3}$. The algorithm outputs $X\in \R^{n\times n\times n}$ such that $\E\vmag{X-T}_2^2\le \text{poly}(r)\cdot n^3\cdot \paren{\frac{n^{1.5}\log n}{m}}^{\Omega(1)} + r^{O(1)} n^2$.

*Remark:* Interpreting the guarantees here, notice that the entries of $T$ are of order $r$, so when $m \gg n^{1.5} \log n$ we are finding $X$ such that for typical $i,j,k$, $(X_{ijk} - T_{ijk})^2 \ll T_{ijk}^2$.

The $\infty$-norm assumption, or something like it, is necessary in this context, where it is often referred to as *incoherence*. The $r^{O(1)} n^2$ term can be removed with a bit of additional work -- it shows up here because we won't worry about correctly completing the entries $T_{ijk}$ where $i,j,k$ are not all distinct.

-----

*Approach:* Let us associate to $T$ the following probability distribution $\mu$ on $\{ \pm 1\}^n$. First, sample $i \sim [r]$ uniformly at random. Then, for each $j \leq n$, independently sample $x_j$ such that $\E x_j = u_i(j)$.

For each tuple of indices $(i,j,k)$ with $i,j,k$ all distinct, $\frac 1 r T_{ijk} = \E_{x \sim \mu} x_i x_j x_k$. A natural approach to completing $T$ would be to find the degree $3$ moments of a probability distribution that agrees with the revealed entries of $T$. We don't know how to search for such moments in polynomial time, but we can search for pseudo-moments instead.

**Algorithm:** Find a degree 12 $\pE$ such that for all $(i,j,k) \in \Omega$ with $i,j,k$ distinct, $\pE x_i x_j x_k = \frac 1 r T_{ijk}$. Output $\pE x^{\otimes 3}$. 

It turns out that the success of this algorithm depends on SOS refuting random 3-XOR.

We haven't discussed how to implement this kind of algorithm in polynomial time; for today we will take it on faith that finding pseudoexpectations which satisfy some linear equations can be done in polynomial time (up to small numerical error) via semidefinite programming.

-----

**Analysis:** We will combine some standard tricks from statistical learning theory with our theorem on SOS refutation of $k$-XOR to analyze this algorithm.

We want to bound

$$(*) := \sup_{\pE}\Brac{ \E_{ijk}\paren{\tfrac 1 rT_{ijk}-\pE x_i x_j x_k }^2-\frac{1}{\E |\Omega|}\sum_{ijk\sim \Omega}(\tfrac 1 r T_{ijk}-\pE x_ix_jx_k)^2}.$$

Suppose we can show that $(*)$ is at most $\delta$. The $\pE$ found by our algorithm will have the property that $\pE x_i x_j x_k - \frac 1 r T_{ijk} = 0$ for $ijk \in \Omega$ all distinct. So for this $\pE$,

\begin{align*}
\frac{1}{\E |\Omega|}\E_\Omega \sum_{ijk \sim \Omega} (\tfrac 1 r T_{ijk} - \pE x_i x_j x_k)^2 &\leq \O(1) \cdot \frac{1}{\E |\Omega|} \cdot \E_\Omega \sum_{ijk \sim \Omega} 1[i,j,k \text{ not all distinct}] \\
&\leq \O(1/n),
\end{align*}

and hence, again for this $\pE$,

$$\E_{\Omega} \, \E_{ijk} \paren{\tfrac 1 r T_{ijk} - \pE x_i x_j x_j}^2 \leq \O(1/n) + \delta,$$

which after rescaling by $r^2 n^3$, becomes $\|X - T\|_2^2 \leq \O(r^2 n^2) + \delta r^2 n^3.$ Hence, our goal is to obtain $\delta \leq \paren{\tfrac{n^{1.5} \log n}{m}}^{\Omega(1)}$.

-----

Next, let's use "ghost samples;" this is a standard trick in learning theory. Specifically, consider generating a set of samples $\Omega'$ in the same way as $\Omega$. Then we can rewrite the expected supremum above as

\begin{align*}
(*)&= \frac{1}{\E |\Omega|} \E_{\Omega}\sup_{\pE}\Brac{\E_{\Omega'}\sum_{ijk\sim \Omega'}\paren{\tfrac 1 rT_{ijk}-\pE x_i x_j x_k }^2-\sum_{ijk\sim \Omega}\paren{\tfrac 1 rT_{ijk}-\pE x_i x_j x_k }^2}\\
&\le \frac{1}{\E |\Omega|} \E_{\Omega,\Omega'}\sup_{\pE}\Brac{\sum_{ijk\sim \Omega'}\paren{\tfrac 1 rT_{ijk}-\pE x_i x_j x_k }^2-\sum_{ijk\sim \Omega}\paren{\tfrac 1 rT_{ijk}-\pE x_i x_j x_k }^2}\\
&= \frac{1}{\E |\Omega|}\E_{\Omega,\Omega',\sigma}\sup_{\pE}\Brac{\sum_{ijk\sim \Omega'}\sigma_{ijk}\paren{\tfrac 1 rT_{ijk}-\pE x_i x_j x_k }^2-\sum_{ijk\sim \Omega}\sigma_{ijk}\paren{\tfrac 1 rT_{ijk}-\pE x_i x_j x_k }^2}\\
&\le \frac{2}{\E |\Omega|}\E_{\Omega,\sigma}\sup_{\pE}\Brac{\sum_{ijk\sim \Omega}\paren{\tfrac 1 rT_{ijk}-\pE x_i x_j x_k }^2} \\
&\le \O(1)\cdot \E_{\Omega,\sigma}\sup_{\pE}\E_{ijk\sim \Omega}\sigma_{ijk}\paren{\frac{1}{r}T_{ijk}-\pE x_ix_jx_k}^2
\end{align*}

Here, each $\sigma_{ijk}$ equals $\pm 1$ independently with equal probability; see the note at the end of this document for details. The first inequality follows from Jensen's inequality, the second follows from the triangle inequality, and the last holds because $|\Omega|$ is within a constant factor of $\E |\Omega|$ whp. 

-----

\begin{align*}
\E_{\Omega,\sigma}&\sup_{\pE}\E_{ijk\sim \Omega} 
\sigma_{ijk}\paren{\frac{1}{r}T_{ijk}-\pE x_ix_jx_k}^2\\
&\le \E_{\Omega,\sigma}\Brac{\E_{ijk\sim \Omega}\sigma_{ijk}\paren{\frac{1}{r}T_{ijk}}^2+\sup_{\pE}\E_{ijk\sim \Omega}\sigma_{ijk}\paren{\pE x_ix_jx_k}^2+2\sup_{\pE}\E_{ijk\sim \Omega}\paren{\sigma_{ijk}\cdot \frac{T_{ijk}}{r}\pE x_ix_jx_k}}
\end{align*}

We can deal with the summands independently.

1. The first summand does not depend on $\pE$, so by a Chernoff bound it can be shown to be $\le \O\paren{m^{-1/2}}$. 

2. The second summand can be written as 
$$\E_{\Omega,\sigma}\sup_{\pE}\E_{ijk\sim \Omega}\sigma_{ijk}\pE \underbrace{x_ix_i'}_{y_i} \underbrace{x_jx_j'}_{y_j}\underbrace{x_kx_{k}'}_{y_k}\le \E_{\Omega,\sigma}\sup_{\pE}\pE \frac{1}{|\Omega|}\sum_{ijk}\sigma_{ijk}y_iy_jy_k.$$

   Here, on the LHS $\pE$ is the degree-$12$ pseudoexpectation which results from defining a "product pseudoexpectation" on variables $x_1,\ldots,x_n,x_1',\ldots,x_n'$; then we define polynomials $y_i = x_i x_i'$ to obtain a degree-$6$ pseudoexpectation in variables $y_1,\ldots,y_n$. So by our work for refuting 3-XOR it is bounded above by $\O\paren{\frac{n^{1.5}\log n}{m}}^{\Omega(1)}$ whp. 

3. Similarly as the second summand, the third summand can be written as 

   $$\E_{\Omega,\sigma}\sup_{\pE}\E_{ijk\in \Omega}\sigma_{ijk}\E_{x'\sim \mu}\pE \underbrace{x_ix'_i}_{z_i}\underbrace{x_jx'_j}_{z_j}\underbrace{x_kx'_k}_{z_k}\le \E_{\Omega,\sigma}\sup_{\pE}\pE \frac{1}{|\Omega|}\sum_{ijk}\sigma_{ijk}y_iy_jy_k,$$

   where $\mu$ is the distribution on $\{ \pm 1\}^n$ we associated to $T$, and $z_i$ is a product pseudoexpectation defined as $z_i=x_ix_i'$. So it is also bounded above by $\O\paren{\frac{n^{1.5}\log n}{m}}^{\Omega(1)}$ whp.

Thus, $\delta \le (*)\le \O\paren{\frac{n^{1.5}\log n}{m}}^{\Omega(1)}$, as desired.


------

*Note:* The signs $\sigma_{ijk}$ can be introduced via an exchangability argument which goes roughly like this.

Suppose we have a family of functions $f\colon [n]^3 \rightarrow \R$. (In this case, the functions are given by pseudoexpectations, and the function $f_{\pE}$ associated to $\pE$ is $f_{\pE}(i,j,k) = \paren{\tfrac 1r T_{ijk} - \pE x_i x_j x_k}^2$.)

Look at $\sup_f \Brac{\sum_{ijk \in \Omega} f(ijk) - \sum_{ijk \in \Omega'} f(ijk)}$. We can rewrite as

$$\sup_f \Brac{\sum_{ijk} f(ijk) 1(ijk \in \Omega) - \sum_{ijk} f(ijk) 1(ijk \in \Omega')} = \sup_f \Brac{\sum_{ijk} f(ijk) (1(ijk \in \Omega) - 1(ijk \in \Omega'))}.$$

Now, the random variables $1(ijk \in \Omega)- 1(ijk \in \Omega')$ are independent for distinct $ijk, i'j'k'$, and identically distributed to $\sigma_{ijk} (1(ijk \in \Omega) - 1(ijk \in \Omega'))$, where $\sigma_{ijk}$ are independent random signs. So the whole $\sup$ is identically distributed to $\sup_f \sum_{ijk \in \Omega}\Brac{ \sigma_{ijk} f_{ijk} - \sum_{ijk \in \Omega'} \sigma_{ijk} f_{ijk}}$. Then we can use the triangle inequality to break this into $2$ identical terms.