import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { WFRP_RACES, type SkillChoice, type TalentChoice } from '../data/races';

type StatKey = 'weaponSkill'|'ballisticSkill'|'strength'|'toughness'|'agility'|'intelligence'|'willPower'|'fellowship';
type StatBlock = Record<StatKey, number>;

const baseStats: StatBlock = {
  weaponSkill: 20,
  ballisticSkill: 20,
  strength: 20,
  toughness: 20,
  agility: 20,
  intelligence: 20,
  willPower: 20,
  fellowship: 20
};

export type Draft = {
  id: string;
  name: string;
  raceId: string | null;
  careerId: string | null;
  stats: StatBlock;
  // Store rolled fate AND wounds separately 
  rolledFate: { roll: number; value: number } | null;
  rolledWounds: { roll: number; value: number } | null;
  derived: {
    wounds: number;      // ADD THIS BACK
    move: number;
    fate: number;        // ADD THIS BACK  
    strengthBonus: number;
    toughnessBonus: number;
    attacks: number;
    magic: number;
    insanityPoints: number;
  };
  skills: Array<{ name: string; spec?: string }>; // Match your race structure
  talents: Array<{ name: string; spec?: string }>; // Match your race structure
  xpTotal: number;
  xpSpent: number;
  createdAt: string;
  updatedAt: string;
};

type Action =
  | { type: 'SET_RACE'; raceId: string }
  | { type: 'SET_CAREER'; careerId: string; magicFloor?: number }
  | { type: 'SET_STAT'; key: StatKey; value: number }
  | { type: 'SET_STATS'; stats: StatBlock }
  | { type: 'SET_NAME'; name: string }
  | { type: 'ROLL_FATE'; roll: number; value: number }
  | { type: 'ROLL_WOUNDS'; roll: number; value: number }
  | { type: 'SET_SKILLS'; skills: Array<{ name: string; spec?: string }> }
  | { type: 'SET_TALENTS'; talents: Array<{ name: string; spec?: string }> }
  | { type: 'FINALIZE_DERIVED' }
  | { type: 'RESET' };

function calcDerived(stats: StatBlock, raceId: string | null, magicStart: number = 0, rolledFate?: number, rolledWounds?: number) {
  const race = raceId ? WFRP_RACES.find(r => r.id === raceId) : undefined;
  
  const sb = Math.floor(stats.strength / 10);
  const tb = Math.floor(stats.toughness / 10);

  // Use rolled values if available, otherwise defaults
  const wounds = rolledWounds ?? Math.max(1, sb + tb + 10);
  const move = race?.move ?? 4;
  const fate = rolledFate ?? 2; // Default fate
  const attacks = 1;
  const magic = magicStart;
  const insanityPoints = 0;

  return {
    wounds,
    move,
    fate,
    strengthBonus: sb,
    toughnessBonus: tb,
    attacks,
    magic,
    insanityPoints
  };
}

const generateId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

const touch = () => ({ updatedAt: new Date().toISOString() });

const createInitialDraft = (): Draft => {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    name: 'Unnamed Character',
    raceId: null,
    careerId: null,
    stats: { ...baseStats },
    rolledFate: null,
    rolledWounds: null,
    derived: {
      wounds: 0,
      move: 0,
      fate: 0,
      strengthBonus: 0,
      toughnessBonus: 0,
      attacks: 1,
      magic: 0,
      insanityPoints: 0
    },
    skills: [],
    talents: [],
    xpTotal: 0,
    xpSpent: 0,
    createdAt: now,
    updatedAt: now
  };
};

type InternalState = Draft & { 
  _hasRolled: boolean;
  _magicStart: number;
};

const initialState: InternalState = { 
  ...createInitialDraft(), 
  _hasRolled: false,
  _magicStart: 0
};

