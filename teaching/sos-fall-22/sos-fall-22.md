## The Sum of Squares Method (MIT 6.S977), Fall '22

In this course we will study of algorithms and computational complexity through the lens of the Sum of Squares method (SoS), a powerful approach to algorithm design generalizing linear programming and spectral methods. We will choose some specific sub-topics based on student input, potentially including algorithms for combinatorial and continuous optimization (graphs, constraint satisfaction problems, unique games conjecture), applications to high-dimensional algorithmic statistics (robustness, privacy, method of moments), applications to quantum information, and an SoS perspective on computational complexity (of NP-hard problems and/or of statistical inference).

**Prerequisites:** Mathematical maturity is the main prerequisite. Familiarity with linear algebra, probability, discrete math, and algorithms at the advanced undergraduate level will be assumed.

**Meeting time:** Fridays, 9:30am -- 12:30am.

**Location:** 66-144 ~~1-150~~ ~~3-333~~

**Instructor:** [Sam Hopkins](../index.html)

**Office Hours:** By appointment.

**Piazza:** We will use Piazza for course discussions. Please sign up [here](https://piazza.com/mit/fall2022/6s977/home).

**Evaluation:** Students will be expected to complete two problem sets and a research-oriented course project, which may consist of original research (theoretical and/or experimental!) and/or an exposition of 1 or 2 recent research papers. Tentatively, weight for your final grade will be split as follows: 25% pset 1, 25% pset 2, 50% course project.

**Sick/Absence Policy and Lecture Recordings:** I will make a best effort to provide lecture recordings, using the lightweight lecture capture system in the room. If the capture system fails we will be out of luck. I will also provide links to resources which cover the material in each lecture (either external sources or lecture notes).

**Feedback:** Please offer any anonymous feedback you'd like to [here](https://docs.google.com/forms/d/e/1FAIpQLSc6Ti6xH5qqSfRKri9PuaQzLQ8DrNeQEGRBOU-K10zu54fcKA/viewform?usp=pp_url). Non-anonymous feedback can be emailed to me.

**Choosing topics:** I have chosen tentative topics for all the lectures. However, there is flexibility in 2-3 lectures of the course. If there is a topic you're excited to learn about which does not appear on the list of lecture topics, let me know. Maybe we can do something about it.

**Resources:** Some of the material in this course has been covered in other excellent courses and books. Here is a partial list:

- A [book-in-progress](https://www.sumofsquares.org/public/index.html) by Barak and Steurer
- A [course](https://tselilschramm.org/sos-paradigm/sos-paradigm.html) by Tselil Schramm on SoS and statistics 
- A [book](https://eccc.weizmann.ac.il/report/2019/106/) by Fleming, Kothari, and Pitassi
- Course [videos](https://www.youtube.com/playlist?list=PL3NB_Sd9CrX-6CeApf12demgpe2PO4k8c) by Kothari


### Lectures + Lecture Notes

No.              Date       Topics                                                            Notes/References
-----------      ----       ------                                                            ----------------
1                Sept. 9    optimization on the hypercube, max-cut                            sections 1.1, 1.2, and 2.1 of [Barak-Steurer](https://www.sumofsquares.org/public/index.html)
2                Sept. 16   global correlation rounding                                       [notes](global-correlation-rounding.html) [Raghavendra notes on hyperfinite graphs](https://github.com/nrprasad/webpage_files/raw/main/spring2021/sos-intro.pdf) [slides](sos-course-lec-2.pdf) [video](https://mit.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=7ec2214f-b58a-4891-9923-af0f015a5bd1)
3                Sept. 30   refuting random CSPs                                              [notes](refuting-random-csps.html)
4                Oct. 7     beyond the hypercube, robust mean estimation                      [Barak Steurer notes](https://www.sumofsquares.org/public/lec-definitions-general.html) [Schramm notes](https://tselilschramm.org/sos-paradigm/notes22/00-proofs-to-algs.pdf)
5                Oct. 14    clustering mixture models                                         [scribe notes](clustering-notes.pdf) [Sam's old notes](http://www.samuelbhopkins.com/clustering.pdf) [Schramm notes](https://tselilschramm.org/sos-paradigm/notes22/04-clustering-gaussians.pdf) [video](https://mit.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=9076b79e-37f6-46a8-aa1d-af2c01287dd5)
6                Oct. 21    tensor decomposition                                              [notes](http://www.samuelbhopkins.com/tensor-decomp-notes.pdf) [Schramm notes](https://tselilschramm.org/sos-paradigm/notes21/01-tensor-decomposition.pdf) [video](https://mit.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=7718484a-5ad4-4070-9b9e-af33017ef454)
7                Oct. 28    lower bounds 1: CSPs
8                Nov. 4     lower bounds 2: planted clique
9                Nov. 18    fast algorithms 1: spectral methods
10               Dec. 2     fast algorithms 2: matrix multiplicative weights
11               Dec. 9     differential privacy? best separable state? extension complexity?


(Many lecture topics are tentative!)


### Assignments

[Problem Set 1](sos-fall-22-pset-1.html) -- ~~tentatively~~ due Oct. 14

Problem Set 2 (not yet posted) -- tentatively due Nov. 4



<details>
<summary>Course project -- tentatively due December 14</summary>
The course project is an opportunity for you to dive deeper into the SoS research literature, make connections to your own research, and more! There is a great deal of flexibility in choosing your project. However, I need to approve all the project topics before you embark on them! I expect you to schedule a discussion of your project with me **before the end of October.** You may (but are not required to!) work with a partner on your project.

#### Possible approaches to the project:

- Formulate a research question related to the course (and possibly also related to your main area of research) and investigate it.
- Read one or more papers from the SoS literature and write an exposition of them at a level understandable by the students of 6.S977. Optionally, extend one or more of the result in these papers.
- Implement one or more algorithms from the SoS literature and study their performance empirically.
- Combinations of any of the above.

None of these options are preferred above others -- in particular, original research is *not* a requirement for a successful project. (That said, it does of course carry many potential rewards --  it is not uncommon for MIT course projects to end up as published papers!)

#### Deliverables:

You should produce a written report on your project activities. For expository projects, this report is your exposition. For research projects, this document should discuss the research problem you decided to investigate, why it merits your attention, how it relates to the subject of the course, and your findings.

Reports may vary in length, but when grading, I promise to read the first 10 pages of your report (typeset in a reasonable font with reasonable margins). I will read further material at my discretion.

#### Sam's Brainstormed List of SoS-Related Papers

This list has a strong bias towards TCS and statistics, because that's my area of expertise. However, other areas related to SoS or with SoS applications are also good fodder for projects -- control theory, quantum information, etc.

- Learning Gaussian Mixtures (some overlapping papers) [paper 1](https://arxiv.org/abs/2005.06417) [paper 2](https://arxiv.org/abs/2005.02970) [paper 3](https://cseweb.ucsd.edu/~dakane/RobustGaussianMixtures.pdf) [paper 4](https://arxiv.org/abs/2011.03622) (you don't have to read all of them)

- Online regression & bandits: [Chen-Koehler-Moitra-Yau](https://arxiv.org/abs/2010.04157)

- Robust stochastic block model recovery: [Ding-d'Orsi-Nasser-Steurer](https://arxiv.org/abs/2111.08568)

- Exact tensor completion: [Potechin-Steurer](https://www.dsteurer.org/paper/tensorcompletion.pdf)

- Best separable state: [Barak-Kothari-Steurer](https://www.dsteurer.org/paper/subexpalg.pdf)

- SDP size lower bounds via SoS: [Lee-Raghavendra-Steurer](https://www.dsteurer.org/paper/sdpsize.pdf)

- Mean-field approximation in Ising models: [Jain-Koehler-Risteski](https://arxiv.org/abs/1808.07226)

- Turan problems (combinatorics): [Raymond-Singh-Thomas](https://arxiv.org/abs/1507.03059)

- topics related to SDPs from Luca Trevisan's beyond worst case analysis class: [notes](https://lucatrevisan.github.io/teaching/bwca17/index.html)

- LP extension complexity: [Chen-Lee-Raghavendra-Steurer](https://arxiv.org/abs/1309.0563), [Rothvoss](https://arxiv.org/abs/1311.2369)

- Approximation algorithms for scheduling: [Levey-Rothvoss](https://arxiv.org/abs/1509.07808) [Davies-Kulkarni-Rothvoss-Tarnawski-Zhang](https://arxiv.org/abs/2004.09682)

- SoS + unique games conjecture: (many possible refs; ask me)

- Faster tensor decomposition: [Schramm-Steurer](https://arxiv.org/abs/1706.08672)

- Random 2CSPs: [Deshpande-Montanari-O'Donnell-Schramm-Sen](https://arxiv.org/abs/1804.05230) [Musipatla-O'Donnell-Schramm-Wu](https://arxiv.org/abs/2108.01038)

- Quantum Max Cut: [Anshu-Gosset-Morenz](https://arxiv.org/abs/2003.14394) (other papers as well; ask me or Google)

- (robust) sparse mean estimation: [Diakonikolas-Kane-Karmalkar-Pensia-Pittas](https://arxiv.org/abs/2206.03441)

- Ideal Membership Problem: [Bulatov-Rafiey](https://arxiv.org/pdf/2011.03700.pdf)

(Of course this is only a partial list -- I just ran out of steam here!)

</details>
