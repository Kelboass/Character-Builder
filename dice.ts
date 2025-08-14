import { WFRP_RACES, type RaceData } from '../data/races';
import type { DiceRoll, CharacterStats } from '../types/wfrp';

// =============================
// CORE DICE FUNCTIONS
// =============================

// Roll a d10 (1-10)
export const rollD10 = (): number => Math.floor(Math.random() * 10) + 1;

// Roll a d100 (1-100)
export const rollD100 = (): number => Math.floor(Math.random() * 100) + 1;

// Roll 2d10 for WFRP2e characteristics
export const roll2D10 = (): number => rollD10() + rollD10();

// Calculate stat bonuses (first digit of characteristic)
export const calculateBonus = (stat: number): number => {
  return Math.floor(stat / 10);
};
export const rollFateForRace = (param:string)=>{
  return {roll:1,value:1};
} 
export const rollWoundsForRace = rollFateForRace


// Roll characteristics by race
export const rollCharacteristicsByRace = (raceId: string): CharacterStats => {
  let stats: CharacterStats;
  
  switch (raceId) {
    case 'dwarf':
      stats = {
        weaponSkill: 30 + roll2D10(),
        ballisticSkill: 20 + roll2D10(),
        strength: 20 + roll2D10(),
        toughness: 30 + roll2D10(),
        agility: 10 + roll2D10(),
        intelligence: 20 + roll2D10(),
        willPower: 20 + roll2D10(),
        fellowship: 10 + roll2D10(),
        attacks: 1,
        wounds: rollWoundsByRace('dwarf'),
        strengthBonus: 0,
        toughnessBonus: 0,
        movement: 3,
        magic: 0,
        insanityPoints: 0,
        fatePoints: rollFatePointsByRace('dwarf')
      };
      break;

    case 'elf':
      stats = {
        weaponSkill: 20 + roll2D10(),
        ballisticSkill: 30 + roll2D10(),
        strength: 20 + roll2D10(),
        toughness: 20 + roll2D10(),
        agility: 30 + roll2D10(),
        intelligence: 20 + roll2D10(),
        willPower: 20 + roll2D10(),
        fellowship: 20 + roll2D10(),
        attacks: 1,
        wounds: rollWoundsByRace('elf'),
        strengthBonus: 0,
        toughnessBonus: 0,
        movement: 5,
        magic: 0,
        insanityPoints: 0,
        fatePoints: rollFatePointsByRace('elf')
      };
      break;

    case 'halfling':
      stats = {
        weaponSkill: 10 + roll2D10(),
        ballisticSkill: 30 + roll2D10(),
        strength: 10 + roll2D10(),
        toughness: 10 + roll2D10(),
        agility: 30 + roll2D10(),
        intelligence: 20 + roll2D10(),
        willPower: 20 + roll2D10(),
        fellowship: 30 + roll2D10(),
        attacks: 1,
        wounds: rollWoundsByRace('halfling'),
        strengthBonus: 0,
        toughnessBonus: 0,
        movement: 4,
        magic: 0,
        insanityPoints: 0,
        fatePoints: rollFatePointsByRace('halfling')
      };
      break;

    case 'voryn':
      stats = {
        weaponSkill: 20 + roll2D10(),
        ballisticSkill: 20 + roll2D10(),
        strength: 15 + roll2D10(),
        toughness: 20 + roll2D10(),
        agility: 25 + roll2D10(),
        intelligence: 20 + roll2D10(),
        willPower: 25 + roll2D10(),
        fellowship: 15 + roll2D10(),
        attacks: 1,
        wounds: rollWoundsByRace('voryn'),
        strengthBonus: 0,
        toughnessBonus: 0,
        movement: 4,
        magic: 0,
        insanityPoints: 0,
        fatePoints: rollFatePointsByRace('voryn')
      };
      break;

    default: // Human
      stats = {
        weaponSkill: 20 + roll2D10(),
        ballisticSkill: 20 + roll2D10(),
        strength: 20 + roll2D10(),
        toughness: 20 + roll2D10(),
        agility: 20 + roll2D10(),
        intelligence: 20 + roll2D10(),
        willPower: 20 + roll2D10(),
        fellowship: 20 + roll2D10(),
        attacks: 1,
        wounds: rollWoundsByRace('human'),
        strengthBonus: 0,
        toughnessBonus: 0,
        movement: 4,
        magic: 0,
        insanityPoints: 0,
        fatePoints: rollFatePointsByRace('human')
      };
  }

  // Calculate bonuses
  stats.strengthBonus = calculateBonus(stats.strength);
  stats.toughnessBonus = calculateBonus(stats.toughness);

  return stats;
};

