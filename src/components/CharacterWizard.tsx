import { useState } from 'react';
import { rollCharacteristicsByRace } from '../utils/dice';
import { WFRP_RACES } from '../data/races';
import { BASIC_CAREERS, ADVANCED_CAREERS } from '../data/careers';
import { useDraft, draftActions, type Draft } from '../state/CharacterDraftContext';

type WizardStep = 'race' | 'career' | 'stats' | 'name' | 'summary';

interface WizardProps {
  onComplete?: (character: Draft) => void;
  onCancel?: () => void;
}

const formatChoice = (c: { name: string; spec?: string }) => (c.spec ? `${c.name} (${c.spec})` : c.name);

export default function CharacterWizard({ onComplete, onCancel }: WizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>('race');
  const { draft, hasRolled, dispatch } = useDraft();

  const steps: WizardStep[] = ['race', 'career', 'stats', 'name', 'summary'];
  const currentStepIndex = steps.indexOf(currentStep);

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) setCurrentStep(steps[nextIndex]);
  };
  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) setCurrentStep(steps[prevIndex]);
  };

  const selectRace = (raceId: string) => {
    dispatch(draftActions.setRace(raceId));
};
  const selectCareer = (careerId: string) => {
    // Search both basic and advanced careers
    const career = BASIC_CAREERS.find(c => c.id === careerId) 
                || ADVANCED_CAREERS.find(c => c.id === careerId);
    const magicFloor = career?.magicFloor ?? 0;
    dispatch(draftActions.setCareer(careerId, magicFloor));
  };

