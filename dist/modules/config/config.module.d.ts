import { DynamicModule } from '@nestjs/common';
interface ConfigOptions {
    path?: string;
}
export declare class ConfigModule {
    static forRoot(options: ConfigOptions): DynamicModule;
}
export {};
