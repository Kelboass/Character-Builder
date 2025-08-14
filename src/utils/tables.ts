import { rollD10 } from './dice';
import type { RaceData } from '../data/races';

export function rollFromTable(table: Array<[number, number, number]>): { roll: number; value: number } {
  const roll = rollD10();
  
  for (const [min, max, value] of table) {
    if (roll >= min && roll <= max) {
      return { roll, value };
    }
  }
  
  // Fallback to last entry if something goes wrong
  const lastEntry = table[table.length - 1];
  return { roll, value: lastEntry[2] };
}

export function rollFate(raceId: string, races: RaceData[]): { roll: number; value: number } | null {
  const race = races.find(r => r.id === raceId);
  if (!race) return null;
  
  return rollFromTable(race.fateTable);
}

export function rollWounds(raceId: string, races: RaceData[]): { roll: number; value: number } | null {
  const race = races.find(r => r.id === raceId);
  if (!race) return null;
  
  return rollFromTable(race.woundsTable);
}

export function rollRandomTalents(talents: Array<{ name: string; spec?: string }>, count: number): Array<{ name: string; spec?: string }> {
  const shuffled = [...talents].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function selectRandomChoices<T>(choices: T[], count: number): T[] {
  const shuffled = [...choices].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}