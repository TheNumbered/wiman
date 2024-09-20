import { describe, expect, it } from 'vitest';
import { expandRepeats } from '../expand-repeats';

describe('expandRepeats', () => {
  it('should return a single date when frequency is "none"', () => {
    const result = expandRepeats('2024-09-17', 'none', '2024-09-30');
    expect(result).toEqual(['2024-09-17']);
  });

  it('should return a single date when no repeatUntil date is provided', () => {
    const result = expandRepeats('2024-09-17', 'daily');
    expect(result).toEqual(['2024-09-17']);
  });

  it('should return daily repeated dates until repeatUntil', () => {
    const result = expandRepeats('2024-09-17', 'daily', '2024-09-20');
    expect(result).toEqual(['2024-09-17', '2024-09-18', '2024-09-19', '2024-09-20']);
  });

  it('should return weekly repeated dates until repeatUntil', () => {
    const result = expandRepeats('2024-09-17', 'weekly', '2024-10-08');
    expect(result).toEqual(['2024-09-17', '2024-09-24', '2024-10-01', '2024-10-08']);
  });

  it('should return monthly repeated dates until repeatUntil', () => {
    const result = expandRepeats('2024-09-17', 'monthly', '2024-12-17');
    expect(result).toEqual(['2024-09-17', '2024-10-17', '2024-11-17', '2024-12-17']);
  });

  it('should not add dates beyond the repeatUntil date', () => {
    const result = expandRepeats('2024-09-17', 'daily', '2024-09-19');
    expect(result).toEqual(['2024-09-17', '2024-09-18', '2024-09-19']);
  });

  it('should handle leap years correctly for monthly repeats', () => {
    const result = expandRepeats('2024-02-29', 'monthly', '2024-05-29');
    expect(result).toEqual(['2024-02-29', '2024-03-29', '2024-04-29', '2024-05-29']);
  });

  it('should return an empty array if invalid frequency is provided', () => {
    const result = expandRepeats('2024-09-17', 'invalid', '2024-09-20');
    expect(result).toEqual(['2024-09-17']);
  });
});