function reducer(state: InternalState, action: Action): InternalState {
  switch (action.type) {
    case 'SET_RACE':
      return { 
        ...state, 
        ...touch(),
        raceId: action.raceId,
        derived: calcDerived(state.stats, action.raceId, state._magicStart, state.rolledFate?.value, state.rolledWounds?.value)
      };
      
    case 'SET_CAREER':
      const newMagic = action.magicFloor 
        ? Math.max(state._magicStart, action.magicFloor) 
        : state._magicStart;
      
      return {
        ...state,
        ...touch(),
        careerId: action.careerId,
        _magicStart: newMagic,
        derived: { ...state.derived, magic: newMagic }
      };
      
    case 'SET_STAT':
      const newStats = { ...state.stats, [action.key]: action.value };
      return { 
        ...state, 
        ...touch(),
        stats: newStats,
        derived: calcDerived(newStats, state.raceId, state._magicStart, state.rolledFate?.value, state.rolledWounds?.value)
      };
      
    case 'SET_STATS':
      const derived = calcDerived(action.stats, state.raceId, state._magicStart, state.rolledFate?.value, state.rolledWounds?.value);
      return { 
        ...state, 
        ...touch(),
        stats: action.stats,
        derived,
        _hasRolled: true
      };

    case 'ROLL_FATE':
      const newDerivedWithFate = calcDerived(state.stats, state.raceId, state._magicStart, action.value, state.rolledWounds?.value);
      return {
        ...state,
        ...touch(),
        rolledFate: { roll: action.roll, value: action.value },
        derived: newDerivedWithFate
      };

    case 'ROLL_WOUNDS':
      const newDerivedWithWounds = calcDerived(state.stats, state.raceId, state._magicStart, state.rolledFate?.value, action.value);
      return {
        ...state,
        ...touch(),
        rolledWounds: { roll: action.roll, value: action.value },
        derived: newDerivedWithWounds
      };

    case 'SET_SKILLS':
      return {
        ...state,
        ...touch(),
        skills: action.skills
      };

    case 'SET_TALENTS':
      return {
        ...state,
        ...touch(),
        talents: action.talents
      };
      
    case 'SET_NAME':
      return { 
        ...state, 
        ...touch(),
        name: action.name 
      };
      
    case 'FINALIZE_DERIVED':
      return { 
        ...state, 
        ...touch()
      };
      
    case 'RESET':
      const newDraft = createInitialDraft();
      return { 
        ...newDraft, 
        _hasRolled: false,
        _magicStart: 0
      };
      
    default:
      return state;
  }
}

const CharacterDraftContext = createContext<{
  draft: Draft;
  hasRolled: boolean;
  dispatch: React.Dispatch<Action>;
}>({
  draft: createInitialDraft(),
  hasRolled: false,
  dispatch: () => {}
});

export function CharacterDraftProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const value = useMemo(() => ({
    draft: (({ _hasRolled, _magicStart, ...rest }) => rest)(state) as Draft,
    hasRolled: state._hasRolled,
    dispatch
  }), [state]);

  return (
    <CharacterDraftContext.Provider value={value}>
      {children}
    </CharacterDraftContext.Provider>
  );
}

export const useDraft = () => {
  const context = useContext(CharacterDraftContext);
  if (!context) {
    throw new Error('useDraft must be used within a CharacterDraftProvider');
  }
  return context;
};

export const draftActions = {
  setRace: (raceId: string): Action => ({ type: 'SET_RACE', raceId }),
  setCareer: (careerId: string, magicFloor?: number): Action => ({ 
    type: 'SET_CAREER', 
    careerId, 
    magicFloor 
  }),
  setStat: (key: StatKey, value: number): Action => ({ 
    type: 'SET_STAT', 
    key, 
    value 
  }),
  setStats: (stats: StatBlock): Action => ({
    type: 'SET_STATS',
    stats
  }),
  rollFate: (roll: number, value: number): Action => ({
    type: 'ROLL_FATE',
    roll,
    value
  }),
  rollWounds: (roll: number, value: number): Action => ({
    type: 'ROLL_WOUNDS', 
    roll,
    value
  }),
  setSkills: (skills: Array<{ name: string; spec?: string }>): Action => ({
    type: 'SET_SKILLS',
    skills
  }),
  setTalents: (talents: Array<{ name: string; spec?: string }>): Action => ({
    type: 'SET_TALENTS',
    talents
  }),
  setName: (name: string): Action => ({ type: 'SET_NAME', name }),
  finalize: (): Action => ({ type: 'FINALIZE_DERIVED' }),
  reset: (): Action => ({ type: 'RESET' })
};