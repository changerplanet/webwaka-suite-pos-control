import { Entitlement } from './types';

export const POS_ENTITLEMENTS: readonly Entitlement[] = Object.freeze([
  {
    id: 'pos-access',
    name: 'POS Access',
    description: 'Basic access to POS functionality',
    requiredCapabilities: ['pos:sale.view', 'pos:shift.view']
  },
  {
    id: 'pos-cashier',
    name: 'POS Cashier',
    description: 'Standard cashier operations',
    requiredCapabilities: ['pos:sale.create', 'pos:sale.view', 'pos:shift.open', 'pos:shift.close']
  },
  {
    id: 'pos-supervisor',
    name: 'POS Supervisor',
    description: 'Supervisor-level POS operations including refunds',
    requiredCapabilities: ['pos:sale.refund', 'pos:sale.void', 'pos:inventory.view']
  },
  {
    id: 'pos-offline-enabled',
    name: 'Offline Mode',
    description: 'Ability to process sales in offline mode',
    requiredCapabilities: ['pos:sale.create']
  },
  {
    id: 'pos-multi-location',
    name: 'Multi-Location',
    description: 'Access to multiple POS locations',
    requiredCapabilities: ['pos:shift.view', 'pos:inventory.view']
  },
  {
    id: 'pos-advanced-reports',
    name: 'Advanced Reports',
    description: 'Access to advanced reporting features',
    requiredCapabilities: ['pos:reports.view', 'pos:reports.export']
  },
  {
    id: 'pos-inventory-management',
    name: 'Inventory Management',
    description: 'Full inventory management capabilities',
    requiredCapabilities: ['pos:inventory.view', 'pos:inventory.adjust']
  },
  {
    id: 'pos-admin',
    name: 'POS Admin',
    description: 'Full administrative access to POS settings',
    requiredCapabilities: ['pos:settings.view', 'pos:settings.manage']
  }
]);

export function getEntitlementById(id: string): Entitlement | undefined {
  return POS_ENTITLEMENTS.find(ent => ent.id === id);
}

export function getEntitlementsByCapability(capabilityId: string): readonly Entitlement[] {
  return POS_ENTITLEMENTS.filter(ent => 
    ent.requiredCapabilities.includes(capabilityId)
  );
}

export function getAllEntitlementIds(): readonly string[] {
  return POS_ENTITLEMENTS.map(ent => ent.id);
}
