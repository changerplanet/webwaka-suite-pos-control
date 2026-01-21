"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POS_FEATURE_FLAGS = void 0;
exports.getFeatureFlagById = getFeatureFlagById;
exports.getDefaultFeatureFlagValues = getDefaultFeatureFlagValues;
exports.getAllFeatureFlagIds = getAllFeatureFlagIds;
exports.POS_FEATURE_FLAGS = Object.freeze([
    {
        id: 'pos-enabled',
        name: 'POS Enabled',
        description: 'Master switch to enable/disable POS module',
        defaultValue: true
    },
    {
        id: 'pos-offline-sales',
        name: 'Offline Sales',
        description: 'Enable offline sales processing capability',
        defaultValue: false
    },
    {
        id: 'pos-cash-rounding',
        name: 'Cash Rounding',
        description: 'Enable cash rounding for transactions',
        defaultValue: false
    },
    {
        id: 'pos-nigeria-vat',
        name: 'Nigeria VAT',
        description: 'Enable Nigeria-specific VAT handling',
        defaultValue: false
    },
    {
        id: 'pos-quick-sale',
        name: 'Quick Sale Mode',
        description: 'Enable quick sale mode for faster checkout',
        defaultValue: true
    },
    {
        id: 'pos-barcode-scanning',
        name: 'Barcode Scanning',
        description: 'Enable barcode scanning functionality',
        defaultValue: true
    },
    {
        id: 'pos-receipt-printing',
        name: 'Receipt Printing',
        description: 'Enable receipt printing functionality',
        defaultValue: true
    },
    {
        id: 'pos-split-payments',
        name: 'Split Payments',
        description: 'Allow splitting payments across multiple methods',
        defaultValue: false
    },
    {
        id: 'pos-customer-display',
        name: 'Customer Display',
        description: 'Enable customer-facing display support',
        defaultValue: false
    },
    {
        id: 'pos-inventory-alerts',
        name: 'Inventory Alerts',
        description: 'Show low inventory alerts during sales',
        defaultValue: true
    }
]);
function getFeatureFlagById(id) {
    return exports.POS_FEATURE_FLAGS.find(flag => flag.id === id);
}
function getDefaultFeatureFlagValues() {
    return exports.POS_FEATURE_FLAGS.reduce((acc, flag) => {
        acc[flag.id] = flag.defaultValue;
        return acc;
    }, {});
}
function getAllFeatureFlagIds() {
    return exports.POS_FEATURE_FLAGS.map(flag => flag.id);
}
//# sourceMappingURL=featureFlags.js.map