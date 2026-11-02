// utils/coalitionEngine.js

/**
 * Safely extracts numerical position values regardless of whether
 * the 'pos' property is an Array or an Object.
 * @param {Array|Object} pos - The position profile of a party.
 * @returns {number[]} Array of normalized numeric values.
 */
function extractPositionValues(pos) {
  if (!pos) return [];
  if (Array.isArray(pos)) {
    return pos.map((v) => (v == null || v === '' || isNaN(v) ? 0 : Number(v)));
  }
  if (typeof pos === 'object') {
    return Object.values(pos).map((v) => (v == null || v === '' || isNaN(v) ? 0 : Number(v)));
  }
  return [];
}

/**
 * Computes Manhattan / L1 ideological distance between two parties across all axes.
 * @param {Object} partyA 
 * @param {Object} partyB 
 * @returns {number} Cumulative absolute difference.
 */
function calculateIdeologicalDistance(partyA, partyB) {
  const valsA = extractPositionValues(partyA.pos);
  const valsB = extractPositionValues(partyB.pos);
  const length = Math.max(valsA.length, valsB.length);

  if (length === 0) return 0;

  let sumDiff = 0;
  for (let i = 0; i < length; i++) {
    const a = valsA[i] ?? 0;
    const b = valsB[i] ?? 0;
    sumDiff += Math.abs(a - b);
  }
  return sumDiff;
}

/**
 * Resolves the pairwise relationship between two parties.
 * Values: 1 (harmony/alliance) to 7 (animosity/veto). Default: 4 (neutral).
 * @param {string} p1Id 
 * @param {string} p2Id 
 * @param {Object} relations 
 * @param {Object} asymmetricPairs 
 * @returns {number}
 */
function getPairRelation(p1Id, p2Id, relations = {}, asymmetricPairs = {}) {
  const key1 = `${p1Id}-${p2Id}`;
  const key2 = `${p2Id}-${p1Id}`;

  // Prioritize directional key if marked asymmetric
  if (asymmetricPairs[key1] && relations[key1] !== undefined) {
    const val = Number(relations[key1]);
    return isNaN(val) ? 4 : val;
  }
  if (asymmetricPairs[key2] && relations[key2] !== undefined) {
    const val = Number(relations[key2]);
    return isNaN(val) ? 4 : val;
  }

  // Fallback to symmetric key definition
  const val = relations[key1] ?? relations[key2];
  const numVal = Number(val);
  return !isNaN(numVal) && val !== undefined ? numVal : 4;
}

/**
 * Validates if any party has a hard veto (score 7 or -1) against another party.
 * @param {Object[]} parties 
 * @param {Object} relations 
 * @param {Object} asymmetricPairs 
 * @returns {boolean} True if a hard veto exists.
 */
