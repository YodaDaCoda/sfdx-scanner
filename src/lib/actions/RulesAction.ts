import {Display} from '../utils/Display';

export type RulesDependencies = {
	display: Display;
}

export type RulesInput = {
	configFile?: string;
	ruleSelector: string[];
}
export class RulesAction {
	public execute(_dependencies: RulesDependencies, _input: RulesInput): void {
	}
}
