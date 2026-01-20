import {
  POS_ENTITLEMENTS,
  getEntitlementById,
  getEntitlementsByCapability,
  getAllEntitlementIds
} from '../src/entitlements';

describe('POS Entitlements', () => {
  describe('POS_ENTITLEMENTS', () => {
    it('should be frozen and immutable', () => {
      expect(Object.isFrozen(POS_ENTITLEMENTS)).toBe(true);
    });

    it('should contain required entitlements', () => {
      const ids = POS_ENTITLEMENTS.map(e => e.id);
      expect(ids).toContain('pos-access');
      expect(ids).toContain('pos-offline-enabled');
      expect(ids).toContain('pos-multi-location');
      expect(ids).toContain('pos-advanced-reports');
    });

    it('should have unique entitlement IDs', () => {
      const ids = POS_ENTITLEMENTS.map(e => e.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have all required properties for each entitlement', () => {
      POS_ENTITLEMENTS.forEach(ent => {
        expect(ent).toHaveProperty('id');
        expect(ent).toHaveProperty('name');
        expect(ent).toHaveProperty('description');
        expect(ent).toHaveProperty('requiredCapabilities');
        expect(typeof ent.id).toBe('string');
        expect(typeof ent.name).toBe('string');
        expect(typeof ent.description).toBe('string');
        expect(Array.isArray(ent.requiredCapabilities)).toBe(true);
      });
    });

    it('should contain only data definitions without logic', () => {
      POS_ENTITLEMENTS.forEach(ent => {
        expect(typeof ent.id).toBe('string');
        expect(typeof ent.name).toBe('string');
        expect(typeof ent.description).toBe('string');
        ent.requiredCapabilities.forEach(cap => {
          expect(typeof cap).toBe('string');
        });
      });
    });
  });

  describe('getEntitlementById', () => {
    it('should return entitlement when found', () => {
      const ent = getEntitlementById('pos-access');
      expect(ent).toBeDefined();
      expect(ent?.id).toBe('pos-access');
      expect(ent?.name).toBe('POS Access');
    });

    it('should return undefined for non-existent entitlement', () => {
      const ent = getEntitlementById('pos-nonexistent');
      expect(ent).toBeUndefined();
    });
  });

  describe('getEntitlementsByCapability', () => {
    it('should return entitlements that require a specific capability', () => {
      const ents = getEntitlementsByCapability('pos:sale.create');
      expect(ents.length).toBeGreaterThan(0);
      ents.forEach(ent => {
        expect(ent.requiredCapabilities).toContain('pos:sale.create');
      });
    });

    it('should return empty array for non-existent capability', () => {
      const ents = getEntitlementsByCapability('nonexistent:capability');
      expect(ents).toEqual([]);
    });
  });

  describe('getAllEntitlementIds', () => {
    it('should return all entitlement IDs', () => {
      const ids = getAllEntitlementIds();
      expect(ids.length).toBe(POS_ENTITLEMENTS.length);
      expect(ids).toContain('pos-access');
      expect(ids).toContain('pos-admin');
    });
  });

  describe('Determinism', () => {
    it('should return identical results across 10 repeated calls', () => {
      const results: string[][] = [];
      for (let i = 0; i < 10; i++) {
        results.push([...getAllEntitlementIds()]);
      }
      
      for (let i = 1; i < 10; i++) {
        expect(results[i]).toEqual(results[0]);
      }
    });
  });
});
