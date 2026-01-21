"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POS_CAPABILITIES = void 0;
exports.getCapabilityById = getCapabilityById;
exports.getCapabilitiesByCategory = getCapabilitiesByCategory;
exports.getAllCapabilityIds = getAllCapabilityIds;
exports.POS_CAPABILITIES = Object.freeze([
    {
        id: 'pos:sale.create',
        name: 'Create Sale',
        description: 'Ability to create new sales transactions',
        category: 'sales'
    },
    {
        id: 'pos:sale.view',
        name: 'View Sales',
        description: 'Ability to view sales transactions',
        category: 'sales'
    },
    {
        id: 'pos:sale.refund',
        name: 'Process Refund',
        description: 'Ability to process refunds for sales',
        category: 'sales'
    },
    {
        id: 'pos:sale.void',
        name: 'Void Sale',
        description: 'Ability to void sales transactions',
        category: 'sales'
    },
    {
        id: 'pos:shift.open',
        name: 'Open Shift',
        description: 'Ability to open a cashier shift',
        category: 'shifts'
    },
    {
        id: 'pos:shift.close',
        name: 'Close Shift',
        description: 'Ability to close a cashier shift',
        category: 'shifts'
    },
    {
        id: 'pos:shift.view',
        name: 'View Shifts',
        description: 'Ability to view shift history',
        category: 'shifts'
    },
    {
        id: 'pos:inventory.view',
        name: 'View Inventory',
        description: 'Ability to view inventory levels',
        category: 'inventory'
    },
    {
        id: 'pos:inventory.adjust',
        name: 'Adjust Inventory',
        description: 'Ability to make inventory adjustments',
        category: 'inventory'
    },
    {
        id: 'pos:reports.view',
        name: 'View Reports',
        description: 'Ability to view POS reports',
        category: 'reports'
    },
    {
        id: 'pos:reports.export',
        name: 'Export Reports',
        description: 'Ability to export POS reports',
        category: 'reports'
    },
    {
        id: 'pos:settings.view',
        name: 'View Settings',
        description: 'Ability to view POS settings',
        category: 'settings'
    },
    {
        id: 'pos:settings.manage',
        name: 'Manage Settings',
        description: 'Ability to modify POS settings',
        category: 'settings'
    }
]);
function getCapabilityById(id) {
    return exports.POS_CAPABILITIES.find(cap => cap.id === id);
}
function getCapabilitiesByCategory(category) {
    return exports.POS_CAPABILITIES.filter(cap => cap.category === category);
}
function getAllCapabilityIds() {
    return exports.POS_CAPABILITIES.map(cap => cap.id);
}
//# sourceMappingURL=capabilities.js.map