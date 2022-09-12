## Global Correlation Rounding

**Alert: these notes are a work in progress!**

\newcommand{\E}{\mathbb E}
\newcommand{\pE}{\tilde{\mathbb E}}
\newcommand{\e}{\varepsilon}
\newcommand{\proves}{\vdash}
\newcommand{\N}{\mathbb{N}}
\newcommand{\R}{\mathbb{R}}

We will describe another approach for rounding pseudoexpectations. By contrast to the Gaussian rounding strategy used for max-cut, this time we will make use of higher-order moments of $\pE$. We will continue to use max-cut as our running example, but the ideas we will see are useful well beyond the setting of max-cut. 

Recall that for an $n$-vertex graph $G$, we have defined $G(x) = \sum_{i \sim j} (x_i - x_j)^2$ to be the function which counts the number of edges of $G$ cut by some $0/1$ vector $x$. 
Our first goal will be to prove the following theorem:

**Theorem 1 (Barak-Raghavendra-Steurer):** For every $n$-vertex graph $G$ and even $d \in \N$, $\proves_d G(x) \leq \max_y G(y) + O(n^2 / \sqrt{d})$.

Here we have introduced a new notational shorthand: $\proves_d f \leq g$ is shorthand for $\proves_d f - g \geq 0$.

Let us compare Theorem 1 to the theorem we previously proved for degree-2 SoS upper bounds on $G$: we have traded the constant $1/0.878$ for the constant $1$, at the cost of the additive term $O(n^2 / \sqrt{d})$. When is this a good trade? Well, if $G$ is *dense* -- i.e., has $\Omega(n^2)$ edges -- then $\max_y G(y) = \Theta(n^2)$. By choosing $d = O(1/\e^2)$ large enough that the additive error is at most $\e n^2$, this shows that the SoS algorithm provides a $(1+O(\e))$-approximation to the max-cut value in dense graphs in $n^{O(1/\epsilon^2)}$ time.

(Once again, implicit in the proof will be an algorithm for actually finding such a cut, rather than just approximating the max-cut value.)

### Pseudoexpectations, Local Distributions, and Conditioning

First, we'll lay a little groundwork, and in the process see another respect in which pseudoexpectations act like the moments of actual distributions on $\{0,1\}^n$.

**Lemma 2 (Local Distributions):** Let $\pE$ be a pseudoexpectation of degree $d$. For every $|S| \subseteq [n]$ with $|S| \leq d/2$, there is a distribution $\mu_S \, : \, \{0,1\}^k \rightarrow \R$ such that for every $T \subseteq S$, $\pE x^T = \E_{y \sim \mu_S} y^T$.

*Proof:* Fixing $S$, consider $\pE$ restricted to the variables $x_i$ for $i \in S$; there are at most $d/2$ of them and $\pE$ has degree $d$. Therefore, $\pE$ represents the moments of an actual distribution $\mu_S$ on $\{0,1\}^{|S|}$. QED.

Another respect in which pseudoexpectations act like (moments of) distributions is that they can be *conditioned* on events (as long as those events are sufficiently simple, by which we mean that they can be described by a low-degree polynomial).

Concretely, let $\pE$ be a pseudoexpectation of degree $d$, and let $i \in [n]$ be such that $\pE x_i > 0$. If $\pE$ were the moments of an actual distribution, $x_i$ would be a variable which has nonzero probability of being equal to $1$, and we could condition on that event. To "pseudo-condition" on the event, we define a new pseudoexpectation:

$$\pE[\cdot \, | \, x_i = 1] \, : \, \R[x]_{\leq d-2} \rightarrow \R$$ via

$$\pE[ x^S \, | \, x_i = 1] := \frac{\pE[x^S x_i]}{\pE[x_i]}$$

Similarly, if $\pE[(1-x_i)] > 0$, we can define

$$\pE[ x^S \, | \, x_i = 0] := \frac{\pE[x^S (1-x_i)]}{\pE[(1-x_i)]}$$


**Lemma 3 (Conditioning):** $\pE[\cdot \, | \, x_i = 1]$ and $\pE[\cdot \, | \, x_i = 0]$ are pseudoexpectations of degree $d-2$.

*Proof:* Exercise (just check the definition of a pseudoexpectation).

