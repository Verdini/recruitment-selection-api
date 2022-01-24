import { DynamicModule, Module } from '@nestjs/common';
import * as GupyEnv from 'gupy-env';

interface ConfigOptions {
  /**
   * File path.
   */
  path?: string;
}

/**
 * Module to load env. variables from a file.
 */
@Module({})
export class ConfigModule {
  /**
   * Load env variabled from a file
   * @param {ConfigOptions} options - options for loading the env. variables file.
   * @returns The module loaded
   */
  static forRoot(options: ConfigOptions): DynamicModule {
    try {
      GupyEnv.load({ path: options.path });
    } catch (e) {}

    return {
      module: ConfigModule,
      global: true,
    };
  }
}
