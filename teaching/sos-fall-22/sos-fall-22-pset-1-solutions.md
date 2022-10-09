## Problem Set 1 -- Solutions

\newcommand{\E}{\mathbb E}
\newcommand{\pE}{\tilde{\mathbb E}}
\newcommand{\e}{\varepsilon}
\newcommand{\proves}{\vdash}
\newcommand{\N}{\mathbb{N}}
\newcommand{\R}{\mathbb{R}}
\newcommand{\iprod}[1]{\langle #1 \rangle}
\newcommand{\Brac}[1]{\left [ #1 \right ]}
\newcommand{\poly}{\text{poly}}
\newcommand{\cC}{\mathcal{C}}
\newcommand{\cN}{\mathcal{N}}


**Problem 1A:**
Let $q_1,\ldots,q_m$ witness $\proves_d f \geq 0$, meaning that $f(x) = \sum_{i \leq m} q_i(x)^2$ for all $x \in \{0,1\}^n$. Without loss of generality, we can assume that each $q_i$ is a multilinear polynomial of degree at most $d$, and that $m \leq n^d$. By hypothesis, $\E_{x \sim \{0,1\}^n} f(x) \leq n^{O(d)}$, hence also $\E_{x \sim \{0,1\}^n} q(x)^2 \leq n^{O(d)}$ for each $q = q_i$.

Now it's convenient to view $q$ as a function over the $\{\pm 1\}^n$ cube. Let $x \, : \, \{-1,1\}^n \rightarrow \{0,1\}^n$ be given by $x(y)_i = (y_i + 1)/2$, and let $h(y) = g(x(y))$. By the same reasoning as above, $\E_{y \sim \{ \pm 1\}^n} h(y)^2 \leq n^{O(d)}$. Consider the expansion of $h$ as $h(y) = \sum_{\alpha \subseteq [n], |\alpha| \leq d} \hat{h}(\alpha) y^\alpha$, and observe that $\E_{y \sim \{\pm 1\}^n} h(y)^2 = \sum_{\alpha} \hat{h}(\alpha)^2$. So we can conclude that $|\hat{h}(\alpha)| \leq n^{O(d)}$ for each $\alpha$.

We just need to check that this transfers over to $q$. So let's write $h$ as a function over the $\{0,1\}$ cube; let $y(x)_i = 2x_i - 1$; we have $h(y(x)) = g(x)$. Expanding $h$ again, $h(y(x)) = \sum_{\alpha} \hat{h}(\alpha) \prod_{i \in \alpha} (2x_i - 1)$. If we expanded the products here, we would see that each $x^\beta$ appears with coefficient at most $2^d \sum_{\alpha} |\hat{h}(\alpha)| \leq n^{O(d)}$. QED.

**Problem 1B:**
Fix $f$. We claim that the following convex set $\cC \subseteq \R^{\binom{n}{\leq d} \times \binom{n}{\leq d}}$ contains a ball of radius $\geq \e / n^{O(d)}$ and is contained in a ball of radius $n^{O(d)}$.
$$\cC = \{ M \, : \, M \succeq - (\e/n^{O(d)}) I \text{ and for all $\alpha \subseteq [n]$ } \widehat{(x^{\otimes \leq d})^\top M (x^{\otimes \leq d})}(\alpha) \in [\hat{f}(\alpha) - \e, \hat{f}(\alpha) + \e], \|M\|_F^2 \leq n^{O(d)} \}.$$
Here, $\|M\|_F$ is the Frobenius norm of $M$. Clearly $\cC$ is contained in a ball of radius $R = n^{O(d)}$. To see that it contains a ball of radius $\e / n^{O(d)}$, consider the matrix given by $M = \sum p_i p_i^\top$, where $p_i \in \R^{\binom{n}{\leq d}}$ is such that $p_i(x) = \iprod{p_i, x^{\otimes \leq d}}$, and $p_1,\ldots,p_m$ are an SoS proof of $f \geq 0$ such that $\|p_i\|^2 \leq n^{O(d)}$. Then $\cC$ contains a ball of radius $\e / n^{O(d)}$ around $M$. Constructing a separation oracle for $\cC$ is easy by combining the separation oracle for PSD matrices with a simple algorithm separating over the linear constraints $\widehat{(x^{\otimes \leq d})^\top M (x^{\otimes \leq d})}(\alpha) \in [\hat{f}(\alpha) - \e, \hat{f}(\alpha) + \e]$. 

So, Ellipsoid will find some matrix $M \in \cC$, within the desired running time. Let $q_1,\ldots,q_m$ be a rank-one factorization of $M + \e/n^{O(d)} I$; i.e. $M+\e/n^{O(d)} I = \sum q_i q_i^\top$ -- we can find $q_1,\ldots,q_m$ in polynomial time, up to error $\e'$; that is, given $M$ we can find $\tilde{q_i}$ such $\|M + \e / n^{O(d)} - \sum q_i q_i^\top\|_{\infty} \leq \e'$.

Then the coefficients of the polynomial $g(x) = \sum \iprod{x^{\otimes \leq d}, q_i} - f(x)$ are at most $n^{O(d)} \e' + n^{-\Omega(d)} \e$. Expanding $g(x) = \sum_{|\alpha| \leq d} \hat{g}(\alpha) x^{\alpha}$, we can decompose each $\alpha = \alpha_0 \cup \alpha_1$, where $|\alpha_0| = |\alpha_1| \pm 1$, and obtain $x^{\alpha} \preceq x^{2\alpha_0} + x^{2 \alpha_1} = x^{\alpha_0} + x^{\alpha_1}$. Then, $\proves_d x^{\alpha_0} \leq 1$, since $1-x^{\alpha_0} = 1-2x^{\alpha_0} + x^{2\alpha_0} = (1-x^{\alpha_0})^2$; we have constructed a degree-$d$ proof of $x^{\alpha} \leq 1$. There is a similar proof for $-x^{\alpha}$. By summing up these proofs, in polynomial time we can find a degree-$d$ proof of $g(x) \leq \e/2 + \e' n^{O(d)}$ (choosing constants appropriately). Putting this proof together with the $q_i$'s and taking $\e' \ll n^{-O(d)}$ gives the proof we want for $f + \e$.

**Problem 2:**
The algorithm is:

- find a degree-2 pseudoexpectation $\pE$ over the $\{ \pm 1\}$ hypercube such that $\pE G(x) = \pE \sum_{i \sim j} \tfrac 1 4 (x_i - x_j)^2 \geq (1-\e)|E|$
- compute the centered pseudoexpectation $\pE'p(x) = \tfrac 12 \pE p(x) + \tfrac 12 \pE p(-x)$ (obtaining a list of $n^2$ numbers); note that $\pE' x_i = 0$ for all $x_i$, while $\pE' G(x) = \pE G(x)$.
- draw a sample $g$ from a Gaussian whose mean and covariance match that of $\pE'$
- let $y_i = sign(g_i)$. Output the cut $y$.

To analyze the algorithm, we consider what happens along a single edge $i \sim j$. Let $\e_{ij} = 1- \frac 1 4 \pE' (x_i - x_j)^2$. By definition, $\e_{ij} = \tfrac 12 + \tfrac 12 \pE x_i x_j$, i.e. $\pE x_i x_j = -1 + 2 \e_{ij}$.

Let $g,h$ be variance-1 Gaussians with $\E gh = -1 + 2 \e_{ij}$. We can sample $g,h$ jointly as follows. First, sample $g \sim \cN(0,1)$, also sample $z \sim \cN(0,1)$, and let $h = (-1 + 2 \e_{ij}) \cdot g + 2 \sqrt{\e_{ij}(1-\e_{ij})} \cdot z$. To have $sign(h) = sign(g)$, we would have to have $|z| \geq \tfrac 1 {\Omega(\sqrt{\e_{ij}})} |g|$. We have

$$\Pr(|z| \geq \tfrac 1 {\Omega(\sqrt{\e_{ij}})} |g|) \leq \Pr(|z| \geq \sqrt{\log(1/\e_{ij}})) + \Pr(|g| \leq O(\sqrt{\e_{ij} \log 1/\e_{ij}})) \leq O(\sqrt{\e_{ij} \log 1/\e_{ij}})$$

So,
$$E_y G(y) \geq |E| - \sum_{i \sim j} \Pr( sign(g_i) = sign(g_j) ) \geq |E| - \sum_{i \sim j} O(\sqrt{\e_{ij} \log(1/\e{ij})}).$$
By concavity of $\sqrt{x \log(1/x)}$, $\E_{i\sim j} \sqrt{\e_{ij} \log(1/\e_{ij})} \leq \sqrt{ \E_{i \sim j} \e_{ij} \log 1/\E_{i \sim j} \e_{ij} } = \sqrt{\e \log(1/\e)}$. QED.


**Problem 3A:** We check the property after one round of conditioning; then the rest follows by induction. Consider, WLOG, $\pE[ \cdot \, | \, x_1 = 1]$. We have
$$\pE[ p(x) \sum_{i=1}^n x_i \, | \, x_i = 1] = \frac{\pE p(x) \sum_{i=1}^n x_i}{\pE x_1 } = \frac n 2 \frac{\pE p(x) }{\pE x_1} = \frac n 2 \pE[ p(x) \, | \, x_1 = 1]$$

**Problem 3B:** The variance is actually $O(n)$ -- since the $y_i$'s are independent, we have $Var (\sum y_i) = \sum Var(y_i) \leq O(n)$.

**Problem 3C (sketch):** The algorithm is:

- Given $G$, find $\pE$ of degree $(1/\e)^{O(1)}$ maximizing $G(x)$ among balanced $\pE$'s.
- By brute-force search over conditionings of $(1/\e)^{O(1)}$ variables, find a conditioned $\pE'$ such that $\pE' G(x) \geq (1 - \e) \pE G(x)$ having global information $\leq \e^5$ (which exists by the same argument we used in lecture).
- Apply independent rounding to $\pE'$. With high probability, we obtain $y$ such that $\sum y_i = n/2 \pm O(\sqrt n)$, using independence and a Chernoff bound. We can move any $O(\sqrt{n})$ nodes from one side of the cut to the other to balance it, losing at most $n^{3/2}$ cut edges in the process.

**Problem 4 notation:** We'll write $p \preceq q$ if the polynomial $q - p$ is an SoS.

**Problem 4A:**
We factor the difference $(\sum_{i \leq m} p_i(x)^2 )(\sum_{i \leq m} q_i(x)^2) - (\sum_{i \leq m} p_i(x) q_i(x))^2$ as $\sum_{i,j} (p_i(x) q_j(x) - p_j(x) q_i(x))^2$.

**Problem 4B:** We write
$$ pq = p (\pE q^2 / \pE p^2)^{1/4} \cdot q (\pE p^2 / \pE q^2)^{1/4}$$
and then using $ab \preceq \frac 12 a^2 + \frac 12 b^2$, we have 
$$
\pE pq \leq \frac 12 [ \pE p^2 \cdot (\pE q^2 / \pE p^2)^{1/2} + \pE q^2 \cdot (\pE p^2 / \pE q^2)^{1/2}] = \sqrt{\pE p^2 \cdot \pE q^2}.
$$

**Problem 4C:** For the first statement it's enough to show that $C (a^2 + b^2) - (a+b)^2$ is an SoS, for some choice of $C$. In fact we can choose $C = 2$, and then this reduces to $a^2 + b^2 - 2ab = (a-b)^2$.

For the second statement, it's enough to show that there's $C_t$ such that $C_t (a^t + b^t) - (a+b)^t$ is an SoS. We can prove this by induction on $t$. We already did the base case. For the inductive case, we have
$$ (a+b)^{t+2} = (a+b)^t (a+b)^2 \preceq C_t (a^t + b^t) (a+b)^2 = C_t (a^{t+2} + b^{t+2} + a^2 b^t + b^2 a^t)$$
by induction. Another simple induction shows $b^2 a^t \preceq C'_t (a^{t+2} + b^{t+2})$, which completes the proof.

**Problem 5A:** To see that such polynomials rule out the existence of a clique in $G$ of size $\gg \sqrt n$, consider evaluating both sides of the expression at the $0/1$ indicator vector for such a clique. The LHS will be negative, but the first term $\sum_{i \not \sim j} p_{ij}(x) x_i x_j$ on the RHS will be $0$, and the second term will be nonnegative, a contradiction.

Now, let $G$ be a graph such that the adjacency matrix $A_G$ satisfies $\| A_G - \tfrac 12 11^\top \| \leq O(\sqrt n)$. This implies that $O(\sqrt n) \sum_{i \leq n} x_i^2 - \sum_{i \sim j} x_i x_j + \sum_{i \not \sim j} x_i x_j$ is a degree-2 SoS; that is,
$$O(\sqrt n) \sum_{i \leq n} x_i^2 - \sum_{i \sim j} x_i x_j + \sum_{i \not \sim j} x_i x_j = SoS(x)$$

Subtracting $2 \sum_{i \not \sim j} x_i x_j$ from both sides,
$$O(\sqrt n) \sum_{i \leq n} x_i^2 - \sum_{i,j} x_i x_j = SoS(x) -2 \sum_{i \not \sim j} x_i x_j,$$
and over the hypercube this is equal to
$$O(\sqrt n) \sum_{i \leq n} x_i - (\sum_i x_i)^2 = SoS(x) -2 \sum_{i \not \sim j} x_i x_j.$$

Let $p(x) = \sum_{i \leq n} x_i$. Now we have shown that for some $C = O(\sqrt n)$, over the hypercube, 

$$ p^2 = C p - SoS(x) - 2 \sum_{i \not \sim j} x_i x_j.$$

We also know that for some other SoS polynomial,

$$p + SoS = \frac{p^2}{2C} + 2C$$

so putting these together, we get

$$p + SoS = \frac 12 p - SoS - 2 \sum_{i \not \sim j} x_i x_j + 2C$$

which rearranges to the conclusion we want.


**Problem 5B:** Let $G$ be the underlying random graph and $G'$ be the perturbation by a monotone adversary. If $i \not \sim j$ in $G$ then also $i \not \sim j$ in $G'$, so the same SoS proof which existed for $G$ also exists for $G'$.
