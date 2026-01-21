import { DashboardDeclaration, DashboardSection, TenantContext, VisibleSection } from '../types';
export declare const POS_DASHBOARD_DECLARATION: DashboardDeclaration;
export declare function resolveVisibleSections(context: TenantContext): readonly VisibleSection[];
export declare function getDashboardDeclaration(): DashboardDeclaration;
export declare function getSectionById(sectionId: string): DashboardSection | undefined;
//# sourceMappingURL=pos.dashboard.d.ts.map