const rollStats = () => {
  if (!draft.raceId) return;
  
  // Use your table-driven roller
  const rolled = rollCharacteristicsByRace(draft.raceId);
  
  // Set characteristics
  dispatch(draftActions.setStats({
    weaponSkill: rolled.weaponSkill,
    ballisticSkill: rolled.ballisticSkill,
    strength: rolled.strength,
    toughness: rolled.toughness,
    agility: rolled.agility,
    intelligence: rolled.intelligence,
    willPower: rolled.willPower,
    fellowship: rolled.fellowship,
  }));
  
  // Apply TABLE-ROLLED wounds/fate
dispatch(draftActions.applyRolledDerived(rolled.wounds, rolled.fate));
};

  const setName = (name: string) => dispatch(draftActions.setName(name));

  const finishCharacter = () => {
    dispatch(draftActions.finalize());
    onComplete?.({ ...draft });
  };

  const handleCancel = () => {
    dispatch(draftActions.reset());
    onCancel?.();
  };

  // ——— Steps ———
  const RaceStep = () => (
    <div className="wizard-step">
      <h2 className="font-display text-3xl text-[#8b1538] mb-6">Choose Your Race</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {WFRP_RACES.map(race => (
          <button
            type="button"
            key={race.id}
            className={`card-gothic text-left p-4 cursor-pointer transition-all ${
              draft.raceId === race.id ? 'ring-2 ring-[#8b1538] bg-[#8b1538]/10' : 'hover:bg-[#8b1538]/5'
            }`}
            onClick={() => selectRace(race.id)}
          >
            <h3 className="font-display text-xl text-[#8b1538] mb-2">{race.name}</h3>
            <p className="text-sm mb-3">{race.description}</p>
            <div className="text-xs space-y-1">
              <div><strong>Move:</strong> {race.move}</div>
              <div>
                <strong>Skills:</strong>{' '}
                {race.skills.required.slice(0, 3).map(formatChoice).join(', ')}
                {race.skills.required.length > 3 ? '…' : ''}
              </div>
              <div>
                <strong>Talents:</strong>{' '}
                {race.talents.required.slice(0, 2).map(formatChoice).join(', ')}
                {race.talents.required.length > 2 ? '…' : ''}
              </div>
              {race.talents.random && (
                <div className="text-purple-600">
                  <strong>Random:</strong> {race.talents.random.count} from {race.talents.random.options.length} choices
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <button onClick={handleCancel} className="btn-secondary">Cancel</button>
        <button onClick={nextStep} disabled={!draft.raceId} className="btn-primary disabled:opacity-50">
          Next: Career →
        </button>
      </div>
    </div>
  );

  const CareerStep = () => (
    <div className="wizard-step">
      <h2 className="font-display text-3xl text-[#8b1538] mb-6">Choose Your Starting Career</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[...BASIC_CAREERS, ...ADVANCED_CAREERS].map(career => (
          <button
            type="button"
            key={career.id}
            className={`card-gothic text-left p-4 cursor-pointer transition-all ${
              draft.careerId === career.id ? 'ring-2 ring-[#8b1538] bg-[#8b1538]/10' : 'hover:bg-[#8b1538]/5'
            }`}
            onClick={() => selectCareer(career.id)}
          >
            <h3 className="font-display text-xl text-[#8b1538] mb-2">
              {career.name}
              {career.isMagicalCareer && <span className="text-purple-600"> 🔮</span>}
              {career.type === 'advanced' && <span className="text-orange-600"> ⭐</span>}
            </h3>
            <p className="text-sm mb-3">{career.description}</p>
            <div className="text-xs space-y-1">
              <div><strong>Type:</strong> {career.type} (Tier {career.tier})</div>
              <div>
                <strong>Skills:</strong>{' '}
                {career.skillAdvances.slice(0, 3).map(formatChoice).join(', ')}
                {career.skillAdvances.length > 3 ? '…' : ''}
              </div>
              <div>
                <strong>Talents:</strong>{' '}
                {career.talentAdvances.slice(0, 2).map(formatChoice).join(', ')}
                {career.talentAdvances.length > 2 ? '…' : ''}
              </div>
              {career.isMagicalCareer && (
                <div className="text-purple-600">
                  <strong>✨ Magical Career:</strong> Starts with Magic {career.magicFloor || 1}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <button onClick={prevStep} className="btn-secondary">← Back</button>
        <button onClick={nextStep} disabled={!draft.careerId} className="btn-primary disabled:opacity-50">
          Next: Roll Stats →
        </button>
      </div>
    </div>
  );

  // Keep the rest of the steps exactly as GPT provided them...
  const StatsStep = () => (
    <div className="wizard-step">
      <h2 className="font-display text-3xl text-[#8b1538] mb-6">Roll Your Characteristics</h2>

      {!hasRolled ? (
        <div className="text-center mb-6">
          <p className="mb-4 text-lg">
            Ready to roll 2d10 for each characteristic based on your race:
            <strong className="text-[#8b1538]"> {WFRP_RACES.find(r => r.id === draft.raceId)?.name}</strong>
          </p>
          <button onClick={rollStats} className="btn-primary text-xl px-8 py-4">🎲 Roll Characteristics</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-6">
            {[
              ['WS', draft.stats.weaponSkill],
              ['BS', draft.stats.ballisticSkill],
              ['S', draft.stats.strength],
              ['T', draft.stats.toughness],
              ['Ag', draft.stats.agility],
              ['Int', draft.stats.intelligence],
              ['WP', draft.stats.willPower],
              ['Fel', draft.stats.fellowship],
            ].map(([k, v]) => (
              <div key={k} className="card-gothic text-center p-3">
                <div className="text-sm font-semibold text-[#8b1538] mb-1">{k}</div>
                <div className="text-2xl font-bold">{v as number}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-6">
            <div className="col-span-full text-center mb-2">
              <h3 className="font-display text-xl text-[#8b1538]">Derived Characteristics</h3>
            </div>
            {[
              ['A', draft.derived.attacks],
              ['W', draft.derived.wounds],
              ['SB', draft.derived.strengthBonus],
              ['TB', draft.derived.toughnessBonus],
              ['M', draft.derived.move],
              ['Mag', draft.derived.magic],
              ['IP', draft.derived.insanityPoints],
              ['FP', draft.derived.fate],
            ].map(([k, v]) => (
              <div key={k} className="card-gothic text-center p-3">
                <div className="text-sm font-semibold text-[#8b1538] mb-1">{k}</div>
                <div className="text-2xl font-bold">{v as number}</div>
              </div>
            ))}
          </div>

          <div className="text-center mb-4">
            <button onClick={rollStats} className="btn-secondary mr-4">🎲 Re-roll Stats</button>
          </div>
        </>
      )}

      <div className="flex justify-between">
        <button onClick={prevStep} className="btn-secondary">← Back</button>
        <button onClick={nextStep} disabled={!hasRolled} className="btn-primary disabled:opacity-50">
          Next: Name Character →
        </button>
      </div>
    </div>
  );

  const NameStep = () => (
    <div className="wizard-step">
      <h2 className="font-display text-3xl text-[#8b1538] mb-6">Name Your Character</h2>
      <div className="max-w-md mx-auto mb-6">
        <label className="block text-sm font-medium mb-2">Character Name</label>
        <input
          type="text"
          value={draft.name || ''}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter character name..."
          className="w-full px-4 py-3 rounded-lg border-2 border-[#8b1538]/30 focus:border-[#8b1538] focus:outline-none text-lg"
        />
      </div>
      <div className="flex justify-between">
        <button onClick={prevStep} className="btn-secondary">← Back</button>
        <button onClick={nextStep} disabled={!draft.name?.trim()} className="btn-primary disabled:opacity-50">
          Next: Summary →
        </button>
      </div>
    </div>
  );

  const SummaryStep = () => {
    const race = WFRP_RACES.find(r => r.id === draft.raceId);
    const career = BASIC_CAREERS.find(c => c.id === draft.careerId) 
                || ADVANCED_CAREERS.find(c => c.id === draft.careerId);
    return (
      <div className="wizard-step">
        <h2 className="font-display text-3xl text-[#8b1538] mb-6">Character Summary</h2>

        <div className="card-gothic p-6 mb-6">
          <h3 className="font-display text-2xl text-[#8b1538] mb-4">{draft.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
            <div><strong>Race:</strong> {race?.name}</div>
            <div><strong>Career:</strong> {career?.name}</div>
            {career?.isMagicalCareer && (
              <div className="col-span-full text-purple-600">
                <strong>✨ Magical Career:</strong> Magic = {draft.derived.magic}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-6">
          {[
            ['WS', draft.stats.weaponSkill],
            ['BS', draft.stats.ballisticSkill],
            ['S', draft.stats.strength],
            ['T', draft.stats.toughness],
            ['Ag', draft.stats.agility],
            ['Int', draft.stats.intelligence],
            ['WP', draft.stats.willPower],
            ['Fel', draft.stats.fellowship],
          ].map(([k, v]) => (
            <div key={k} className="card-gothic text-center p-2">
              <div className="text-xs font-semibold text-[#8b1538]">{k}</div>
              <div className="text-lg font-bold">{v as number}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button onClick={prevStep} className="btn-secondary">← Back</button>
          <button onClick={finishCharacter} className="btn-primary text-xl px-8 py-4">✅ Create Character</button>
        </div>
      </div>
    );
  };

  const StepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex space-x-4">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              i <= currentStepIndex ? 'bg-[#8b1538] text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {i + 1}
            </div>
            <div className={`ml-2 text-sm font-medium ${i === currentStepIndex ? 'text-[#8b1538]' : 'text-gray-500'}`}>
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </div>
            {i < steps.length - 1 && <div className="w-8 h-0.5 bg-gray-300 mx-4" />}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="wizard-container max-w-4xl mx-auto p-6">
      <StepIndicator />
      <div className="wizard-content">
        {currentStep === 'race' && <RaceStep />}
        {currentStep === 'career' && <CareerStep />}
        {currentStep === 'stats' && <StatsStep />}
        {currentStep === 'name' && <NameStep />}
        {currentStep === 'summary' && <SummaryStep />}
      </div>
    </div>
  );
}