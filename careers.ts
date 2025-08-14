// src/data/careers.ts

export interface CareerData {
  id: string;
  name: string;
  description: string;
  type: 'basic' | 'advanced';
  tier: number;
  characteristicAdvances?: Record<string, number>;
  magicFloor?: number; // Magic characteristic floor (don't reduce below this)
  skillAdvances: Array<{ name: string; spec?: string }>;
  talentAdvances: Array<{ name: string; spec?: string }>;
  trappings?: string[];
  careerPath?: string;
  careerExits?: string[];
  isMagicalCareer: boolean;
  specialRules?: string[];
}

/* =========================
   BASIC CAREERS (Tier 1)
   ========================= */

export const BASIC_CAREERS: CareerData[] = [
  // COMBAT
  {
    id: 'soldier',
    name: 'Soldier',
    description: 'Professional warriors who serve in armies and militias.',
    type: 'basic',
    tier: 1,
    careerPath: 'warrior',
    characteristicAdvances: {
      weaponSkill: 20,
      ballisticSkill: 15,
      strength: 15,
      toughness: 15
    },
    skillAdvances: [
      { name: 'Animal Care' },
      { name: 'Common Knowledge', spec: 'Empire' },
      { name: 'Dodge Blow' },
      { name: 'Gamble' },
      { name: 'Intimidate' },
      { name: 'Outdoor Survival' }
    ],
    talentAdvances: [
      { name: 'Disarm' },
      { name: 'Quick Draw' },
      { name: 'Strike Mighty Blow' },
      { name: 'Strike to Stun' }
    ],
    trappings: [
      'Light Armour (Leather Jack)',
      'Hand Weapon (Sword)',
      'Shield',
      'Uniform',
      'Purse (2d10 gc)'
    ],
    careerExits: ['sergeant', 'mercenary', 'veteran', 'knight'],
    isMagicalCareer: false
  },
  {
    id: 'mercenary',
    name: 'Mercenary',
    description: 'Professional fighters for hire who sell their sword arm.',
    type: 'basic',
    tier: 1,
    careerPath: 'warrior',
    characteristicAdvances: {
      weaponSkill: 25,
      ballisticSkill: 10,
      strength: 10,
      toughness: 10
    },
    skillAdvances: [
      { name: 'Animal Care' },
      { name: 'Common Knowledge', spec: 'Empire' },
      { name: 'Dodge Blow' },
      { name: 'Gossip' },
      { name: 'Haggle' },
      { name: 'Ride' }
    ],
    talentAdvances: [
      { name: 'Disarm' },
      { name: 'Lightning Reflexes' },
      { name: 'Quick Draw' },
      { name: 'Strike Mighty Blow' },
      { name: 'Strike to Stun' }
    ],
    trappings: ['Hand Weapon', 'Light Armour (Leather Jack)'],
    careerExits: ['soldier', 'veteran', 'sergeant', 'captain'],
    isMagicalCareer: false
  },

  // CRIMINAL / ROGUE
  {
    id: 'thief',
    name: 'Thief',
    description: 'Nimble criminals who live by stealth and cunning.',
    type: 'basic',
    tier: 1,
    careerPath: 'rogue',
    characteristicAdvances: { agility: 20, fellowship: 10 },
    skillAdvances: [
      { name: 'Climb' },
      { name: 'Concealment' },
      { name: 'Evaluate' },
      { name: 'Gossip' },
      { name: 'Perception' },
      { name: 'Pick Lock' },
      { name: 'Scale Sheer Surface' },
      { name: 'Silent Move' }
    ],
    talentAdvances: [
      { name: 'Alley Cat' },
      { name: 'Flee!' },
      { name: 'Hardy' },
      { name: 'Luck' },
      { name: 'Resistance to Disease' },
      { name: 'Specialist Weapon Group', spec: 'Throwing' },
      { name: 'Trapfinding' }
    ],
    trappings: [
      'Hand Weapon (Dagger)',
      'Leather Jack',
      'Lock Picks',
      'Rope (10 yards)',
      'Sack',
      'Purse (2d10 ss)'
    ],
    careerExits: ['footpad', 'tomb-robber', 'racketeer', 'cat-burglar'],
    isMagicalCareer: false
  },
  {
    id: 'smuggler',
    name: 'Smuggler',
    description: 'Criminals who transport illegal goods across borders.',
    type: 'basic',
    tier: 1,
    careerPath: 'rogue',
    skillAdvances: [
      { name: 'Blather' },
      { name: 'Common Knowledge', spec: 'Empire' },
      { name: 'Concealment' },
      { name: 'Drive' },
      { name: 'Evaluate' },
      { name: 'Gossip' },
      { name: 'Haggle' },
      { name: 'Perception' }
    ],
    talentAdvances: [
      { name: 'Dealmaker' },
      { name: 'Flee!' },
      { name: 'Hardy' },
      { name: 'Lightning Reflexes' },
      { name: 'Luck' }
    ],
    trappings: ['Cart or Boat (shared)', 'Hidden Compartments'],
    careerExits: ['rogue', 'racketeer', 'outlaw'],
    isMagicalCareer: false
  },

  // RANGER / WILDERNESS
  {
    id: 'scout',
    name: 'Scout',
    description: 'Wilderness experts who serve as guides and messengers.',
    type: 'basic',
    tier: 1,
    careerPath: 'ranger',
    characteristicAdvances: {
      ballisticSkill: 20,
      agility: 15,
      intelligence: 10
    },
    skillAdvances: [
      { name: 'Animal Care' },
      { name: 'Concealment' },
      { name: 'Follow Trail' },
      { name: 'Navigation' },
      { name: 'Outdoor Survival' },
      { name: 'Perception' },
      { name: 'Scale Sheer Surface' },
      { name: 'Silent Move' }
    ],
    talentAdvances: [
      { name: 'Excellent Vision' },
      { name: 'Hardy' },
      { name: 'Orientation' },
      { name: 'Rapid Reload' },
      { name: 'Rover' },
      { name: 'Sure Shot' }
    ],
    trappings: [
      'Leather Jack',
      'Hand Weapon (Hand Axe)',
      'Bow with 10 Arrows',
      'Backpack',
      'Blanket',
      'Rope (10 yards)',
      'Purse (2d10 ss)'
    ],
    careerExits: ['roadwarden', 'outlaw', 'ranger'],
    isMagicalCareer: false
  },
  {
    id: 'hunter',
    name: 'Hunter',
    description: 'Wilderness survivors who live by tracking and hunting.',
    type: 'basic',
    tier: 1,
    careerPath: 'ranger',
    skillAdvances: [
      { name: 'Animal Care' },
      { name: 'Concealment' },
      { name: 'Follow Trail' },
      { name: 'Navigation' },
      { name: 'Outdoor Survival' },
      { name: 'Perception' },
      { name: 'Set Trap' },
      { name: 'Silent Move' }
    ],
    talentAdvances: [
      { name: 'Excellent Vision' },
      { name: 'Hardy' },
      { name: 'Marksman' },
      { name: 'Rapid Reload' },
      { name: 'Rover' }
    ],
    trappings: ['Bow with 10 Arrows', 'Snare or Trap', 'Cloak'],
    careerExits: ['scout', 'ranger', 'outlaw'],
    isMagicalCareer: false
  },

  // COMMONER
  {
    id: 'peasant',
    name: 'Peasant',
    description: 'Simple folk who work the land and tend animals.',
    type: 'basic',
    tier: 1,
    careerPath: 'social',
    characteristicAdvances: {
      strength: 10,
      toughness: 15,
      willPower: 10
    },
    skillAdvances: [
      { name: 'Animal Care' },
      { name: 'Common Knowledge', spec: 'Empire' },
      { name: 'Drive' },
      { name: 'Evaluate' },
      { name: 'Gossip' },
      { name: 'Haggle' },
      { name: 'Outdoor Survival' },
      { name: 'Trade', spec: 'Farmer' }
    ],
    talentAdvances: [
      { name: 'Hardy' },
      { name: 'Resistance to Disease' },
      { name: 'Very Strong' }
    ],
    trappings: ['Pitchfork or Flail', 'Work Clothes'],
    careerExits: ['militiaman', 'soldier', 'outlaw'],
    isMagicalCareer: false
  },

  // ACADEMIC / MAGIC
  {
    id: 'apprentice-wizard',
    name: 'Apprentice Wizard',
    description: 'Novices under tutelage, learning to shape the Winds of Magic.',
    type: 'basic',
    tier: 1,
    careerPath: 'academic',
    magicFloor: 1, // starts with Magic 1
    skillAdvances: [
      { name: 'Academic Knowledge', spec: 'Magic' },
      { name: 'Channelling' },
      { name: 'Magical Sense' },
      { name: 'Perception' },
      { name: 'Read/Write' },
      { name: 'Search' },
      { name: 'Speak Arcane Language', spec: 'Magick' },
      { name: 'Speak Language', spec: 'Classical' }
    ],
    talentAdvances: [
      { name: 'Aethyric Attunement' },
      { name: 'Fast Hands' },
      { name: 'Petty Magic', spec: 'Arcane' },
      { name: 'Savvy' }
    ],
    trappings: ['Quarterstaff', 'Backpack', 'Printed Book'],
    careerExits: ['journeyman-wizard', 'scholar', 'scribe'],
    isMagicalCareer: true
  },
  {
    id: 'witch',
    name: 'Witch',
    description: 'Hedge practitioners using folk charms, hexes, and herb lore.',
    type: 'basic',
    tier: 1,
    careerPath: 'academic',
    magicFloor: 1,
    skillAdvances: [
      { name: 'Academic Knowledge', spec: 'Magic' },
      { name: 'Channelling' },
      { name: 'Charm' },
      { name: 'Heal' },
      { name: 'Hypnotism' },
      { name: 'Intimidate' },
      { name: 'Perception' }
    ],
    talentAdvances: [
      { name: 'Aethyric Attunement' },
      { name: 'Petty Magic', spec: 'Hedge' },
      { name: 'Witch!' }
    ],
    trappings: ['Charms and Fetishes', 'Herb Pouch'],
    careerExits: ['hedge-witch', 'wise-woman', 'outlaw'],
    isMagicalCareer: true
  },
  {
    id: 'initiate',
    name: 'Initiate',
    description: 'A junior priest serving in a temple hierarchy.',
    type: 'basic',
    tier: 1,
    careerPath: 'religious',
    skillAdvances: [
      { name: 'Academic Knowledge', spec: 'Religion' },
      { name: 'Academic Knowledge', spec: 'Theology' },
      { name: 'Charm' },
      { name: 'Heal' },
      { name: 'Read/Write' },
      { name: 'Speak Language', spec: 'Classical' }
    ],
    talentAdvances: [
      { name: 'Public Speaking' },
      { name: 'Suave' }
    ],
    trappings: ['Religious Symbol', 'Robes', 'Prayer Book'],
    careerExits: ['priest', 'scholar', 'scribe'],
    isMagicalCareer: false // Divine magic handled via blessings/prayers, not Magic characteristic
  }
];

