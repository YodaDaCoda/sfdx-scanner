import {DisplayFormat, getUxDisplayForFormat, TableUxDisplay} from '../../../lib/lib/utils/Display';
import {StubUx} from '../../stubs/StubUx';
import {StubRule} from '../../stubs/StubRule';
import * as EngineApi from '@salesforce/code-analyzer-engine-api';

const RULE_1_DESC = {
	name: "stubRule1",
	severityLevel: EngineApi.SeverityLevel.Low,
	type: EngineApi.RuleType.Standard,
	tags: ["Recommended", "CodeStyle"],
	description: "Some description for stubRule1",
	resourceUrls: ["https://example.com/stubRule1"]
};
const RULE_2_DESC = {
	name: "stubRule2",
	severityLevel: EngineApi.SeverityLevel.High,
	type: EngineApi.RuleType.Standard,
	tags: ["Recommended", "Security"],
	description: "Some description for stubRule2",
	resourceUrls: ["https://example.com/stubRule2"]
};



describe('#getUxDisplayForFormat()', () => {
	it('DisplayFormat.TABLE corresponds to TableUxDisplay', () => {
		const display = getUxDisplayForFormat(DisplayFormat.TABLE, new StubUx());
		expect(display.constructor.name).toEqual('TableUxDisplay');
	});

	it('DisplayFormat.DETAIL corresponds to DetailUxDisplay', () => {
		const display = getUxDisplayForFormat(DisplayFormat.DETAIL, new StubUx());
		expect(display.constructor.name).toEqual('DetailUxDisplay');
	})
});

describe('UxDisplay subvariants', () => {
	describe('TableUxDisplay', () => {
		describe('Can display rules', () => {
			it('When there are no rules, outputs empty table', () => {
				const rules = [];
				const stubUx = new StubUx();
				const display = new TableUxDisplay(stubUx);

				display.displayRules(rules);

				stubUx.expectLogged('Found 0 rules:');
				stubUx.expectTableData([]);
			});

			it('When there are rules, they are tablefied and output', () => {
				const rules = [RULE_1_DESC, RULE_2_DESC].map(desc => new StubRule('SampleEngine', desc));
				const stubUx = new StubUx();
				const display = new TableUxDisplay(stubUx);

				display.displayRules(rules);

				stubUx.expectLogged('Found 2 rules:');
				stubUx.expectTableData([{
					id: 1,
					name: RULE_1_DESC.name,
					engine: 'SampleEngine',
					severity: '4 (Low)',
					tag: 'Recommended, CodeStyle'
				}, {
					id: 2,
					name: RULE_2_DESC.name,
					engine: 'SampleEngine',
					severity: '2 (High)',
					tag: 'Recommended, Security'
				}]);
			});
		});
	});

	describe('DetailUxDisplay', () => {
		it('When there are no rules, outputs header and nothing else', () => {

		});
	});
});
