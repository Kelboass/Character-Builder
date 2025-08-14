import { getRaceById, rollFromD10Table } from '../data/races';
import type { CharacterStats } from '../types/wfrp';

// =============================
// CORE DICE FUNCTIONS
// =============================

// Roll a d10 (1-10)
export const rollD10 = (): number => Math.ceil(Math.random() * 10);

// Roll a d100 (1-100)
export const rollD100 = (): number => Math.floor(Math.random() * 100) + 1;

// Roll 2d10 for WFRP2e characteristics
export const roll2D10 = (): number => rollD10() + rollD10();

// Calculate stat bonuses (first digit of characteristic)
export const calculateBonus = (stat: number): number => {
  return Math.floor(stat / 10);
};

// =============================
// TABLE-DRIVEN RACE FUNCTIONS
// =============================

export function rollWoundsForRace(raceId: string): number {
  const race = getRaceById(raceId);
  if (!race) throw new Error(`Unknown race: ${raceId}`);
  return rollFromD10Table(race.woundsTable, rollD10());
}

export function rollFateForRace(raceId: string): number {
  const race = getRaceById(raceId);
  if (!race) throw new Error(`Unknown race: ${raceId}`);
  return rollFromD10Table(race.fateTable, rollD10());
}

export const rollCharacteristicsByRace = (raceId: string) => {
  const race = getRaceById(raceId);
  if (!race) throw new Error(`Unknown race: ${raceId}`);

  const base = race.startingCharacteristics;
  
  return {
    // Standard 2d10 rolls for characteristics
    weaponSkill: base.weaponSkill + roll2D10(),
    ballisticSkill: base.ballisticSkill + roll2D10(),
    strength: base.strength + roll2D10(),
    toughness: base.toughness + roll2D10(),
    agility: base.agility + roll2D10(),
    intelligence: base.intelligence + roll2D10(),
    willPower: base.willPower + roll2D10(),
    fellowship: base.fellowship + roll2D10(),
    
    // RAW: determined by d10 roll on race tables
    wounds: rollWoundsForRace(raceId),
    fate: rollFateForRace(raceId),      
    movement: race.move
  };
};

// =============================
// DISPLAY FUNCTIONS
// =============================

type CharKey =
  | 'weaponSkill' | 'ballisticSkill' | 'strength' | 'toughness'
  | 'agility' | 'intelligence' | 'willPower' | 'fellowship';

// Get base characteristic value from race data (single source of truth)
const getRaceBase = (characteristic: CharKey, raceId: string): number => {
  const race = getRaceById(raceId);
  if (!race) return 0;
  return race.startingCharacteristics[characteristic];
};

export const formatCharacteristicsDisplay = (stats: CharacterStats, raceId: string): string => {
  return `
=== ${raceId.toUpperCase()} CHARACTER ===

=== MAIN CHARACTERISTICS ===
WS:  ${stats.weaponSkill} (${getRaceBase('weaponSkill', raceId)} + ${stats.weaponSkill - getRaceBase('weaponSkill', raceId)})
BS:  ${stats.ballisticSkill} (${getRaceBase('ballisticSkill', raceId)} + ${stats.ballisticSkill - getRaceBase('ballisticSkill', raceId)}) 
S:   ${stats.strength} (${getRaceBase('strength', raceId)} + ${stats.strength - getRaceBase('strength', raceId)})
T:   ${stats.toughness} (${getRaceBase('toughness', raceId)} + ${stats.toughness - getRaceBase('toughness', raceId)})
Ag:  ${stats.agility} (${getRaceBase('agility', raceId)} + ${stats.agility - getRaceBase('agility', raceId)})
Int: ${stats.intelligence} (${getRaceBase('intelligence', raceId)} + ${stats.intelligence - getRaceBase('intelligence', raceId)})
WP:  ${stats.willPower} (${getRaceBase('willPower', raceId)} + ${stats.willPower - getRaceBase('willPower', raceId)})
Fel: ${stats.fellowship} (${getRaceBase('fellowship', raceId)} + ${stats.fellowship - getRaceBase('fellowship', raceId)})

=== SECONDARY CHARACTERISTICS ===
A:   ${stats.attacks} (fixed at 1 for starting characters)
W:   ${stats.wounds} (rolled on d10 wounds table)
SB:  ${stats.strengthBonus} (calculated: first digit of S)
TB:  ${stats.toughnessBonus} (calculated: first digit of T)
M:   ${stats.movement} (race dependent)
Mag: ${stats.magic} (0 for non-spellcasters)
IP:  ${stats.insanityPoints} (starts at 0)
FP:  ${stats.fate} (rolled on d10 fate table)     
  `;
};