For some intuition, let us sanity check that $\pE[\cdot \, | \, x_i = 1]$ "acts like" moments of a distribution where $x_i$ always assumes the value $1$. For instance, it should be the case that for any polynomial $p$, $\pE[p(x) x_i \, | \, x_i = 1] = \pE[p(x) \, | \, x_i = 1]$. Luckily, it is easy to check that this is the case.

### Independent Rounding

To prove Theorem 1, we will describe an algorithm which takes a pseudoexpectation $\pE$ of degree $d$ and finds $y \in \{0,1\}^n$ such that $G(y) \geq \pE G(x) - O(n^2/ \sqrt{d})$. As before, we will need a "rounding strategy" to do this.

Consider the following idea, even simpler than the Gaussian rounding approach we tried before. The pseudoexpectation $\pE$ specifies $1$-wise marginal distributions for each coordinate, where coordinate $i$ is $1$ with probability $\pE x_i$ and otherwise $0$. (Exercise: sanity check that $\pE x_i \in [0,1]$ so that this is well defined.) We could simply sample each coordinate independently from according to these distributions. (This is not so dumb as it seems: in fact, many "randomized rounding" schemes for linear programs have this flavor and lead to nontrivial algorithms.)

Of course, the resulting random vector $y$ will not necessarily have the same higher-order correlations as $\pE$ -- that is, the joint distributions $(y_i,y_j)$ will have independent coordinates, while the joint (2-local) distributions $\mu_{ij}$ coming from $\pE$ need not be. (Expressing the same concept in terms of pseudoexpectation values rather than local distributions: we expect $\E y_i y_j = \E y_i \E y_j$ and $\pE x_i x_j$ to be different.)

But, for a thought experiment, let us imagine that we have gotten lucky, and the local distributions $\mu_{ij}$ are close to independent. Concretely, suppose

$$\sum_{i,j} |\mu_{ij} - \mu_i \otimes \mu_j|_{TV} \leq \delta n^2.$$

Here, $|\cdot |_{TV}$ denotes total variation distance, and $\mu_i \otimes \mu_j$ is the product of the two $1$-local distributions extracted from the pseudoexpectation $\pE$.
Let's look at what happens when we use the independent rounding strategy on $\pE$.

\begin{align*}
E_y G(y) & = \sum_{i \sim j} \Pr(y_i \neq y_j)\\
& = \sum_{i \sim j} \Pr_{x \sim \mu_i \otimes \mu_j}(x_i \neq x_j) \\
& \geq \sum_{i \sim j} \Pr_{x \sim \mu_{ij}}(x_i \neq x_j) - |\mu_{ij} - \mu_i \otimes \mu_j|_{TV} \\
& \geq \sum_{i \sim j} \Pr_{x \sim \mu_{ij}}(x_i \neq x_j) - \delta n^2 \\
& = \pE G(x) - \delta n^2.
\end{align*}

In this case (still a thought experiment), independent rounding has gone well, incurring just an additive $\delta n^2$ loss! But how can we arrange for $\pE$ to satisfy the approximate 2-wise independence condition?

### Reducing Global Correlation by Conditioning

The following lemma captures the key idea we'll use to arrange for $\pE$ to satisfy the condition needed for independent rounding. It was discovered independently by Montanari, in the context of statistical physics and later by Barak, Raghavendra, Steurer, and Tan, in the SoS context. The name "pinning lemma" comes from the statistical physics literature, where the act of conditioning on an event $x_i = 1$ is referred to as "pinning" the value of $x_i$ to $1$.

**Lemma 4 (Pinning Lemma):** Let $\pE$ be a degree-$d$ pseudoexpectation. There exists $t \leq d-2$ such that if $S \subseteq [n]$ is a random set of coordinates with $|S| = t$ and $y_S$ is a sample from the local distribution $\mu_T$ induced on $\{0,1\}^t$ by $\pE$, 

$$\E_{S,y_S} \sum_{i, j} | \mu_{ij \, | \, y_S} - \mu_{i \, | \, y_S} \otimes \mu_{j \, | \, y_S} |_{TV} \leq O(n^2 / \sqrt{d}),$$

