import type { CareerData } from '../data/careers';

export function validateCareerBalance(career: CareerData): string[] {
  const warnings: string[] = [];
  
  // Check talent count (Basic careers usually have 4-6 core talents)
  if (career.type === 'basic' && career.talentAdvances.length > 6) {
    warnings.push(`${career.name}: Has ${career.talentAdvances.length} talents (Basic careers usually have 4-6)`);
  }
  
  // Check skill count (Basic careers usually have 6-8 skills)
  if (career.type === 'basic' && career.skillAdvances.length > 8) {
    warnings.push(`${career.name}: Has ${career.skillAdvances.length} skills (Basic careers usually have 6-8)`);
  }
  
  // Check magic consistency
  if (career.isMagicalCareer && !career.magicFloor) {
    warnings.push(`${career.name}: Marked as magical but has no magicFloor`);
  }
  
  if (!career.isMagicalCareer && career.magicFloor) {
    warnings.push(`${career.name}: Has magicFloor but not marked as magical`);
  }
  
  return warnings;
}

export function checkCareerPathConsistency(careers: CareerData[]): string[] {
  const validPaths = ['warrior', 'rogue', 'ranger', 'academic', 'religious', 'commoner', 'social'];
  const warnings: string[] = [];
  
  careers.forEach(career => {
    if (career.careerPath && !validPaths.includes(career.careerPath)) {
      warnings.push(`${career.name}: Invalid career path '${career.careerPath}'`);
    }
  });
  
  return warnings;
}