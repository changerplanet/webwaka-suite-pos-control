# Module Contract: webwaka-suite-pos-control

## Overview

This document defines the API surface and integration contract for webwaka-suite-pos-control.

The POS Suite Control Layer is a pure, headless, deterministic library that defines POS-specific capabilities, entitlements, feature flags, and dashboard declarations.

## Architectural Constraints

- **No Business Logic**: This module contains only data declarations
- **No UI Rendering**: Dashboard sections are declarative only
- **No Environment Access**: Pure, side-effect-free functions
- **Deterministic**: Same input always produces same output
- **JSON-Serializable**: All structures can be serialized to JSON

## Exports

### Capabilities (`src/capabilities.ts`)

| Capability ID | Name | Category | Description |
|--------------|------|----------|-------------|
| `pos:sale.create` | Create Sale | sales | Ability to create new sales transactions |
| `pos:sale.view` | View Sales | sales | Ability to view sales transactions |
| `pos:sale.refund` | Process Refund | sales | Ability to process refunds for sales |
| `pos:sale.void` | Void Sale | sales | Ability to void sales transactions |
| `pos:shift.open` | Open Shift | shifts | Ability to open a cashier shift |
| `pos:shift.close` | Close Shift | shifts | Ability to close a cashier shift |
| `pos:shift.view` | View Shifts | shifts | Ability to view shift history |
| `pos:inventory.view` | View Inventory | inventory | Ability to view inventory levels |
| `pos:inventory.adjust` | Adjust Inventory | inventory | Ability to make inventory adjustments |
| `pos:reports.view` | View Reports | reports | Ability to view POS reports |
| `pos:reports.export` | Export Reports | reports | Ability to export POS reports |
| `pos:settings.view` | View Settings | settings | Ability to view POS settings |
| `pos:settings.manage` | Manage Settings | settings | Ability to modify POS settings |

**Functions:**
- `getCapabilityById(id: string): Capability | undefined`
- `getCapabilitiesByCategory(category: string): readonly Capability[]`
- `getAllCapabilityIds(): readonly string[]`

### Entitlements (`src/entitlements.ts`)

| Entitlement ID | Name | Required Capabilities |
|---------------|------|----------------------|
| `pos-access` | POS Access | `pos:sale.view`, `pos:shift.view` |
| `pos-cashier` | POS Cashier | `pos:sale.create`, `pos:sale.view`, `pos:shift.open`, `pos:shift.close` |
| `pos-supervisor` | POS Supervisor | `pos:sale.refund`, `pos:sale.void`, `pos:inventory.view` |
| `pos-offline-enabled` | Offline Mode | `pos:sale.create` |
| `pos-multi-location` | Multi-Location | `pos:shift.view`, `pos:inventory.view` |
| `pos-advanced-reports` | Advanced Reports | `pos:reports.view`, `pos:reports.export` |
| `pos-inventory-management` | Inventory Management | `pos:inventory.view`, `pos:inventory.adjust` |
| `pos-admin` | POS Admin | `pos:settings.view`, `pos:settings.manage` |

**Functions:**
- `getEntitlementById(id: string): Entitlement | undefined`
- `getEntitlementsByCapability(capabilityId: string): readonly Entitlement[]`
- `getAllEntitlementIds(): readonly string[]`

### Feature Flags (`src/featureFlags.ts`)

| Flag ID | Name | Default | Description |
|---------|------|---------|-------------|
| `pos-enabled` | POS Enabled | `true` | Master switch to enable/disable POS module |
| `pos-offline-sales` | Offline Sales | `false` | Enable offline sales processing |
| `pos-cash-rounding` | Cash Rounding | `false` | Enable cash rounding for transactions |
| `pos-nigeria-vat` | Nigeria VAT | `false` | Enable Nigeria-specific VAT handling |
| `pos-quick-sale` | Quick Sale Mode | `true` | Enable quick sale mode for faster checkout |
| `pos-barcode-scanning` | Barcode Scanning | `true` | Enable barcode scanning functionality |
| `pos-receipt-printing` | Receipt Printing | `true` | Enable receipt printing functionality |
| `pos-split-payments` | Split Payments | `false` | Allow splitting payments across methods |
| `pos-customer-display` | Customer Display | `false` | Enable customer-facing display support |
| `pos-inventory-alerts` | Inventory Alerts | `true` | Show low inventory alerts during sales |

**Functions:**
- `getFeatureFlagById(id: string): FeatureFlag | undefined`
- `getDefaultFeatureFlagValues(): Record<string, boolean>`
- `getAllFeatureFlagIds(): readonly string[]`

### Dashboard Declaration (`src/dashboard/pos.dashboard.ts`)

| Section ID | Name | Order | Required Permissions | Required Entitlements | Required Feature Flags |
|-----------|------|-------|---------------------|----------------------|----------------------|
| `pos-sales` | Sales | 1 | `pos:sale.view` | `pos-access` | `pos-enabled` |
| `pos-shifts` | Shifts | 2 | `pos:shift.view` | `pos-access` | `pos-enabled` |
| `pos-inventory` | Inventory | 3 | `pos:inventory.view` | `pos-inventory-management` | `pos-enabled` |
| `pos-reports` | Reports | 4 | `pos:reports.view` | `pos-advanced-reports` | `pos-enabled` |
| `pos-settings` | Settings | 5 | `pos:settings.view` | `pos-admin` | `pos-enabled` |

**Functions:**
- `resolveVisibleSections(context: TenantContext): readonly VisibleSection[]`
- `getDashboardDeclaration(): DashboardDeclaration`
- `getSectionById(sectionId: string): DashboardSection | undefined`

## Imports

This module is designed to be consumed by:
- Core Entitlements Engine
- Core Feature Flags Engine
- Phase 4A Dashboard Control Engine

## Events

This module does not emit events. It is a pure data declaration module.

## Integration Points

### With Core Entitlements Engine
- Entitlement definitions are designed to be registered with the Core Entitlements system
- No evaluation logic is included; evaluation is delegated to Core

### With Core Feature Flags Engine
- Feature flag definitions are compatible with Core Feature Flags format
- Default values can be retrieved via `getDefaultFeatureFlagValues()`

### With Phase 4A Dashboard Control Engine
- Dashboard visibility resolution is delegated to the Phase 4A engine
- `resolveVisibleSections()` demonstrates the gating logic pattern

## Type Definitions

All types are exported from `src/types.ts`:
- `Capability`
- `Entitlement`
- `FeatureFlag`
- `DashboardSection`
- `DashboardSectionGating`
- `DashboardDeclaration`
- `TenantContext`
- `VisibleSection`
