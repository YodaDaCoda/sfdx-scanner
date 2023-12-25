import {EngineExecutionSummary, FormattedOutput, RuleResult} from "../../types";
import {OUTPUT_FORMAT} from "../RuleManager";
import {isPathlessViolation} from "../util/Utils";
import {CsvOutputFormatter} from "./CsvOutputFormatter";
import {HtmlOutputFormatter} from "./HtmlOutputFormatter";
import {JsonOutputFormatter} from "./JsonOutputFormatter";
import {JunitOutputFormatter} from "./JunitOutputFormatter";
import {SarifOutputFormatter} from "./SarifOutputFormatter";
import {TableOutputFormatter} from "./TableOutputFormatter";
import {XmlOutputFormatter} from "./XmlOutputFormatter";
import {SfError} from "@salesforce/core";

export interface OutputFormatter {
	format(results: Results): Promise<FormattedOutput>;
}

export class Results {
	private readonly ruleResults: RuleResult[];
	private readonly executedEngines: Set<string>;

	constructor(ruleResults: RuleResult[], executedEngines: Set<string>, ) {
		this.ruleResults = ruleResults;
		this.executedEngines = executedEngines;
	}

	public getRuleResults(): RuleResult[] {
		return this.ruleResults
	}

	public getExecutedEngines(): Set<string> {
		return this.executedEngines;
	}

	public isEmpty(): boolean {
		return !this.ruleResults || this.ruleResults.length === 0
	}

	public getMinSev(): number {
		// If there are no results, then there are no errors.
		if (this.isEmpty()) {
			return 0;
		}
		let minSev: number = null;

		// if -n or -s flag used, minSev is calculated with normal value
		for (const res of this.ruleResults) {
			for (const violation of res.violations) {
				const severity = (violation.normalizedSeverity === undefined)? violation.severity : violation.normalizedSeverity;
				if (!minSev || severity < minSev) {
					minSev = severity;
				}
			}
		}

		// After iterating through all of the results, return the minimum severity we found (or 0 if we still have a null value).
		return minSev || 0;
	}

	public getSummaryMap(): Map<string, EngineExecutionSummary> {
		const summaryMap: Map<string, EngineExecutionSummary> = new Map();
		for (const e of this.executedEngines.values()) {
			summaryMap.set(e, {
				fileCount: 0,
				violationCount: 0
			});
		}
		if (!this.isEmpty()) {
			this.ruleResults.forEach(res => {
				const ees: EngineExecutionSummary = summaryMap.get(res.engine);
				ees.fileCount += 1;
				ees.violationCount += res.violations.length;
			});
		}
		return summaryMap;
	}

	public violationsAreDfa(): boolean {
		for (const result of this.ruleResults) {
			if (result.violations.length > 0) {
				return !isPathlessViolation(result.violations[0]);
			}
		}
		return false;
	}

	public async toFormattedOutput(format: OUTPUT_FORMAT, verboseViolations: boolean): Promise<FormattedOutput> {
		let outputFormatter: OutputFormatter;
		switch (format) {
			case OUTPUT_FORMAT.CSV:
				outputFormatter = new CsvOutputFormatter();
				break;
			case OUTPUT_FORMAT.HTML:
				outputFormatter = new HtmlOutputFormatter(verboseViolations);
				break;
			case OUTPUT_FORMAT.JSON:
				outputFormatter = new JsonOutputFormatter(verboseViolations);
				break;
			case OUTPUT_FORMAT.JUNIT:
				outputFormatter = new JunitOutputFormatter();
				break;
			case OUTPUT_FORMAT.SARIF:
				outputFormatter = new SarifOutputFormatter();
				break;
			case OUTPUT_FORMAT.TABLE:
				outputFormatter = new TableOutputFormatter();
				break;
			case OUTPUT_FORMAT.XML:
				outputFormatter = new XmlOutputFormatter();
				break;
			default:
				throw new SfError('Unrecognized output format.');
		}
		return await outputFormatter.format(this);
	}
}
