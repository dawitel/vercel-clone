const MAX_LEN = 5;

/**
 * @description generate unique ID for each deployments
 * @returns unique ID
 */
export function generateID() {
  let uniqueId = "";
  const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
  for (let i = 0; i < MAX_LEN; i++) {
    uniqueId += subset[Math.floor(Math.random() * subset.length)];
  }
  return uniqueId;
}
