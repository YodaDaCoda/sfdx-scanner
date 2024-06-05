import {Ux, Flags, SfCommand} from '@salesforce/sf-plugins-core';
import {RulesAction, RulesDependencies, RulesInput} from '../../lib/actions/RulesAction';
import {DisplayFormat, getUxDisplayForFormat} from '../../lib/utils/Display';
import {BundleName, getMessage} from '../../lib/messages';

export default class RulesCommand extends SfCommand<void> {
	// We don't need the `--json` output for this command.
	public static readonly enableJsonFlag = false;
	public static readonly summary = getMessage(BundleName.RulesCommand, 'command.summary');
	public static readonly description = getMessage(BundleName.RulesCommand, 'command.description');
	public static readonly examples = [
		getMessage(BundleName.RulesCommand, 'command.examples')
	];

	public static readonly flags = {
		'rule-selector': Flags.string({
			summary: getMessage(BundleName.RulesCommand, 'flags.rule-selector.summary'),
			char: 'r',
			multiple: true,
			delimiter: ',',
			default: ["Recommended"]
		}),
		'config-file': Flags.file({
			summary: getMessage(BundleName.RulesCommand, 'flags.config-file.summary'),
			char: 'c',
			exists: true
		}),
		view: Flags.string({
			summary: getMessage(BundleName.RulesCommand, 'flags.view.summary'),
			char: 'v',
			default: DisplayFormat.TABLE,
			options: Object.values(DisplayFormat)
		})
	};

	public async run(): Promise<void> {
		const parsedFlags = (await this.parse(RulesCommand)).flags;
		const action: RulesAction = new RulesAction();
		const dependencies: RulesDependencies = {
			display: getUxDisplayForFormat(
				// Since `view` is limited to the values of `DisplayFormat`, we can safely cast it.
				parsedFlags.view as DisplayFormat,
				// Can't directly access the command's UX instance, so we need to instantiate our own.
				new Ux({jsonEnabled: false}))
		};
		const inputs: RulesInput = {
			configFile: parsedFlags['config-file'],
			ruleSelector: parsedFlags['rule-selector']
		};
		action.execute(dependencies, inputs);
	}
}

