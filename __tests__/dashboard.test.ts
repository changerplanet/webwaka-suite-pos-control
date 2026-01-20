import {
  POS_DASHBOARD_DECLARATION,
  resolveVisibleSections,
  getDashboardDeclaration,
  getSectionById
} from '../src/dashboard/pos.dashboard';
import { TenantContext } from '../src/types';

describe('POS Dashboard Declaration', () => {
  describe('POS_DASHBOARD_DECLARATION', () => {
    it('should be frozen and immutable', () => {
      expect(Object.isFrozen(POS_DASHBOARD_DECLARATION)).toBe(true);
      expect(Object.isFrozen(POS_DASHBOARD_DECLARATION.sections)).toBe(true);
    });

    it('should have correct module ID', () => {
      expect(POS_DASHBOARD_DECLARATION.moduleId).toBe('webwaka_suite_pos_control');
    });

    it('should contain all required sections', () => {
      const sectionNames = POS_DASHBOARD_DECLARATION.sections.map(s => s.name);
      expect(sectionNames).toContain('Sales');
      expect(sectionNames).toContain('Shifts');
      expect(sectionNames).toContain('Inventory');
      expect(sectionNames).toContain('Reports');
      expect(sectionNames).toContain('Settings');
    });

    it('should have gating configuration for each section', () => {
      POS_DASHBOARD_DECLARATION.sections.forEach(section => {
        expect(section.gating).toBeDefined();
        expect(Array.isArray(section.gating.requiredPermissions)).toBe(true);
        expect(Array.isArray(section.gating.requiredEntitlements)).toBe(true);
        expect(Array.isArray(section.gating.requiredFeatureFlags)).toBe(true);
      });
    });

    it('should have unique section IDs', () => {
      const ids = POS_DASHBOARD_DECLARATION.sections.map(s => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('resolveVisibleSections', () => {
    const fullAccessContext: TenantContext = {
      tenantId: 'tenant-1',
      permissions: [
        'pos:sale.view',
        'pos:shift.view',
        'pos:inventory.view',
        'pos:reports.view',
        'pos:settings.view'
      ],
      entitlements: [
        'pos-access',
        'pos-inventory-management',
        'pos-advanced-reports',
        'pos-admin'
      ],
      featureFlags: {
        'pos-enabled': true
      }
    };

    it('should show all sections when all permissions, entitlements, and flags are present', () => {
      const visible = resolveVisibleSections(fullAccessContext);
      expect(visible.length).toBe(5);
      expect(visible.map(s => s.name)).toContain('Sales');
      expect(visible.map(s => s.name)).toContain('Settings');
    });

    it('should hide sections when permissions are missing', () => {
      const context: TenantContext = {
        ...fullAccessContext,
        permissions: ['pos:sale.view', 'pos:shift.view']
      };
      const visible = resolveVisibleSections(context);
      expect(visible.map(s => s.name)).toContain('Sales');
      expect(visible.map(s => s.name)).toContain('Shifts');
      expect(visible.map(s => s.name)).not.toContain('Inventory');
      expect(visible.map(s => s.name)).not.toContain('Reports');
      expect(visible.map(s => s.name)).not.toContain('Settings');
    });

    it('should hide sections when entitlements are missing', () => {
      const context: TenantContext = {
        ...fullAccessContext,
        entitlements: ['pos-access']
      };
      const visible = resolveVisibleSections(context);
      expect(visible.map(s => s.name)).toContain('Sales');
      expect(visible.map(s => s.name)).toContain('Shifts');
      expect(visible.map(s => s.name)).not.toContain('Inventory');
      expect(visible.map(s => s.name)).not.toContain('Reports');
      expect(visible.map(s => s.name)).not.toContain('Settings');
    });

    it('should hide all sections when feature flag is disabled', () => {
      const context: TenantContext = {
        ...fullAccessContext,
        featureFlags: {
          'pos-enabled': false
        }
      };
      const visible = resolveVisibleSections(context);
      expect(visible.length).toBe(0);
    });

    it('should hide all sections when no permissions are present', () => {
      const context: TenantContext = {
        tenantId: 'tenant-1',
        permissions: [],
        entitlements: [],
        featureFlags: { 'pos-enabled': true }
      };
      const visible = resolveVisibleSections(context);
      expect(visible.length).toBe(0);
    });

    it('should return sections sorted by order', () => {
      const visible = resolveVisibleSections(fullAccessContext);
      for (let i = 1; i < visible.length; i++) {
        expect(visible[i].order).toBeGreaterThan(visible[i - 1].order);
      }
    });

    it('should be deterministic - 10 repeated evaluations produce identical output', () => {
      const results = [];
      for (let i = 0; i < 10; i++) {
        results.push(resolveVisibleSections(fullAccessContext));
      }
      
      for (let i = 1; i < 10; i++) {
        expect(results[i]).toEqual(results[0]);
      }
    });
  });

  describe('getDashboardDeclaration', () => {
    it('should return the dashboard declaration', () => {
      const decl = getDashboardDeclaration();
      expect(decl).toBe(POS_DASHBOARD_DECLARATION);
    });
  });

  describe('getSectionById', () => {
    it('should return section when found', () => {
      const section = getSectionById('pos-sales');
      expect(section).toBeDefined();
      expect(section?.name).toBe('Sales');
    });

    it('should return undefined for non-existent section', () => {
      const section = getSectionById('pos-nonexistent');
      expect(section).toBeUndefined();
    });
  });

  describe('Tenant Isolation', () => {
    it('should produce different results for different tenant contexts', () => {
      const tenant1: TenantContext = {
        tenantId: 'tenant-1',
        permissions: ['pos:sale.view'],
        entitlements: ['pos-access'],
        featureFlags: { 'pos-enabled': true }
      };
      
      const tenant2: TenantContext = {
        tenantId: 'tenant-2',
        permissions: ['pos:sale.view', 'pos:settings.view'],
        entitlements: ['pos-access', 'pos-admin'],
        featureFlags: { 'pos-enabled': true }
      };
      
      const visible1 = resolveVisibleSections(tenant1);
      const visible2 = resolveVisibleSections(tenant2);
      
      expect(visible1.length).toBeLessThan(visible2.length);
    });
  });
});
