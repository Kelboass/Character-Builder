import { create } from 'zustand';

// Simple ID generator
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

type StatKey = 'weaponSkill'|'ballisticSkill'|'strength'|'toughness'|'agility'|'intelligence'|'willPower'|'fellowship';
type StatBlock = Record<StatKey, number>;

type Draft = {
  id: string;
  name: string;
  raceId: string | null;
  careerId: string | null;
  stats: StatBlock;
  derived: { 
    wounds: number; 
    move: number; 
    fate: number;
    strengthBonus: number;
    toughnessBonus: number;
    attacks: number;
    magic: number;
    insanityPoints: number;
  };
  skills: string[];
  talents: string[];
  xpTotal: number;
  xpSpent: number;
  createdAt: string;
};

type DraftState = {
  draft: Draft;
  setRace: (id: string) => void;
  setCareer: (id: string) => void;
  setStat: (k: StatKey, v: number) => void;
  rollStats: (raceId: string) => void;
  finalizeDerived: () => void;
  setName: (n: string) => void;
  reset: () => void;
  exportJSON: () => string;
};

const createEmptyDraft = (): Draft => ({
  id: generateId(),
  name: 'Unnamed Character',
  raceId: null,
  careerId: null,
  stats: {
    weaponSkill: 20,
    ballisticSkill: 20,
    strength: 20,
    toughness: 20,
    agility: 20,
    intelligence: 20,
    willPower: 20,
    fellowship: 20
  },
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
  createdAt: new Date().toISOString()
});

export const useDraft = create<DraftState>((set, get) => ({
  draft: createEmptyDraft(),

  setRace: (raceId) => {
    set(s => ({ draft: { ...s.draft, raceId }}));
    // Auto-roll stats when race is selected
    get().rollStats(raceId);
  },

  setCareer: (careerId) => {
    set(s => ({ draft: { ...s.draft, careerId }}));
    get().finalizeDerived();
  },

  setStat: (k, v) => {
    set(s => ({ draft: { ...s.draft, stats: { ...s.draft.stats, [k]: v }}}));
    get().finalizeDerived();
  },

  rollStats: (raceId) => {
    // Import here to avoid circular dependencies
    import('../utils/dice').then(({ rollCharacteristicsByRace }) => {
      const rolledStats = rollCharacteristicsByRace(raceId);
      set(s => ({ 
        draft: { 
          ...s.draft, 
          stats: {
            weaponSkill: rolledStats.weaponSkill,
            ballisticSkill: rolledStats.ballisticSkill,
            strength: rolledStats.strength,
            toughness: rolledStats.toughness,
            agility: rolledStats.agility,
            intelligence: rolledStats.intelligence,
            willPower: rolledStats.willPower,
            fellowship: rolledStats.fellowship
          },
          derived: {
            wounds: rolledStats.wounds,
            move: rolledStats.movement,
            fate: rolledStats.fatePoints,
            strengthBonus: rolledStats.strengthBonus,
            toughnessBonus: rolledStats.toughnessBonus,
            attacks: rolledStats.attacks,
            magic: rolledStats.magic,
            insanityPoints: rolledStats.insanityPoints
          }
        }
      }));
    });
  },

  finalizeDerived: () => {
    const { stats, careerId } = get().draft;
    const strengthBonus = Math.floor(stats.strength / 10);
    const toughnessBonus = Math.floor(stats.toughness / 10);
    let magic = 0;
    
    // Apply career magic bonus
    if (careerId === 'apprentice-wizard' || careerId === 'witch') {
      magic = 1;
    }

    set(s => ({ 
      draft: { 
        ...s.draft, 
        derived: { 
          ...s.draft.derived,
          strengthBonus,
          toughnessBonus,
          magic
        }
      }
    }));
  },

  setName: (name) => set(s => ({ draft: { ...s.draft, name }})),

  reset: () => set({ draft: createEmptyDraft() }),

  exportJSON: () => {
    const draft = get().draft;
    return JSON.stringify(draft, null, 2);
  }
}));