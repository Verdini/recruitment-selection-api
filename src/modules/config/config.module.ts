import { DynamicModule, Module } from '@nestjs/common';
import * as GupyEnv from 'gupy-env';

interface ConfigOptions {
  path?: string;
}

@Module({})
export class ConfigModule {
  static forRoot(options: ConfigOptions): DynamicModule {
    GupyEnv.load({ path: options.path });
    return {
      module: ConfigModule,
      global: true,
    };
  }
}