where $\mu_{T \, | \, y_S}$ denotes the local distribution on $T$ of the conditional pseudoexpectation $\pE[\cdot \, | \, x_S = y_S]$ (which we define by conditioning iteratively on the coordinates).

*Proof idea:* Before we prove the lemma, let's explain the main idea, as usual drawing on intuition we cultivate by thinking of $\pE$ as representing the moments of an actual distribution. Suppose we have such a distribution $\mu$, and that the coordinates of $\mu$ are quite correlated, $\sum_{i,j} |\mu_{ij} - \mu_i \otimes \mu_j|_{TV} \gg \delta n^2$. We can rewrite this as

$$ \E_{i \sim [n]} \sum_{j \leq n} |\mu_{ij} - \mu_i \otimes \mu_j|_{TV} \gg \delta n,$$

so for a randomly chosen coordinate $i$, we expect to have $\sum_{j \leq n} |\mu_{ij} - \mu_i \otimes \mu_j|_{TV} \gg \delta n$ -- the $i$-th coordinate is nontrivially correlated with lots of other coordinates $j$. Intuitively, if you learned the value of the $i$-th coordinate in a sample from $\mu$, you would therefore also learn a lot about the values of the other coordinates!

A little more formally, conditioning on the value of coordinate $i$ should cause the *entropy* of the other coordinates to decrease. There is only so much entropy available, meaning that if we repeat this conditioning procedure, eventually we should have $\sum_{i,j} |\mu'_{ij} - \mu'_i \otimes \mu'_j|_{TV} \leq \delta n^2$, where $\mu'$ is some conditioning of $\mu$ on the values of some coordinates. It turns out that this will happen after at most $O(1/\delta^2)$ conditioning steps.

The cleanest way to express these ideas formally goes via entropy and mutual information. There are many excellent resources to learn elementary information theory, so we'll just state the basic facts we need to use here.

Let $H(X)$ denote the entropy of a (discrete) random variable $X$ and $I(X;Y)$ the mutual information between $X$ and $Y$.

**Lemma (Entropy Facts):**

(1) If $X$ is a $\{0,1\}$-valued random variable, $H(X) \in [0,1]$.
(2) (Pinsker's inequality): For jointly distributed random variables $X,Y$, denote by $\mu$ the joint distribution and $\mu_X, \mu_Y$ the marginal distributions of $X$ and $Y$. Then $|\mu - \mu_X \otimes \mu_Y|_{TV} \leq \sqrt{\frac 12 I(X;Y)}$.

*Proof of Lemma 4:* For $s \leq d-2$, let us define a (random) sequence of pseudoexpectations $\pE = \pE^{(0)},\pE^{(1)},\ldots,\pE^{(d-2)}$, where $\pE^{(s)}$ is obtained from $\pE^{(s-1)}$ by choosing a random $i \in [n]$ which has not been chosen in a previous step, sampling $y_i$ from the local distribution $\mu^{(s-1)}_i$, and setting $\pE^{(s)} = \pE^{(s-1)}[ \cdot \, | \, x_i = y_i]$.

(Exercise: check that the following alternative definition gives the same distribution for $\pE^{(s)}$. Choose $S \subseteq [n]$ with $|S| = s$ at random and sample $y_S$ from the local distribution $\mu_S$ induced by $\pE$. Then let $\pE^{(s)} = \pE[\cdot \, | \, x_S = y_S]$.)

Consider the *global information* for the $s$-th pseudoexpectation:
$$\text{global}_s := \sum_{i,j} I(X_i,X_j)$$
where, in the $i,j$-th term of the sum, $X_i,X_j$ denote a jointly distributed sample from the $2$-local distribution $\mu^{(s)}_{ij}$ induced by $\pE^{(s)}$.

If, for some $s$, we have $\E \text{global}_s \leq \delta n^2$, then by convexity of $\sqrt{\cdot}$ and Pinsker's inequality, we have $\E \sum_{i,j} |\mu_{ij}^{(s)} - \mu_i^{(s)} \otimes \mu_j^{(s)}|_{TV} \leq \sqrt{\delta} n^2$. For $\delta = \delta(d)$ we'll choose later, suppose that for every $s \leq d-2$, we have $\E \text{global}_s > \delta n^2$.



