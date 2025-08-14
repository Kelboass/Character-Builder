// Types
export interface SkillChoice {
  name: string;
  spec?: string;
}

export interface TalentChoice {
  name: string;
  spec?: string;
}

export interface RangeValue {
  min: number;
  max: number;
  value: number;
}

export interface RaceData {
  id: string;
  name: string;
  description: string;
  move: number;
  startingCharacteristics: {
    weaponSkill: number;
    ballisticSkill: number;
    strength: number;
    toughness: number;
    agility: number;
    intelligence: number;
    willPower: number;
    fellowship: number;
  };
  woundsTable: RangeValue[];
  fateTable: RangeValue[];
  skills: {
    required: SkillChoice[];
    choices?: Array<{ pick: number; options: SkillChoice[] }>;
  };
  talents: {
    required: TalentChoice[];
    choices?: Array<{ pick: number; options: TalentChoice[] }>;
    random?: { count: number; options: TalentChoice[] };
  };
  specialRules?: {
    required?: string[];
    choices?: Array<{ pick: number; options: string[] }>;
  };
}

export const WFRP_RACES: RaceData[] = [
  // HUMAN - RAW WFRP2e
  {
    id: 'human',
    name: 'Human',
    description: 'Versatile, ambitious, and everywhere in the Old World.',
    move: 4,
    startingCharacteristics: {
      weaponSkill: 20,
      ballisticSkill: 20,
      strength: 20,
      toughness: 20,
      agility: 20,
      intelligence: 20,
      willPower: 20,
      fellowship: 20
    },
    woundsTable: [
      { min: 1, max: 3, value: 10 },
      { min: 4, max: 6, value: 11 },
      { min: 7, max: 9, value: 12 },
      { min: 10, max: 10, value: 13 }
    ],
    fateTable: [
      { min: 1, max: 4, value: 2 },
      { min: 5, max: 7, value: 3 },
      { min: 8, max: 10, value: 4 }
    ],
    skills: {
      required: [
        { name: 'Common Knowledge', spec: 'the Empire' },
        { name: 'Gossip' },
        { name: 'Speak Language', spec: 'Reikspiel' }
      ]
    },
    talents: {
      required: [],
      random: {
        count: 2,
        options: [
          { name: 'Acute Hearing' }, { name: 'Ambidextrous' }, { name: 'Coolheaded' },
          { name: 'Excellent Vision' }, { name: 'Fleet Footed' }, { name: 'Hardy' },
          { name: 'Lightning Reflexes' }, { name: 'Luck' }, { name: 'Marksman' },
          { name: 'Mimic' }, { name: 'Night Vision' }, { name: 'Resistance to Disease' },
          { name: 'Resistance to Magic' }, { name: 'Resistance to Poison' }, { name: 'Savvy' },
          { name: 'Sixth Sense' }, { name: 'Strong-minded' }, { name: 'Sturdy' },
          { name: 'Suave' }, { name: 'Super Numerate' }, { name: 'Very Resilient' },
          { name: 'Very Strong' }, { name: 'Warrior Born' }
        ]
      }
    }
  },

  // DWARF - RAW WFRP2e  
  {
    id: 'dwarf',
    name: 'Dwarf',
    description: 'Hardy folk of the mountains; stubborn, skilled, and grim.',
    move: 3,
    startingCharacteristics: {
      weaponSkill: 30, ballisticSkill: 20, strength: 20, toughness: 30,
      agility: 10, intelligence: 20, willPower: 20, fellowship: 10
    },
    woundsTable: [
      { min: 1, max: 3, value: 11 }, { min: 4, max: 6, value: 12 },
      { min: 7, max: 9, value: 13 }, { min: 10, max: 10, value: 14 }
    ],
    fateTable: [
      { min: 1, max: 6, value: 1 }, { min: 7, max: 9, value: 2 }, { min: 10, max: 10, value: 3 }
    ],
    skills: {
      required: [
        { name: 'Common Knowledge', spec: 'Dwarfs' },
        { name: 'Speak Language', spec: 'Khazalid' },
        { name: 'Speak Language', spec: 'Reikspiel' }
      ],
      choices: [{ pick: 1, options: [
        { name: 'Trade', spec: 'Miner' }, { name: 'Trade', spec: 'Smith' }, { name: 'Trade', spec: 'Stoneworker' }
      ]}]
    },
    talents: {
      required: [
        { name: 'Dwarfcraft' }, { name: 'Grudge-born Fury' }, { name: 'Night Vision' },
        { name: 'Resistance to Magic' }, { name: 'Stout-hearted' }, { name: 'Sturdy' }
      ]
    }
  },

  // ELF - RAW WFRP2e
  {
    id: 'elf',
    name: 'Elf', 
    description: 'Graceful, long-lived, with keen senses and a touch of the arcane.',
    move: 5,
    startingCharacteristics: {
      weaponSkill: 20, ballisticSkill: 30, strength: 20, toughness: 20,
      agility: 30, intelligence: 20, willPower: 20, fellowship: 20
    },
    woundsTable: [
      { min: 1, max: 3, value: 9 }, { min: 4, max: 6, value: 10 },
      { min: 7, max: 9, value: 11 }, { min: 10, max: 10, value: 12 }
    ],
    fateTable: [
      { min: 1, max: 4, value: 1 }, { min: 5, max: 7, value: 2 }, { min: 8, max: 10, value: 3 }
    ],
    skills: {
      required: [
        { name: 'Common Knowledge', spec: 'Elves' },
        { name: 'Speak Language', spec: 'Eltharin' },
        { name: 'Speak Language', spec: 'Reikspiel' }
      ]
    },
    talents: {
      required: [{ name: 'Excellent Vision' }, { name: 'Night Vision' }],
      choices: [
        { pick: 1, options: [
          { name: 'Aethyric Attunement' }, { name: 'Specialist Weapon Group', spec: 'Longbow' }
        ]},
        { pick: 1, options: [{ name: 'Coolheaded' }, { name: 'Savvy' }]}
      ]
    }
  },

  // HALFLING - RAW WFRP2e
  {
    id: 'halfling',
    name: 'Halfling',
    description: 'Small, cheerful, resilient, and surprisingly lucky.',
    move: 4,
    startingCharacteristics: {
      weaponSkill: 10, ballisticSkill: 30, strength: 10, toughness: 10,
      agility: 30, intelligence: 20, willPower: 20, fellowship: 30
    },
    woundsTable: [
      { min: 1, max: 3, value: 8 }, { min: 4, max: 6, value: 9 },
      { min: 7, max: 9, value: 10 }, { min: 10, max: 10, value: 11 }
    ],
    fateTable: [
      { min: 1, max: 3, value: 2 }, { min: 4, max: 6, value: 3 }, { min: 7, max: 10, value: 4 }
    ],
    skills: {
      required: [
        { name: 'Academic Knowledge', spec: 'Genealogy/Heraldry' },
        { name: 'Common Knowledge', spec: 'Halflings' }, { name: 'Gossip' },
        { name: 'Speak Language', spec: 'Halfling' }, { name: 'Speak Language', spec: 'Reikspiel' }
      ],
      choices: [{ pick: 1, options: [{ name: 'Trade', spec: 'Cook' }, { name: 'Trade', spec: 'Farmer' }]}]
    },
    talents: {
      required: [
        { name: 'Night Vision' }, { name: 'Resistance to Chaos' }, 
        { name: 'Specialist Weapon Group', spec: 'Sling' }
      ],
      random: { count: 1, options: [
        { name: 'Acute Hearing' }, { name: 'Ambidextrous' }, { name: 'Coolheaded' },
        { name: 'Excellent Vision' }, { name: 'Fleet Footed' }, { name: 'Hardy' },
        { name: 'Lightning Reflexes' }, { name: 'Luck' }, { name: 'Marksman' },
        { name: 'Mimic' }, { name: 'Resistance to Disease' }, { name: 'Resistance to Magic' },
        { name: 'Resistance to Poison' }, { name: 'Savvy' }, { name: 'Sixth Sense' },
        { name: 'Strong-minded' }, { name: 'Sturdy' }, { name: 'Suave' },
        { name: 'Super Numerate' }, { name: 'Very Resilient' }, { name: 'Very Strong' },
        { name: 'Warrior Born' }
      ]}
    }
  },

  // VORYN - Custom Race
  {
    id: 'voryn',
    name: 'Voryn',
    description: 'Forest-dwelling people with one foot in the spirit world. Graceful, wary, and deeply tied to the wilds.',
    move: 4,
    startingCharacteristics: {
      weaponSkill: 20, ballisticSkill: 20, strength: 15, toughness: 20,
      agility: 25, intelligence: 20, willPower: 25, fellowship: 15
    },
    woundsTable: [
      { min: 1, max: 3, value: 8 }, { min: 4, max: 6, value: 9 },
      { min: 7, max: 9, value: 10 }, { min: 10, max: 10, value: 11 }
    ],
    fateTable: [
      { min: 1, max: 4, value: 1 }, { min: 5, max: 7, value: 2 }, { min: 8, max: 10, value: 3 }
    ],
    skills: {
      required: [
        { name: 'Common Knowledge', spec: 'Voryn' },
        { name: 'Speak Language', spec: 'Albion' },
        { name: 'Speak Language', spec: 'Common' }
      ]
    },
    talents: {
      required: [{ name: 'Wraithskin' }, { name: 'Otherworldly' }, { name: 'Sixth Sense' }],
      choices: [{ pick: 1, options: [{ name: 'Suave' }, { name: 'Savvy' }]}]
    },
    specialRules: {
      choices: [{ pick: 1, options: [
        'Forest Harmony: Move through forests without penalty; +10% Stealth tests in forests.',
        'Spirit Kin: +10% Fel vs forest creatures/spirits, and +10% WP tests vs Fear/Terror caused by Spirits.'
      ]}]
    }
  }
];

// Helper functions
export function rollFromD10Table(table: RangeValue[], roll: number): number {
  const row = table.find(r => roll >= r.min && roll <= r.max);
  return row ? row.value : table[table.length - 1].value;
}

export function getRaceById(id: string): RaceData | undefined {
  return WFRP_RACES.find(race => race.id === id);
}

export function rollRandomTalentsForRace(raceId: string): TalentChoice[] {
  const race = getRaceById(raceId);
  if (!race?.talents.random) return [];
  
  const { count, options } = race.talents.random;
  const picks: TalentChoice[] = [];
  const pool = [...options];
  
  for (let i = 0; i < count && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    picks.push(pool.splice(idx, 1)[0]);
  }
  
  return picks;
}