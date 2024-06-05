import {CodeAnalyzerConfig} from '@salesforce/code-analyzer-core';

export interface ConfigLoader {
	loadConfig(configPath?: string): CodeAnalyzerConfig;
}

export class ConfigLoaderImpl implements ConfigLoader {
	public loadConfig(configPath?: string): CodeAnalyzerConfig {
		if (configPath) {
			// TODO
			throw new Error('Custom configs not supported yet');
		} else {
			return CodeAnalyzerConfig.withDefaults();
		}
	}
}