// Roll starting wounds by race
const rollWoundsByRace = (raceId: string): number => {
  const roll = rollD10();
  
  switch (raceId) {
    case 'dwarf':
      if (roll <= 3) return 11;
      if (roll <= 6) return 12;
      if (roll <= 9) return 13;
      return 14;
      
    case 'elf':
      if (roll <= 3) return 9;
      if (roll <= 6) return 10;
      if (roll <= 9) return 11;
      return 12;
      
    case 'halfling':
      if (roll <= 3) return 8;
      if (roll <= 6) return 9;
      if (roll <= 9) return 10;
      return 11;
      
    case 'voryn':
      if (roll <= 3) return 8;
      if (roll <= 6) return 9;
      if (roll <= 9) return 10;
      return 11;
      
    default: // Human
      if (roll <= 3) return 10;
      if (roll <= 6) return 11;
      if (roll <= 9) return 12;
      return 13;
  }
};

// Roll starting fate points by race
const rollFatePointsByRace = (raceId: string): number => {
  const roll = rollD10();
  
  switch (raceId) {
    case 'dwarf':
      if (roll <= 4) return 1;
      if (roll <= 7) return 2;
      return 3;
      
    case 'elf':
      if (roll <= 4) return 1;
      if (roll <= 7) return 2;
      return 2;
      
    case 'halfling':
      if (roll <= 4) return 2;
      if (roll <= 7) return 2;
      return 3;
      
    case 'voryn':
      if (roll <= 4) return 1;
      if (roll <= 7) return 2;
      return 3;
      
    default: // Human
      if (roll <= 4) return 2;
      if (roll <= 7) return 3;
      return 3;
  }
};
// Display characteristics in proper WFRP2e character sheet order
// Display characteristics in proper WFRP2e character sheet order with roll details
export const formatCharacteristicsDisplay = (stats: CharacterStats, raceId: string): string => {
  const getRaceBase = (characteristic: string, raceId: string): number => {
    switch (raceId) {
      case 'dwarf':
        if (characteristic === 'weaponSkill') return 30;
        if (characteristic === 'ballisticSkill') return 20;
        if (characteristic === 'strength') return 20;
        if (characteristic === 'toughness') return 30;
        if (characteristic === 'agility') return 10;
        if (characteristic === 'fellowship') return 10;
        return 20; // Int, WP default
        
      case 'elf':
        if (characteristic === 'weaponSkill') return 20;
        if (characteristic === 'ballisticSkill') return 30;
        if (characteristic === 'agility') return 30;
        return 20; // All others
        
      case 'halfling':
        if (characteristic === 'weaponSkill') return 10;
        if (characteristic === 'ballisticSkill') return 30;
        if (characteristic === 'strength') return 10;
        if (characteristic === 'toughness') return 10;
        if (characteristic === 'agility') return 30;
        if (characteristic === 'fellowship') return 30;
        return 20; // Int, WP
        
      case 'voryn':
        if (characteristic === 'strength') return 15;
        if (characteristic === 'agility') return 25;
        if (characteristic === 'willPower') return 25;
        if (characteristic === 'fellowship') return 15;
        return 20; // WS, BS, T, Int
        
      default: // human
        return 20; // All 20+2d10
    }
  };

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
FP:  ${stats.fatePoints} (rolled on d10 fate table)
  `;
};