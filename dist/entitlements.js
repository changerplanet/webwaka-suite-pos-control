"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POS_ENTITLEMENTS = void 0;
exports.getEntitlementById = getEntitlementById;
exports.getEntitlementsByCapability = getEntitlementsByCapability;
exports.getAllEntitlementIds = getAllEntitlementIds;
exports.POS_ENTITLEMENTS = Object.freeze([
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
function getEntitlementById(id) {
    return exports.POS_ENTITLEMENTS.find(ent => ent.id === id);
}
function getEntitlementsByCapability(capabilityId) {
    return exports.POS_ENTITLEMENTS.filter(ent => ent.requiredCapabilities.includes(capabilityId));
}
function getAllEntitlementIds() {
    return exports.POS_ENTITLEMENTS.map(ent => ent.id);
}
//# sourceMappingURL=entitlements.js.map