export function general(distribution) {
  const r = Math.random();
  let cumulative = 0;
  for (const { value, probability } of distribution) {
    cumulative += probability;
    if (r <= cumulative) return value;
  }
  return distribution[distribution.length - 1].value;
}

export function exponential(mean) {
  const lambda = 1 / mean;
  return -Math.log(1 - Math.random()) / lambda;
}

export function deterministic(value) {
  return value;
}

export function erlang(k, lambda) {
  let total = 0;
  for (let i = 0; i < k; i++) {
    total += exponential(1 / lambda);
  }
  return total;
}

export function generateTime(pattern, options = {}) {
  const { mean = 1, value = 1, k = 2, distribution = [] } = options;
  switch (pattern) {
    case "M":
      return exponential(mean);
    case "D":
      return deterministic(value);
    case "Em":
      return erlang(k, 1 / mean);
    case "G":
      return general(distribution);
    default:
      return exponential(mean);
  }
}