/* =========================
   ADVANCED CAREERS (Tier 2+)
   ========================= */

export const ADVANCED_CAREERS: CareerData[] = [
  // ROGUE / MARTIAL
  {
    id: 'assassin',
    name: 'Assassin',
    description: 'Contract killers who excel at stealth, poisons, and precise violence.',
    type: 'advanced',
    tier: 2,
    careerPath: 'rogue',
    characteristicAdvances: {
      weaponSkill: 25,
      ballisticSkill: 25,
      agility: 30,
      intelligence: 20,
      fellowship: 20,
      strength: 10,
      toughness: 10,
      willPower: 10
    },
    skillAdvances: [
      { name: 'Concealment' },
      { name: 'Disguise' },
      { name: 'Perception' },
      { name: 'Prepare Poison' },
      { name: 'Scale Sheer Surface' },
      { name: 'Secret Signs', spec: 'Thief' },
      { name: 'Shadowing' },
      { name: 'Silent Move' }
    ],
    talentAdvances: [
      { name: 'Quick Draw' },
      { name: 'Lightning Parry' },
      { name: 'Sharpshooter' },
      { name: 'Street Fighting' },
      { name: 'Swashbuckler' }
    ],
    trappings: ['Net', '4 Throwing Knives', 'Grappling Hook', 'Rope (10 yards)'],
    careerExits: ['champion', 'outlaw-chief', 'sergeant', 'witch-hunter'],
    isMagicalCareer: false
  },

  // ACADEMIC / ENGINEERING
  {
    id: 'artillerist',
    name: 'Artillerist',
    description: 'Siege-weapon crews and gunners; part engineer, part soldier.',
    type: 'advanced',
    tier: 2,
    careerPath: 'warrior',
    characteristicAdvances: {
      weaponSkill: 15,
      ballisticSkill: 25,
      strength: 10,
      toughness: 10,
      agility: 15,
      intelligence: 30,
      willPower: 15
    },
    skillAdvances: [
      { name: 'Academic Knowledge', spec: 'Engineering' },
      { name: 'Academic Knowledge', spec: 'Science' },
      { name: 'Command' },
      { name: 'Drive' },
      { name: 'Perception' },
      { name: 'Secret Language', spec: 'Battle Tongue' },
      { name: 'Trade', spec: 'Gunsmith' }
    ],
    talentAdvances: [
      { name: 'Coolheaded' },
      { name: 'Marksman' },
      { name: 'Mighty Shot' },
      { name: 'Rapid Reload' },
      { name: 'Sharpshooter' },
      { name: 'Specialist Weapon Group', spec: 'Gunpowder' }
    ],
    trappings: ['Light Armour (Leather Jack)', 'Firearm + 10 shots', 'Engineer’s Kit', 'Telescope'],
    careerExits: ['artisan', 'captain', 'guild-master', 'veteran'],
    isMagicalCareer: false
  },

  // ANIMAL / SHOW / HUNT
  {
    id: 'animal-trainer',
    name: 'Animal Trainer',
    description: 'Handlers who break, train, and show beasts for work, hunt, or spectacle.',
    type: 'advanced',
    tier: 2,
    careerPath: 'social',
    characteristicAdvances: {
      weaponSkill: 10,
      ballisticSkill: 10,
      strength: 10,
      toughness: 10,
      agility: 15,
      intelligence: 10,
      willPower: 10,
      fellowship: 15
    },
    skillAdvances: [
      { name: 'Animal Care' },
      { name: 'Animal Training' },
      { name: 'Charm Animal' },
      { name: 'Command' },
      { name: 'Common Knowledge', spec: 'Any' },
      { name: 'Drive' },
      { name: 'Perception' },
      { name: 'Ride' },
      { name: 'Speak Language', spec: 'Any' },
      { name: 'Trade', spec: 'Aviarist' },
      { name: 'Trade', spec: 'Horse Trader' },
      { name: 'Trade', spec: 'Kennel Master' },
      { name: 'Trade', spec: 'Stableman' }
    ],
    talentAdvances: [
      { name: 'Etiquette' },
      { name: 'Wrestling' },
      { name: 'Specialist Weapon Group', spec: 'Entangling' },
      { name: 'Strike to Stun' }
    ],
    trappings: ['Collar + chain/rope', 'Light Armour (Leather Jack)', 'Net', 'Thick Gloves', 'Whip'],
    careerExits: ['bear-tamer', 'entertainer', 'hunter'],
    isMagicalCareer: false
  },

  // RELIGIOUS (LEADERSHIP, non-caster)
  {
    id: 'abbot',
    name: 'Abbot',
    description: 'Monastic leaders and spiritual authorities over abbeys.',
    type: 'advanced',
    tier: 3,
    careerPath: 'religious',
    characteristicAdvances: {
      weaponSkill: 10,
      strength: 10,
      toughness: 10,
      agility: 10,
      intelligence: 30,
      willPower: 25,
      fellowship: 20
    },
    skillAdvances: [
      { name: 'Academic Knowledge', spec: 'Theology' },
      { name: 'Academic Knowledge', spec: 'Any' },
      { name: 'Academic Knowledge', spec: 'Any' },
      { name: 'Charm' },
      { name: 'Common Knowledge', spec: 'Any' },
      { name: 'Gossip' },
      { name: 'Heal' },
      { name: 'Perception' },
      { name: 'Read/Write' },
      { name: 'Speak Language', spec: 'Classical' },
      { name: 'Speak Language', spec: 'Any' }
    ],
    talentAdvances: [
      { name: 'Master Orator' },
      { name: 'Savvy' },
      { name: 'Strong-Minded' }
    ],
    trappings: ['Prayer Book', 'Religious Relic', 'Robes', 'Writing Kit'],
    careerExits: ['high-priest', 'scholar'],
    isMagicalCareer: false
  },

  // RELIGIOUS (caster)
  {
    id: 'anointed-priest',
    name: 'Anointed Priest',
    description: 'Exemplars chosen by their deity; wielders of Divine Lores.',
    type: 'advanced',
    tier: 3,
    careerPath: 'religious',
    characteristicAdvances: {
      weaponSkill: 15,
      ballisticSkill: 15,
      strength: 10,
      toughness: 10,
      agility: 10,
      intelligence: 15,
      willPower: 25,
      fellowship: 20
    },
    magicFloor: 2,
    skillAdvances: [
      { name: 'Academic Knowledge', spec: 'Theology' },
      { name: 'Academic Knowledge', spec: 'Any' },
      { name: 'Channelling' },
      { name: 'Charm' },
      { name: 'Common Knowledge', spec: 'Any' },
      { name: 'Gossip' },
      { name: 'Heal' },
      { name: 'Magical Sense' },
      { name: 'Ride' },
      { name: 'Speak Arcane Language', spec: 'Magick' },
      { name: 'Speak Language', spec: 'Any' }
    ],
    talentAdvances: [
      { name: 'Aethyric Attunement' },
      { name: 'Meditation' },
      { name: 'Armoured Casting' },
      { name: 'Fast Hands' },
      { name: 'Divine Lore', spec: 'Any One' },
      { name: 'Lesser Magic', spec: 'Any Two' }
    ],
    trappings: ['Noble’s Garb', 'Religious Symbol'],
    careerExits: ['demagogue', 'flagellant', 'high-priest', 'scholar', 'witch-hunter'],
    isMagicalCareer: true
  },

  // LEADERSHIP / NAVAL
  {
    id: 'admiral',
    name: 'Admiral',
    description: 'Fleet commanders; political, logistical, and naval masters.',
    type: 'advanced',
    tier: 3,
    careerPath: 'leadership',
    characteristicAdvances: {
      weaponSkill: 25,
      ballisticSkill: 20,
      strength: 15,
      toughness: 15,
      agility: 15,
      intelligence: 30,
      willPower: 30,
      fellowship: 35
    },
    skillAdvances: [
      { name: 'Academic Knowledge', spec: 'Strategy/Tactics' },
      { name: 'Charm' },
      { name: 'Command' },
      { name: 'Common Knowledge', spec: 'Any' },
      { name: 'Intimidate' },
      { name: 'Perception' },
      { name: 'Read/Write' },
      { name: 'Sail' },
      { name: 'Speak Language', spec: 'Any' },
      { name: 'Swim' }
    ],
    talentAdvances: [
      { name: 'Etiquette' },
      { name: 'Seasoned Traveller' },
      { name: 'Linguistics' },
      { name: 'Master Orator' },
      { name: 'Public Speaking' },
      { name: 'Savvy' }
    ],
    trappings: ['Admiral’s Whistle', 'Bicorn/Tricorn', 'Telescope'],
    careerExits: ['ambassador', 'explorer', 'guild-master'],
    isMagicalCareer: false
  },

  // INVESTIGATION / RELIGIOUS ORDER (non-caster)
  {
    id: 'agent-of-the-shroud',
    name: 'Agent of the Shroud',
    description: 'Morr-sworn investigators who hunt signs of undead and vampirism.',
    type: 'advanced',
    tier: 2,
    careerPath: 'investigator',
    characteristicAdvances: {
      weaponSkill: 15,
      ballisticSkill: 10,
      strength: 10,
      toughness: 10,
      agility: 20,
      intelligence: 20,
      willPower: 30,
      fellowship: 10
    },
    skillAdvances: [
      { name: 'Academic Knowledge', spec: 'Necromancy' },
      { name: 'Academic Knowledge', spec: 'Theology' },
      { name: 'Charm' },
      { name: 'Common Knowledge', spec: 'Empire' },
      { name: 'Concealment' },
      { name: 'Disguise' },
      { name: 'Follow Trail' },
      { name: 'Gossip' },
      { name: 'Heal' },
      { name: 'Intimidate' },
      { name: 'Perception' },
      { name: 'Read/Write' },
      { name: 'Search' },
      { name: 'Shadowing' },
      { name: 'Silent Move' },
      { name: 'Speak Language', spec: 'Any' }
    ],
    talentAdvances: [
      { name: 'Coolheaded' },
      { name: 'Stout-Hearted' },
      { name: 'Keen Senses' },
      { name: 'Sixth Sense' },
      { name: 'Savvy' },
      { name: 'Suave' },
      { name: 'Schemer' }
    ],
    trappings: [
      'Medium Armour (Leather Jack, Mail Shirt)',
      'Best Hand Weapon',
      '4 Hawthorn Stakes',
      'Religious Symbol (Morr)'
    ],
    careerExits: ['killer-of-the-dead', 'priest', 'scholar', 'spy', 'witch-hunter'],
    isMagicalCareer: false
  },

  // WILDERNESS ELITE
  {
    id: 'badlands-ranger',
    name: 'Badlands Ranger',
    description: 'Elite guides and scouts who can keep a party alive in the wastes.',
    type: 'advanced',
    tier: 2,
    careerPath: 'ranger',
    characteristicAdvances: {
      weaponSkill: 20,
      ballisticSkill: 20,
      strength: 10,
      toughness: 20,
      agility: 25,
      intelligence: 20,
      willPower: 20,
      fellowship: 5
    },
    skillAdvances: [
      { name: 'Common Knowledge', spec: 'Border Princes' },
      { name: 'Concealment' },
      { name: 'Dodge Blow' },
      { name: 'Follow Trail' },
      { name: 'Navigation' },
      { name: 'Outdoor Survival' },
      { name: 'Perception' },
      { name: 'Scale Sheer Surface' },
      { name: 'Secret Signs', spec: 'Scout' },
      { name: 'Set Trap' },
      { name: 'Silent Move' },
      { name: 'Swim' }
    ],
    talentAdvances: [
      { name: 'Flee!' },
      { name: 'Orientation' },
      { name: 'Rover' },
      { name: 'Sixth Sense' },
      { name: 'Very Resilient' }
    ],
    trappings: ['Medium Armour (Mail Shirt, Leather Jack)', 'Rope (10 yards)'],
    careerExits: ['captain', 'explorer', 'outlaw-chief'],
    isMagicalCareer: false
  },

  // DIPLOMACY / NOBILITY
  {
    id: 'ambassador',
    name: 'Ambassador',
    description: 'Crown-sanctioned envoys with the authority to negotiate and scheme.',
    type: 'advanced',
    tier: 3,
    careerPath: 'leadership',
    characteristicAdvances: {
      weaponSkill: 10,
      ballisticSkill: 10,
      strength: 5,
      toughness: 10,
      agility: 10,
      intelligence: 30,
      willPower: 30,
      fellowship: 40
    },
    skillAdvances: [
      { name: 'Academic Knowledge', spec: 'Genealogy/Heraldry or History' },
      { name: 'Blather' },
      { name: 'Charm' },
      { name: 'Command' },
      { name: 'Common Knowledge', spec: 'Any' },
      { name: 'Gossip' },
      { name: 'Haggle' },
      { name: 'Perception' },
      { name: 'Performer', spec: 'Actor' },
      { name: 'Read/Write' },
      { name: 'Ride' },
      { name: 'Speak Language', spec: 'Any' }
    ],
    talentAdvances: [
      { name: 'Dealmaker' },
      { name: 'Schemer' },
      { name: 'Etiquette' },
      { name: 'Linguistics' },
      { name: 'Suave' },
      { name: 'Master Orator' },
      { name: 'Savvy' },
      { name: 'Public Speaking' }
    ],
    trappings: ['Superior Noble’s Garb', 'Jewellery', 'Retinue (guards)'],
    careerExits: ['captain', 'merchant', 'noble-lord', 'politician'],
    isMagicalCareer: false
  },

  // SCHOLARLY / OCCULT-ADJACENT
  {
    id: 'astrologer',
    name: 'Astrologer',
    description: 'Sky-readers who chart fates by the movements of the heavens.',
    type: 'advanced',
    tier: 2,
    careerPath: 'academic',
    characteristicAdvances: {
      weaponSkill: 5,
      ballisticSkill: 5,
      toughness: 5,
      agility: 10,
      intelligence: 25,
      willPower: 20,
      fellowship: 20
    },
    skillAdvances: [
      { name: 'Academic Knowledge', spec: 'Astronomy' },
      { name: 'Academic Knowledge', spec: 'Science' },
      { name: 'Charm' },
      { name: 'Common Knowledge', spec: 'Empire' },
      { name: 'Navigation' },
      { name: 'Perception' },
      { name: 'Performer', spec: 'Storyteller' },
      { name: 'Read/Write' },
      { name: 'Secret Signs', spec: 'Astrologer' },
      { name: 'Speak Language', spec: 'Classical' }
    ],
    talentAdvances: [
      { name: 'Etiquette' },
      { name: 'Flee!' },
      { name: 'Luck' },
      { name: 'Super Numerate' }
    ],
    trappings: ['Book of Star Charts', 'Telescope', 'Writing Kit'],
    careerExits: ['apprentice-wizard', 'charlatan', 'navigator', 'scholar'],
    isMagicalCareer: false
  }
];
