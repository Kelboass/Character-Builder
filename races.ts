export interface SkillChoice {
  name: string;
  spec?: string;
}

export interface TalentChoice {
  name: string;
  spec?: string;
}

export interface RaceData {
  id: string;
  name: string;
  description: string;
  move: number;
  startingCharacteristics: Record<string, number>;
  // WFRP2e uses tables for Fate and Wounds, not fixed values
  fateTable: Array<[number, number, number]>; // [diceMin, diceMax, fateValue]
  woundsTable: Array<[number, number, number]>; // [diceMin, diceMax, woundsValue]
  skills: {
    required: SkillChoice[];
    choices?: Array<{ pick: number; options: SkillChoice[] }>;
  };
  talents: {
    required: TalentChoice[];
    random?: { count: number; options: TalentChoice[] };
  };
}

export const WFRP_RACES: RaceData[] = [
  {
    id: 'human',
    name: 'Human',
    description: 'Versatile and ambitious, humans are found in all walks of life throughout the Empire.',
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
    // WFRP2e Human Fate table (d10)
    fateTable: [
      [1, 4, 2],
      [5, 7, 3],
      [8, 10, 4]
    ],
    // WFRP2e Human Wounds table (d10)  
    woundsTable: [
      [1, 3, 10],
      [4, 6, 11], 
      [7, 9, 12],
      [10, 10, 13]
    ],
    skills: {
      required: [
        { name: 'Animal Care' },
        { name: 'Charm' },
        { name: 'Gossip' },
        { name: 'Haggle' },
        { name: 'Drive' },
        { name: 'Common Knowledge', spec: 'Empire' },
        { name: 'Speak Language', spec: 'Reikspiel' }
      ],
      choices: [
        { 
          pick: 2, 
          options: [
            { name: 'Swim' },
            { name: 'Consume Alcohol' },
            { name: 'Ride' },
            { name: 'Row' }
          ]
        }
      ]
    },
    talents: {
      required: [],
      random: { 
        count: 2, 
        options: [
          { name: 'Lightning Reflexes' },
          { name: 'Marksman' },
          { name: 'Savvy' },
          { name: 'Suave' },
          { name: 'Very Strong' },
          { name: 'Very Resilient' }
        ]
      }
    }
  },
  {
    id: 'dwarf',
    name: 'Dwarf',
    description: 'Hardy folk from the mountains, known for their craftsmanship and stubborn nature.',
    move: 3,
    startingCharacteristics: {
      weaponSkill: 30,
      ballisticSkill: 20,
      strength: 20,
      toughness: 30,
      agility: 10,
      intelligence: 20,
      willPower: 20,
      fellowship: 10
    },
    // WFRP2e Dwarf Fate table (d10)
    fateTable: [
      [1, 6, 1],
      [7, 9, 2],
      [10, 10, 3]
    ],
    // WFRP2e Dwarf Wounds table (d10)
    woundsTable: [
      [1, 3, 11],
      [4, 6, 12],
      [7, 9, 13],
      [10, 10, 14]
    ],
    skills: {
      required: [
        { name: 'Consume Alcohol' },
        { name: 'Drive' },
        { name: 'Evaluate' },
        { name: 'Haggle' },
        { name: 'Common Knowledge', spec: 'Dwarfs' },
        { name: 'Speak Language', spec: 'Khazalid' },
        { name: 'Speak Language', spec: 'Reikspiel' }
      ],
      choices: [
        {
          pick: 1,
          options: [
            { name: 'Trade', spec: 'Brewer' },
            { name: 'Trade', spec: 'Miner' },
            { name: 'Trade', spec: 'Smith' },
            { name: 'Trade', spec: 'Stoneworker' }
          ]
        }
      ]
    },
    talents: {
      required: [
        { name: 'Dwarfcraft' },
        { name: 'Grudge-born Fury' },
        { name: 'Night Vision' },
        { name: 'Resistance to Magic' },
        { name: 'Sturdy' }
      ]
    }
  },
  {
    id: 'elf',
    name: 'Elf',
    description: 'Graceful and long-lived, elves possess keen senses and natural magical affinity.',
    move: 5,
    startingCharacteristics: {
      weaponSkill: 20,
      ballisticSkill: 30,
      strength: 20,
      toughness: 20,
      agility: 30,
      intelligence: 20,
      willPower: 20,
      fellowship: 20
    },
    // WFRP2e Elf Fate table (d10)
    fateTable: [
      [1, 4, 1],
      [5, 7, 2], 
      [8, 10, 3]
    ],
    // WFRP2e Elf Wounds table (d10)
    woundsTable: [
      [1, 3, 9],
      [4, 6, 10],
      [7, 9, 11], 
      [10, 10, 12]
    ],
    skills: {
      required: [
        { name: 'Common Knowledge', spec: 'Elves' },
        { name: 'Magical Sense' },
        { name: 'Perception' },
        { name: 'Read/Write' },
        { name: 'Speak Language', spec: 'Eltharin' },
        { name: 'Speak Language', spec: 'Reikspiel' },
        { name: 'Spot Trap' }
      ]
    },
    talents: {
      required: [
        { name: 'Acute Hearing' },
        { name: 'Excellent Vision' },
        { name: 'Night Vision' }
      ]
    }
  },
  {
    id: 'halfling',
    name: 'Halfling',
    description: 'Small but brave, halflings are known for their luck and love of comfort.',
    move: 4,
    startingCharacteristics: {
      weaponSkill: 10,
      ballisticSkill: 30,
      strength: 10,
      toughness: 10,
      agility: 30,
      intelligence: 20,
      willPower: 20,
      fellowship: 30
    },
    // WFRP2e Halfling Fate table (d10)
    fateTable: [
      [1, 3, 2],
      [4, 6, 3],
      [7, 10, 4]
    ],
    // WFRP2e Halfling Wounds table (d10)
    woundsTable: [
      [1, 3, 8],
      [4, 6, 9],
      [7, 9, 10],
      [10, 10, 11]
    ],
    skills: {
      required: [
        { name: 'Academic Knowledge', spec: 'Genealogy/Heraldry' },
        { name: 'Charm' },
        { name: 'Common Knowledge', spec: 'Halflings' },
        { name: 'Consume Alcohol' },
        { name: 'Gossip' },
        { name: 'Perception' },
        { name: 'Speak Language', spec: 'Halfling' },
        { name: 'Speak Language', spec: 'Reikspiel' }
      ]
    },
    talents: {
      required: [
        { name: 'Night Vision' },
        { name: 'Resistance to Chaos' },
        { name: 'Specialist Weapon Group', spec: 'Sling' }
      ]
    }
  },
  {
    id: 'voryn',
    name: 'Voryn',
    description: 'A custom forest-dwelling people with connection to nature.',
    move: 4,
    startingCharacteristics: {
      weaponSkill: 25,
      ballisticSkill: 25,
      strength: 20,
      toughness: 25,
      agility: 25,
      intelligence: 20,
      willPower: 25,
      fellowship: 15
    },
    // Custom balanced tables for Voryn
    fateTable: [
      [1, 4, 2],
      [5, 8, 3],
      [9, 10, 4]
    ],
    woundsTable: [
      [1, 3, 10],
      [4, 6, 11],
      [7, 9, 12],
      [10, 10, 13]
    ],
    skills: {
      required: [
        { name: 'Animal Care' },
        { name: 'Common Knowledge', spec: 'Voryn' },
        { name: 'Concealment' },
        { name: 'Follow Trail' },
        { name: 'Outdoor Survival' },
        { name: 'Perception' },
        { name: 'Speak Language', spec: 'Voryn' }
      ],
      choices: [
        {
          pick: 1,
          options: [
            { name: 'Silent Move' },
            { name: 'Scale Sheer Surface' },
            { name: 'Swim' }
          ]
        }
      ]
    },
    talents: {
      required: [
        { name: 'Hardy' },
        { name: 'Keen Senses' }
      ],
      random: {
        count: 1,
        options: [
          { name: 'Rover' },
          { name: 'Excellent Vision' },
          { name: 'Acute Hearing' }
        ]
      }
    }
  }
];