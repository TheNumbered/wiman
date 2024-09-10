// Converts snake_case keys in an object to camelCase
export const toCamelCase = (row) => {
  const camelCaseRow = {};
  for (const key in row) {
    const camelKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
    camelCaseRow[camelKey] = row[key];
  }
  return camelCaseRow;
};

// Converts an array of rows with snake_case keys to camelCase
export const toCamelCaseArray = (rows) => rows.map(toCamelCase);

// Converts camelCase keys in an object to snake_case

export const toSnakeCase = (row) => {
  const snakeCaseRow = {};
  for (const key in row) {
    const snakeKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
    snakeCaseRow[snakeKey] = row[key];
  }
  return snakeCaseRow;
};
