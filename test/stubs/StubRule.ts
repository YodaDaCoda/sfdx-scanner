import {Rule, RuleType, SeverityLevel} from '@salesforce/code-analyzer-core';
import * as EngineApi from '@salesforce/code-analyzer-engine-api';
export class StubRule implements Rule {
	private readonly engineName: string
	private readonly ruleDesc: EngineApi.RuleDescription;

	constructor(engineName: string, ruleDesc: EngineApi.RuleDescription) {
		this.engineName = engineName;
		this.ruleDesc = ruleDesc;
	}

	getName(): string {
		return this.ruleDesc.name;
	}

	getEngineName(): string {
		return this.engineName;
	}

	getSeverityLevel(): SeverityLevel {
		// Currently the engApi.SeverityLevel has the same enum values as core's SeverityLevel.
		// If this ever changes, then we'll need to update this method mapping one to the other.
		return this.ruleDesc.severityLevel as SeverityLevel;
	}

	getTags(): string[] {
		return this.ruleDesc.tags;
	}

	getType(): RuleType {
		return this.ruleDesc.type as RuleType;
	}

	getDescription(): string {
		return this.ruleDesc.description;
	}

	getResourceUrls(): string[] {
		return this.ruleDesc.resourceUrls;
	}
}