function hasVeto(parties, relations, asymmetricPairs) {
  for (let i = 0; i < parties.length; i++) {
    for (let j = i + 1; j < parties.length; j++) {
      const p1 = parties[i].id;
      const p2 = parties[j].id;

      const rel1 = relations[`${p1}-${p2}`];
      const rel2 = relations[`${p2}-${p1}`];

      if (Number(rel1) === 7 || Number(rel2) === 7 || Number(rel1) === -1 || Number(rel2) === -1) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Calculates both ideological distance and animosity sum for all pairs.
 * Enforces lower-is-better scoring (e.g. 1 + 1 < 7 + 7).
 * @param {Object[]} coalitionParties 
 * @param {Object} relations 
 * @param {Object} asymmetricPairs 
 * @returns {Object} Calculated metrics and total score.
 */
function calculateCoalitionScores(coalitionParties, relations, asymmetricPairs) {
  let ideologicalGap = 0;
  let relationsScore = 0;
  let pairCount = 0;

  for (let i = 0; i < coalitionParties.length; i++) {
    for (let j = i + 1; j < coalitionParties.length; j++) {
      const p1 = coalitionParties[i];
      const p2 = coalitionParties[j];

      ideologicalGap += calculateIdeologicalDistance(p1, p2);
      relationsScore += getPairRelation(p1.id, p2.id, relations, asymmetricPairs);
      pairCount++;
    }
  }

  // Combined score: lower gap and lower animosity yields higher rank
  const totalScore = ideologicalGap + relationsScore;

  return {
    ideologicalGap,
    relationsScore,
    totalScore,
    avgRelation: pairCount > 0 ? Number((relationsScore / pairCount).toFixed(1)) : 0,
  };
}

/**
 * Checks for parity feasibility and partitions parties into two equal seat blocks.
 * @param {Object[]} coalitionParties 
 * @param {number} totalSeats 
 * @returns {Object} Parity metadata and blockA / blockB objects if valid.
 */
function splitParityBlocks(coalitionParties, totalSeats) {
  // Parity requires an even number of total seats
  if (totalSeats % 2 !== 0) {
    return { isParity: false, parityType: null, blocks: null };
  }

  const targetSeats = totalSeats / 2;

  // Recursive search to partition into an exact half-seat subset
  function findEqualSubset(index, currentSubset, currentSum) {
    if (currentSum === targetSeats) {
      return currentSubset;
    }
    if (currentSum > targetSeats || index >= coalitionParties.length) {
      return null;
    }

    // Branch 1: include current party
    const withParty = findEqualSubset(
      index + 1,
      [...currentSubset, coalitionParties[index]],
      currentSum + Number(coalitionParties[index].seats)
    );
    if (withParty) return withParty;

    // Branch 2: exclude current party
    return findEqualSubset(index + 1, currentSubset, currentSum);
  }

  const subsetA = findEqualSubset(0, [], 0);

  if (subsetA) {
    const idsA = new Set(subsetA.map((p) => p.id));
    const subsetB = coalitionParties.filter((p) => !idsA.has(p.id));

    return {
      isParity: true,
      parityType: totalSeats === 60 ? 'ממשלת 60 שוויונית' : `פריטטית (${targetSeats}/${targetSeats})`,
      blocks: {
        blockA: {
          name: 'גוש א׳',
          totalSeats: targetSeats,
          parties: subsetA,
        },
        blockB: {
          name: 'גוש ב׳',
          totalSeats: targetSeats,
          parties: subsetB,
        },
      },
    };
  }

  return { isParity: false, parityType: null, blocks: null };
}

/**
 * Main engine function: finds all non-vetoed coalitions above minSeats threshold.
 * Avoids duplicate sets using a Set signature, attaches parity blocks,
 * and sorts strictly by lowest combined score.
 * @param {Object[]} parties 
 * @param {Object} relations 
 * @param {Object} asymmetricPairs 
 * @param {number} minSeats - Defaults to 60 to permit 60-seat parity governments.
 * @returns {Object[]} Ranked coalition list.
 */
export function findBestCoalitions(
  parties = [],
  relations = {},
  asymmetricPairs = {},
  minSeats = 60
) {
  if (!Array.isArray(parties) || parties.length === 0) return [];

  // Filter out any parties with zero or non-numeric seats
  const activeParties = parties.filter((p) => Number(p.seats) > 0);

  // Set to ensure unique coalition combinations
  const seenSignatures = new Set();
  const results = [];

  function generateCombinations(startIndex, current, currentSeats) {
    if (currentSeats >= minSeats) {
      // Create canonical signature by sorting IDs
      const signature = current
        .map((p) => p.id)
        .sort()
        .join('|');

      if (!seenSignatures.has(signature)) {
        seenSignatures.add(signature);

        if (!hasVeto(current, relations, asymmetricPairs)) {
          const { ideologicalGap, relationsScore, totalScore, avgRelation } =
            calculateCoalitionScores(current, relations, asymmetricPairs);

          const parityInfo = splitParityBlocks(current, currentSeats);

          results.push({
            id: signature,
            parties: [...current],
            totalSeats: currentSeats,
            partyCount: current.length,
            ideologicalGap,
            relationsScore,
            totalScore,
            avgRelation,
            isParity: parityInfo.isParity,
            parityType: parityInfo.parityType,
            blocks: parityInfo.blocks, // Two separate objects for parity
          });
        }
      }
    }

    for (let i = startIndex; i < activeParties.length; i++) {
      const party = activeParties[i];
      const seats = Number(party.seats) || 0;

      current.push(party);
      generateCombinations(i + 1, current, currentSeats + seats);
      current.pop(); // Backtracking step
    }
  }

  generateCombinations(0, [], 0);

  // Deterministic sorting:
  // 1. Lowest total penalty score (ideology + animosity)
  // 2. Lowest total seats (leaner coalitions prioritized)
  // 3. Lowest party count (fewer negotiation partners)
  return results.sort((a, b) => {
    if (a.totalScore !== b.totalScore) {
      return a.totalScore - b.totalScore;
    }
    if (a.totalSeats !== b.totalSeats) {
      return a.totalSeats - b.totalSeats;
    }
    return a.partyCount - b.partyCount;
  });
}

// Dual exports to prevent any Next.js build or import name mismatches
export { findBestCoalitions as findCoalitions };
export default findBestCoalitions;