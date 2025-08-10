const cleanData = require('../scripts/cleanData');

describe('cleanData function', () => {
  it('filters out users missing emails and normalizes names to Title Case', () => {
    const input = [
      { name: 'john doe', email: 'john@example.com' },
      { name: 'Jane Doe', email: null },
      { name: 'alICe smith', email: 'alice@example.com' },
      { name: 'BOB JONES', email: 'bob@example.com' },
      { name: '  ', email: 'emptyName@example.com' },
    ];

    const expectedOutput = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Alice Smith', email: 'alice@example.com' },
      { name: 'Bob Jones', email: 'bob@example.com' },
    ];

    expect(cleanData(input)).toEqual(expectedOutput);
  });

  it('returns an empty array for an empty input array', () => {
    expect(cleanData([])).toEqual([]);
  });

  it('handles an array with no valid users', () => {
    const input = [
      { name: 'Jane Doe', email: null },
      { name: '  ', email: null },
    ];

    expect(cleanData(input)).toEqual([]);
  });
});