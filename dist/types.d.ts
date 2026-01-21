export interface Capability {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly category: string;
}
export interface Entitlement {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly requiredCapabilities: readonly string[];
}
export interface FeatureFlag {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly defaultValue: boolean;
}
export interface DashboardSectionGating {
    readonly requiredPermissions: readonly string[];
    readonly requiredEntitlements: readonly string[];
    readonly requiredFeatureFlags: readonly string[];
}
export interface DashboardSection {
    readonly id: string;
    readonly name: string;
    readonly order: number;
    readonly gating: DashboardSectionGating;
}
export interface DashboardDeclaration {
    readonly moduleId: string;
    readonly sections: readonly DashboardSection[];
}
export interface TenantContext {
    readonly tenantId: string;
    readonly permissions: readonly string[];
    readonly entitlements: readonly string[];
    readonly featureFlags: Record<string, boolean>;
}
export interface VisibleSection {
    readonly id: string;
    readonly name: string;
    readonly order: number;
}
//# sourceMappingURL=types.d.ts.map