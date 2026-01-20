import { DashboardDeclaration, DashboardSection, TenantContext, VisibleSection } from '../types';

export const POS_DASHBOARD_DECLARATION: DashboardDeclaration = Object.freeze({
  moduleId: 'webwaka_suite_pos_control',
  sections: Object.freeze([
    {
      id: 'pos-sales',
      name: 'Sales',
      order: 1,
      gating: {
        requiredPermissions: ['pos:sale.view'],
        requiredEntitlements: ['pos-access'],
        requiredFeatureFlags: ['pos-enabled']
      }
    },
    {
      id: 'pos-shifts',
      name: 'Shifts',
      order: 2,
      gating: {
        requiredPermissions: ['pos:shift.view'],
        requiredEntitlements: ['pos-access'],
        requiredFeatureFlags: ['pos-enabled']
      }
    },
    {
      id: 'pos-inventory',
      name: 'Inventory',
      order: 3,
      gating: {
        requiredPermissions: ['pos:inventory.view'],
        requiredEntitlements: ['pos-inventory-management'],
        requiredFeatureFlags: ['pos-enabled']
      }
    },
    {
      id: 'pos-reports',
      name: 'Reports',
      order: 4,
      gating: {
        requiredPermissions: ['pos:reports.view'],
        requiredEntitlements: ['pos-advanced-reports'],
        requiredFeatureFlags: ['pos-enabled']
      }
    },
    {
      id: 'pos-settings',
      name: 'Settings',
      order: 5,
      gating: {
        requiredPermissions: ['pos:settings.view'],
        requiredEntitlements: ['pos-admin'],
        requiredFeatureFlags: ['pos-enabled']
      }
    }
  ])
});

function isSectionVisible(section: DashboardSection, context: TenantContext): boolean {
  const hasAllPermissions = section.gating.requiredPermissions.every(
    perm => context.permissions.includes(perm)
  );
  
  const hasAllEntitlements = section.gating.requiredEntitlements.every(
    ent => context.entitlements.includes(ent)
  );
  
  const hasAllFeatureFlags = section.gating.requiredFeatureFlags.every(
    flag => context.featureFlags[flag] === true
  );
  
  return hasAllPermissions && hasAllEntitlements && hasAllFeatureFlags;
}

export function resolveVisibleSections(context: TenantContext): readonly VisibleSection[] {
  return POS_DASHBOARD_DECLARATION.sections
    .filter(section => isSectionVisible(section, context))
    .map(section => ({
      id: section.id,
      name: section.name,
      order: section.order
    }))
    .sort((a, b) => a.order - b.order);
}

export function getDashboardDeclaration(): DashboardDeclaration {
  return POS_DASHBOARD_DECLARATION;
}

export function getSectionById(sectionId: string): DashboardSection | undefined {
  return POS_DASHBOARD_DECLARATION.sections.find(s => s.id === sectionId);
}
