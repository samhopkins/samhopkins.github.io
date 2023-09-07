## Course Overview Notes

- Bad news: can't learn a generic probability distribution in high dimensions with a reasonable number of samples.

- Where do we go from here? We need to narrow the problem so that it becomes tractable.

- Next lecture we will see how to a very strong assumption -- Gaussian distribution leads to a tractable learning problem.

- This course is about the interplay of assumptions about the world, what learning and inference questions they make tractable, and what algorithmic strategies we can use to tackle those questions.

- 4 themes

1. language: we need to express nuanced assumptions about what kind of probability distribution/population we are getting data from. "graphical models" for expressing conditional independence assumptions, moment & tail bounds for expressing a priori knowledge about how spread out or concentrated a distribution is.

2. probability: this is a rigorous mathematical course, and we will need to develop a lot of tools from probability (and linear algebra, and optimization) along the way.

3. algorithms: we want solutions to inference problems which use reasonable amounts of data and reasonable amounts of computation. we will explore many algorithmic strategies for inference problems (the meat of the course!)

4. computational complexity: sometimes computational resources are a barrier. we will develop tools to understand when this is the case for problems in high-dimensional learning/inference/statistics.


- 3 modules

1. graphical models: language for conditional independence, allows us to express a variety of interesting and useful learning problems, and develop algorithms.

2. weak assumptions and robustness: when we don't have enough a priori knowledge to make conditional independence assumptions, what can we still learn? heavy-tailed statistics, contamination model. sum of squares algorithms.

3. computational complexity: statistical query lower bounds, reductions from cryptographic problems and planted clique, "low-degree" method.
