import {stubSfCommandUx} from '@salesforce/sf-plugins-core';
import {TestContext} from '@salesforce/core/lib/testSetup';
import RulesCommand from '../../../src/commands/code-analyzer/rules';
import {RulesInput, RulesDependencies, RulesAction} from '../../../src/lib/actions/RulesAction';
import {DetailUxDisplay, TableUxDisplay} from '../../../lib/lib/utils/Display';

describe('`code-analyzer rules` tests', () => {
	const $$ = new TestContext();

	let spy: jest.SpyInstance;
	let receivedActionDependencies: RulesDependencies;
	let receivedActionInput: RulesInput;
	beforeEach(() => {
		stubSfCommandUx($$.SANDBOX);
		spy = jest.spyOn(RulesAction.prototype, 'execute').mockImplementation((dependencies, input) => {
			receivedActionDependencies = dependencies;
			receivedActionInput = input;
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('--rule-selector', () => {
		it('Can be supplied once with a single value', async () => {
			const inputValue = 'abcde';
			await RulesCommand.run(['--rule-selector', inputValue]);
			expect(spy).toHaveBeenCalled();
			expect(receivedActionInput).toHaveProperty('ruleSelector', [inputValue]);
		});

		it('Can be supplied once with multiple comma-separated values', async () => {
			const inputValue = ['abcde', 'defgh'];
			await RulesCommand.run(['--rule-selector', inputValue.join(',')]);
			expect(spy).toHaveBeenCalled();
			expect(receivedActionInput).toHaveProperty('ruleSelector', inputValue);
		});

		it('Can be supplied multiple times with one value each', async () => {
			const inputValue1 = 'abcde';
			const inputValue2 = 'defgh';
			await RulesCommand.run(['--rule-selector', inputValue1, '--rule-selector', inputValue2]);
			expect(spy).toHaveBeenCalled();
			expect(receivedActionInput).toHaveProperty('ruleSelector', [inputValue1, inputValue2]);
		});

		it('Can be supplied multiple times with multiple comma-separated values each', async () => {
			const inputValue1 = ['abcde', 'hijlk'];
			const inputValue2 = ['defgh', 'mnopq'];
			await RulesCommand.run(['--rule-selector', inputValue1.join(','), '--rule-selector', inputValue2.join(',')]);
			expect(spy).toHaveBeenCalled();
			expect(receivedActionInput).toHaveProperty('ruleSelector', [...inputValue1, ...inputValue2]);
		});

		it('Defaults to value of "Recommended"', async () => {
			await RulesCommand.run([]);
			expect(spy).toHaveBeenCalled();
			expect(receivedActionInput).toHaveProperty('ruleSelector', ["Recommended"]);
		})

		it('Can be referenced by its shortname, -r', async () => {
			const inputValue = 'abcde';
			await RulesCommand.run(['-r', inputValue]);
			expect(spy).toHaveBeenCalled();
			expect(receivedActionInput).toHaveProperty('ruleSelector', [inputValue]);
		});
	});

	describe('--config-file', () => {
		it('Accepts a real file', async () => {
			const inputValue = 'package.json';
			await RulesCommand.run(['--config-file', inputValue]);
			expect(spy).toHaveBeenCalled();
			expect(receivedActionInput).toHaveProperty('configFile', inputValue);
		});

		it('Rejects non-existent file', async () => {
			const inputValue = 'definitelyFakeFile.json';
			const executionPromise = RulesCommand.run(['--config-file', inputValue]);
			await expect(executionPromise).rejects.toThrow(`No file found at ${inputValue}`);
			expect(spy).not.toHaveBeenCalled();
		});

		it('Can only be supplied once', async () => {
			const inputValue1 = 'package.json';
			const inputValue2 = 'LICENSE';
			const executionPromise = RulesCommand.run(['--config-file', inputValue1, '--config-file', inputValue2]);
			await expect(executionPromise).rejects.toThrow(`Flag --config-file can only be specified once`);
			expect(spy).not.toHaveBeenCalled();
		});

		it('Can be referenced by its shortname, -c', async () => {
			const inputValue = 'package.json';
			await RulesCommand.run(['-c', inputValue]);
			expect(spy).toHaveBeenCalled();
			expect(receivedActionInput).toHaveProperty('configFile', inputValue);
		});
	});

	describe('--view', () => {
		it('Accepts the value, "table"', async () => {
			const inputValue = 'table';
			await RulesCommand.run(['--view', inputValue]);
			expect(spy).toHaveBeenCalled();
			expect(receivedActionDependencies.display.constructor.name).toEqual(TableUxDisplay.name);
		});

		it('Accepts the value, "detail"', async () => {
			const inputValue = 'detail';
			await RulesCommand.run(['--view', inputValue]);
			expect(spy).toHaveBeenCalled();
			expect(receivedActionDependencies.display.constructor.name).toEqual(DetailUxDisplay.name);
		});

		it('Rejects all other values', async () => {
			const inputValue = 'beep';
			const executionPromise = RulesCommand.run(['--view', inputValue]);
			await expect(executionPromise).rejects.toThrow(`Expected --view=${inputValue} to be one of:`);
			expect(spy).not.toHaveBeenCalled();
		});

		it('Defaults to value of "table"', async () => {
			await RulesCommand.run([]);
			expect(spy).toHaveBeenCalled();
			expect(receivedActionDependencies.display.constructor.name).toEqual(TableUxDisplay.name);
		});

		it('Can be supplied only once', async () => {
			const inputValue1 = 'detail';
			const inputValue2 = 'table';
			const executionPromise = RulesCommand.run(['--view', inputValue1, '--view', inputValue2]);
			await expect(executionPromise).rejects.toThrow(`Flag --view can only be specified once`);
			expect(spy).not.toHaveBeenCalled();
		});

		it('Can be referenced by its shortname, -v', async () => {
			const inputValue = 'table';
			await RulesCommand.run(['-v', inputValue]);
			expect(spy).toHaveBeenCalled();
			expect(receivedActionDependencies.display.constructor.name).toEqual(TableUxDisplay.name);
		});
	});
});
