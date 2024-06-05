import {Ux} from '@salesforce/sf-plugins-core';

export class StubUx extends Ux {
	private loggedStrings: string[] = [];
	private loggedTables: string[] = [];

	constructor() {
		super({jsonEnabled: false});
	}

	public log(message?: string, ..._args: string[]): void {
		this.loggedStrings.push(message || '');
	}

	public expectLogged(message: string): void {
		expect(this.loggedStrings).toContain(message);
	}

	public table<T extends Ux.Table.Data>(data: T[], _columns: Ux.Table.Columns<T>, _options?: Ux.Table.Options): void {
		this.loggedTables.push(JSON.stringify(data));
	}

	public expectTableData<T extends Ux.Table.Data>(data: T[]): void {
		expect(this.loggedTables).toContain(JSON.stringify(data));
	}
}
