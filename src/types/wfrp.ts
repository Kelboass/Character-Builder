// WFRP2e Character Types - Proper character sheet order
export interface CharacterStats {
  // Main Characteristics (rolled during creation)
  weaponSkill: number;        // WS
  ballisticSkill: number;     // BS  
  strength: number;           // S
  toughness: number;          // T
  agility: number;            // Ag
  intelligence: number;       // Int
  willPower: number;          // WP
  fellowship: number;         // Fel
  
  // Secondary Characteristics (some rolled, some calculated)
  attacks: number;            // A (usually 1 for starting characters)
  wounds: number;             // W (rolled on table)
  strengthBonus: number;      // SB (calculated from S)
  toughnessBonus: number;     // TB (calculated from T) 
  movement: number;           // M (race dependent, not rolled)
  magic: number;              // Mag (0 for non-spellcasters)
  insanityPoints: number;     // IP (starts at 0)
  fate: number;         // FP (rolled on table)
}

export interface RaceTemplate {
  id: string;
  name: string;
  description: string;
  statModifiers: Partial<CharacterStats>;
  skills: string[];
  talents: string[];
  trappings: string[];
  physicalDescription: {
    height: string;
    build: string;
    coloring: string;
    lifespan: string;
  };
  specialRules?: string[];
}

export interface Character {
  id: string;
  name: string;
  race: string;
  currentCareer: string;
  stats: CharacterStats;
  skills: string[];
  talents: string[];
  trappings: string[];
  experience: {
    total: number;
    spent: number;
    available: number;
  };
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface CareerTemplate {
  id: string;
  name: string;
  description: string;
  type: 'basic' | 'advanced';
  tier: 1 | 2 | 3 | 4;
  
  // Career modifiers
  characteristicAdvances: Partial<CharacterStats>;
  skillAdvances: string[];
  talentAdvances: string[];
  trappings: string[];
  
  // Career progression
  careerExits: string[]; // What careers this can advance to
  entryRequirements?: string[];
  
  // Special rules
  specialRules?: string[];
  isMagicalCareer: boolean;
  magicAdvance?: number; // +1 Magic for spellcasting careers
}

export interface CareerPath {
  currentCareer: string;
  completedCareers: string[];
  availableExits: string[];
}
export type GenerationMethod = 'roll' | 'point-buy';

export interface DiceRoll {
  dice: number[];
  total: number;
  rollType: string;
}