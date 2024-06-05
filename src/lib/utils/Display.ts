import {Ux} from '@salesforce/sf-plugins-core';
import {Rule, SeverityLevel} from '@salesforce/code-analyzer-core';
import {BundleName, getMessage} from '../messages';

export enum DisplayFormat {
	TABLE = 'table',
	DETAIL = 'detail'
}

export interface Display {
	displayRules(rules: Rule[]): void;
}

export function getUxDisplayForFormat(format: DisplayFormat, ux: Ux): Display {
	switch (format) {
		case DisplayFormat.TABLE:
			return new TableUxDisplay(ux);
		case DisplayFormat.DETAIL:
			return new DetailUxDisplay(ux);
		default:
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			throw new Error(`No Display implementation corresponds to ${format}`);
	}
}

abstract class UxDisplay implements Display {
	protected readonly ux: Ux;

	constructor(ux: Ux) {
		this.ux = ux;
	}

	public displayRules(rules: Rule[]): void {
		this.ux.log(getMessage(BundleName.Display, 'rules.summary', [rules.length]));

		this._displayRules(rules);
	}

	protected abstract _displayRules(rules: Rule[]): void;
}

export class TableUxDisplay extends UxDisplay {

	public _displayRules(rules: Rule[]): void {
		let nextId = 1;
		const tablefiedRules: TablefiedRule[] = rules.map(rule => {
			return {
				id: nextId++,
				name: rule.getName(),
				engine: rule.getEngineName(),
				severity: toDisplayableValue(rule.getSeverityLevel()),
				tag: rule.getTags().join(', ')
			};
		});
		this.ux.table(tablefiedRules, RULE_TABLE_COLUMNS);
	}
}

export class DetailUxDisplay extends UxDisplay {
	public _displayRules(_rules: Rule[]): void {
		// TODO
	}
}

function toDisplayableValue(severity: SeverityLevel): string {
	return `${severity.valueOf()} (${SeverityLevel[severity]})`;
}

type TablefiedRule = {
	id: number;
	name: string;
	engine: string;
	severity: string;
	tag: string;
}

const RULE_TABLE_COLUMNS: Ux.Table.Columns<TablefiedRule> = {
	id: {
		header: getMessage(BundleName.Display, 'rules.table.id-header')
	},
	name: {
		header: getMessage(BundleName.Display, 'rules.table.name-header')
	},
	engine: {
		header: getMessage(BundleName.Display, 'rules.table.engine-header')
	},
	severity: {
		header: getMessage(BundleName.Display, 'rules.table.severity-header')
	},
	tag: {
		header: getMessage(BundleName.Display, 'rules.table.tag-header')
	}
};
