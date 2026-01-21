import { FeatureFlag } from './types';
export declare const POS_FEATURE_FLAGS: readonly FeatureFlag[];
export declare function getFeatureFlagById(id: string): FeatureFlag | undefined;
export declare function getDefaultFeatureFlagValues(): Record<string, boolean>;
export declare function getAllFeatureFlagIds(): readonly string[];
//# sourceMappingURL=featureFlags.d.ts.map