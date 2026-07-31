/-
Copyright (c) 2026 random-matrices-lean contributors. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE.
Authors: random-matrices-lean contributors
-/
import Mathlib.Probability.Combinatorics.BinomialRandomGraph.Defs
import Mathlib.Analysis.Matrix.Normed
import Mathlib.Combinatorics.SimpleGraph.AdjMatrix
import Mathlib.Logic.Equiv.Fin.Rotate

/-!
# Independent Rademacher matrices

This file states the operator-norm bound for a symmetric Rademacher matrix:
the diagonal is zero and the entries above the diagonal are independent
uniform signs.
-/

open MeasureTheory
open scoped Matrix.Norms.L2Operator
open scoped unitInterval

namespace RandomMatrices.IndependentRademacher

/-- The zero-diagonal signed adjacency matrix of a simple graph. -/
noncomputable def signedAdjacencyMatrix {n : ℕ} (G : SimpleGraph (Fin n)) :
    Matrix (Fin n) (Fin n) ℝ := by
  classical
  exact 2 • G.adjMatrix ℝ -
    (SimpleGraph.completeGraph (Fin n)).adjMatrix ℝ

/-- The symmetric Rademacher law on zero-diagonal matrices. -/
noncomputable def symmetricRademacherMeasure (n : ℕ) :
    Measure (SimpleGraph (Fin n)) :=
  SimpleGraph.binomialRandom (Fin n)
    (⟨1 / 2, by norm_num⟩ : I)

/-- A cyclic vertex sequence with the given number of steps. -/
abbrev ClosedWalk (n length : ℕ) := Fin length → Fin n

/-- The unordered edge crossed at one step of a cyclic walk. -/
def traversedEdge {n length : ℕ}
    (walk : ClosedWalk n length) (step : Fin length) : Sym2 (Fin n) :=
  s(walk step, walk (finRotate length step))

/-- How often a cyclic walk traverses an unordered edge. -/
def edgeMultiplicity {n length : ℕ}
    (walk : ClosedWalk n length) (edge : Sym2 (Fin n)) : ℕ :=
  Fintype.card {step : Fin length // traversedEdge walk step = edge}

/-- A closed walk with no loops in which every edge is used an even number
of times. These are exactly the walks surviving Rademacher averaging. -/
def IsDoubleCovered {n length : ℕ} (walk : ClosedWalk n length) : Prop :=
  (∀ step, walk step ≠ walk (finRotate length step)) ∧
    ∀ edge, Even (edgeMultiplicity walk edge)

instance instDecidableIsDoubleCovered {n length : ℕ}
    (walk : ClosedWalk n length) : Decidable (IsDoubleCovered walk) := by
  unfold IsDoubleCovered
  infer_instance

/-- Closed walks surviving Rademacher averaging. -/
abbrev DoubleCoveredClosedWalk (n length : ℕ) :=
  {walk : ClosedWalk n length // IsDoubleCovered walk}

/-- The expected operator norm of the symmetric Rademacher matrix. -/
noncomputable def expectedOperatorNorm (n : ℕ) : ℝ :=
  ∫ graph, ‖signedAdjacencyMatrix graph‖ ∂symmetricRademacherMeasure n

/-- Its expected even trace power. -/
noncomputable def expectedTracePower (n momentOrder : ℕ) : ℝ :=
  ∫ graph, Matrix.trace
      ((signedAdjacencyMatrix graph) ^ (2 * momentOrder))
    ∂symmetricRademacherMeasure n

/-- An even trace-moment bound implies the corresponding expected
operator-norm bound. -/
lemma expectedOperatorNorm_le_of_expectedTracePower_le
    (n momentOrder : ℕ) (hpositive : 0 < momentOrder)
    (bound : ℝ) (hbound : 0 ≤ bound)
    (htrace :
      expectedTracePower n momentOrder ≤ bound ^ (2 * momentOrder)) :
    expectedOperatorNorm n ≤ bound := by
  sorry

/-- Expanding the trace and averaging signs leaves exactly the loopless
closed walks in which every edge has even multiplicity. -/
lemma expectedTracePower_eq_card_doubleCoveredClosedWalk
    (n momentOrder : ℕ) (hpositive : 0 < momentOrder) :
    expectedTracePower n momentOrder =
      Fintype.card (DoubleCoveredClosedWalk n (2 * momentOrder)) := by
  sorry

/-- Pairing equal edge occurrences bounds the surviving walks: such a walk
uses at most `momentOrder + 1` vertices, and the remaining factor counts
pairing and orientation choices. -/
lemma card_doubleCoveredClosedWalk_le
    (n momentOrder : ℕ) (hpositive : 0 < momentOrder) :
    (Fintype.card
        (DoubleCoveredClosedWalk n (2 * momentOrder)) : ℝ) ≤
      (n : ℝ) * (n - 1) * n ^ (momentOrder - 1) *
        (4 * momentOrder) ^ momentOrder := by
  sorry

/-- At logarithmic moment order, the combinatorial estimate has the desired
`sqrt n * sqrt (log n)` scale. -/
lemma logarithmicMomentEstimate (n : ℕ) :
    let momentOrder := Nat.log 2 n + 1
    (n : ℝ) * (n - 1) * n ^ (momentOrder - 1) *
        (4 * momentOrder) ^ momentOrder ≤
      (8 * Real.sqrt n * Real.sqrt (Real.log n)) ^
        (2 * momentOrder) := by
  sorry

/-- The expected operator norm of an `n × n` symmetric Rademacher matrix is
bounded by a universal constant times `sqrt n * sqrt (log n)`. -/
theorem expected_operatorNorm_le_const_sqrt_mul_sqrt_log :
    ∃ C : ℝ, 0 < C ∧
      ∀ n : ℕ,
        expectedOperatorNorm n ≤
          C * Real.sqrt (n : ℝ) *
            Real.sqrt (Real.log (n : ℝ)) := by
  refine ⟨8, by norm_num, fun n ↦ ?_⟩
  let momentOrder := Nat.log 2 n + 1
  have hpositive : 0 < momentOrder := by
    simp [momentOrder]
  apply expectedOperatorNorm_le_of_expectedTracePower_le
    n momentOrder hpositive
    (8 * Real.sqrt n * Real.sqrt (Real.log n)) <;> try positivity
  calc
    expectedTracePower n momentOrder =
        Fintype.card
          (DoubleCoveredClosedWalk n (2 * momentOrder)) :=
      expectedTracePower_eq_card_doubleCoveredClosedWalk
        n momentOrder hpositive
    _ ≤ (n : ℝ) * (n - 1) * n ^ (momentOrder - 1) *
          (4 * momentOrder) ^ momentOrder :=
      card_doubleCoveredClosedWalk_le n momentOrder hpositive
    _ ≤ (8 * Real.sqrt n * Real.sqrt (Real.log n)) ^
          (2 * momentOrder) := by
      simpa only [momentOrder] using logarithmicMomentEstimate n

end RandomMatrices.IndependentRademacher
