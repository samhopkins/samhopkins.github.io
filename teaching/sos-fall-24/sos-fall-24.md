## The Sum of Squares Method (MIT 6.S977), Fall '24

In this course we will study of algorithms and computational complexity through the lens of the Sum of Squares method (SoS), a powerful approach to algorithm design generalizing linear programming and spectral methods. We will choose some specific sub-topics based on student input, potentially including algorithms for combinatorial and continuous optimization (graphs, constraint satisfaction problems, unique games conjecture), applications to high-dimensional algorithmic statistics (robustness, privacy, method of moments), applications to quantum information, and an SoS perspective on computational complexity (of NP-hard problems and/or of statistical inference).

**Prerequisites:** Mathematical maturity is the main prerequisite. Familiarity with linear algebra, probability, discrete math, and algorithms at the advanced undergraduate level will be assumed.

**Meeting time:** Tuesdays and Thursdays, 9:30am -- 11:00am

**Location:** 3-442

**Instructor:** [Sam Hopkins](../../index.html)

**Office Hours:** Tuesdays, 11:15am -- 12:15pm, 32-G666.

**Evaluation:** Students will be expected to complete several problem sets and a research-oriented course project, which may consist of original research (theoretical and/or experimental!) and/or an exposition of 1 or 2 recent research papers.
In addition, students will provide peer reviews for each others' problem set solutions and course projects.
Weight for your final grade will be split: 40% psets, 20% peer reviews, 40% course project.

[Instructions](grading.pdf) for peer review.

**Collaboration policy:** You may collaborate with your peers on your problem sets in the following manner. You can have meetings to discuss and solve problems. At the end of a meeting, all records from the meeting must be destroyed. (No written notes, no whiteboard/chalkboard photos, etc.) Then, you must write your solutions on your own.

The course project can be done in groups of $2$.

**Collaborating with Google and AI Chatbots:** While doing psets, you can ask Google/ChatGPT/Claude/Llama/etc questions about background material but not detailed questions about a particular problem. This will be policed on the honor system, i.e. not at all. 

Example question which is within bounds: *What is the expected value of $\exp(-g^2 t^2)$ when $g$ is a standard Gaussian?*

Example question which is out of bounds: *How do I prove that pinning reduces global correlation?*


**Resources:** Some of the material in this course has been covered in other excellent courses and books. Here is a partial list:

- A [book-in-progress](https://www.sumofsquares.org/public/index.html) by Barak and Steurer
- A [course](https://tselilschramm.org/sos-paradigm/sos-paradigm.html) by Tselil Schramm on SoS and statistics 
- A [book](https://eccc.weizmann.ac.il/report/2019/106/) by Fleming, Kothari, and Pitassi
- Course [videos](https://www.youtube.com/playlist?list=PL3NB_Sd9CrX-6CeApf12demgpe2PO4k8c) by Kothari
- An [iteration of this course](../sos-fall-22/sos-fall-22.html) from two years ago



### Lectures + Lecture Notes

No.              Date       Topics                                                            Notes/References
-----------      ----       ------                                                            ----------------
1                9/5        Linear proofs and quadratic proofs                                [lecture notes](lecture-1.pdf)
2                9/10       Pseudoexpectations                                                [lecture notes](lecture-1.pdf)
3                9/12       Gaussian rounding                                                 [Barak-Steurer notes](https://www.sumofsquares.org/public/lec02-3_grothendieck)
4                9/17       Ellipsoid algorithm and other quadratic programming               [Barak-Steurer notes](https://www.sumofsquares.org/public/lec02-3_grothendieck), [Charikar-Wirth](https://web.archive.org/web/20170809104118id_/http://courses.cs.washington.edu/courses/cse522/05au/charikargrothendieck.pdf) on Max-Cut Gain, [Shmoys-Williamson book](https://www.designofapproxalgs.com/book.pdf) for PSD quadratic programming, [lecture notes](lecture-1.pdf) for ellipsoid
5                9/19       SoS over general domains, and beyond quadratics                   [Barak-Steurer notes](https://www.sumofsquares.org/public/lec-definitions-general)
6                9/24       Dense CSPs, Part 1                                                [lecture notes](global-correlation-rounding.pdf) (work in progress)
7                9/26       Dense CSPs, Part 2                                                [lecture notes](global-correlation-rounding.pdf) (work in progress)
8                10/1       Complexity of CSPs                                                Barak-Steurer, chapter 3
9                10/3       Random CSPs, Part 1                                               [scribe notes from 2022](../sos-fall-22/refuting-random-csps.html)
10               10/8       Random CSPs, Part 2
11               10/10      Robust mean estimation                                            [Schramm notes](https://tselilschramm.org/sos-paradigm/notes22/00-proofs-to-algs.pdf)
12               10/17      Robust mean estimation, continued                                 [Schramm notes](https://tselilschramm.org/sos-paradigm/notes22/00-proofs-to-algs.pdf)
13               10/22      Robust regression                                                 [Schramm notes](https://tselilschramm.org/sos-paradigm/notes22/08-robust-regression.pdf)
14               10/24      Mixture models                                                    [Schramm notes](https://tselilschramm.org/sos-paradigm/notes22/04-clustering-gaussians.pdf) [Hopkins notes](https://www.samuelbhopkins.com/clustering.pdf)
15               10/29      Certifiable moments                                               [original paper](https://arxiv.org/abs/2410.21194)
16               10/31      Tensor decomposition, Part 1                                      [old video](https://mit.hosted.panopto.com/Panopto/Pages/Auth/Login.aspx?Auth=SessionView&panoptoState=e015f434-204d-4513-b5e7-b21e016998f8)
17               11/5       Tensor decomposition, Part 2                                      [notes](https://www.samuelbhopkins.com/tensor-decomp-notes.pdf) [Schramm notes](https://tselilschramm.org/sos-paradigm/notes21/01-tensor-decomposition.pdf)
18               11/7       Tensor decomposition, Part 3?                                     [notes](https://www.samuelbhopkins.com/tensor-decomp-notes.pdf) [Schramm notes](https://tselilschramm.org/sos-paradigm/notes21/01-tensor-decomposition.pdf)

19               11/12      Guest lecture (Sidhanth Mohanty)
20               11/14      Best separable state?
21               11/19      Best separable state?
22               11/21      Guest lecture (Allen Liu)
23               11/26      Multiplicative weights?
24               12/3       Multiplicative weights?
25               12/5       Project presentations
26               12/10      Project presentations




### Assignments 

- [Problem Set 1](pset1.pdf)

- [Problem Set 2](pset2.pdf)

- [Problem Set 3](pset3.pdf)

- [Course Project (subject to revision)](project.pdf)
