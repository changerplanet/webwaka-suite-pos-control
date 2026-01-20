import {
  POS_CAPABILITIES,
  getCapabilityById,
  getCapabilitiesByCategory,
  getAllCapabilityIds
} from '../src/capabilities';

describe('POS Capabilities', () => {
  describe('POS_CAPABILITIES', () => {
    it('should be frozen and immutable', () => {
      expect(Object.isFrozen(POS_CAPABILITIES)).toBe(true);
    });

    it('should contain all required sales capabilities', () => {
      const salesCapabilities = POS_CAPABILITIES.filter(c => c.category === 'sales');
      expect(salesCapabilities.length).toBeGreaterThanOrEqual(3);
      
      const salesIds = salesCapabilities.map(c => c.id);
      expect(salesIds).toContain('pos:sale.create');
      expect(salesIds).toContain('pos:sale.refund');
      expect(salesIds).toContain('pos:sale.view');
    });

    it('should contain shift management capabilities', () => {
      const shiftCapabilities = POS_CAPABILITIES.filter(c => c.category === 'shifts');
      expect(shiftCapabilities.length).toBeGreaterThanOrEqual(2);
      
      const shiftIds = shiftCapabilities.map(c => c.id);
      expect(shiftIds).toContain('pos:shift.open');
      expect(shiftIds).toContain('pos:shift.close');
    });

    it('should contain inventory capabilities', () => {
      const invCapabilities = POS_CAPABILITIES.filter(c => c.category === 'inventory');
      expect(invCapabilities.length).toBeGreaterThanOrEqual(1);
      expect(invCapabilities.map(c => c.id)).toContain('pos:inventory.view');
    });

    it('should contain reports capabilities', () => {
      const reportCapabilities = POS_CAPABILITIES.filter(c => c.category === 'reports');
      expect(reportCapabilities.length).toBeGreaterThanOrEqual(1);
      expect(reportCapabilities.map(c => c.id)).toContain('pos:reports.view');
    });

    it('should have unique capability IDs', () => {
      const ids = POS_CAPABILITIES.map(c => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have all required properties for each capability', () => {
      POS_CAPABILITIES.forEach(cap => {
        expect(cap).toHaveProperty('id');
        expect(cap).toHaveProperty('name');
        expect(cap).toHaveProperty('description');
        expect(cap).toHaveProperty('category');
        expect(typeof cap.id).toBe('string');
        expect(typeof cap.name).toBe('string');
        expect(typeof cap.description).toBe('string');
        expect(typeof cap.category).toBe('string');
      });
    });
  });

  describe('getCapabilityById', () => {
    it('should return capability when found', () => {
      const cap = getCapabilityById('pos:sale.create');
      expect(cap).toBeDefined();
      expect(cap?.id).toBe('pos:sale.create');
      expect(cap?.name).toBe('Create Sale');
    });

    it('should return undefined for non-existent capability', () => {
      const cap = getCapabilityById('pos:non.existent');
      expect(cap).toBeUndefined();
    });
  });

  describe('getCapabilitiesByCategory', () => {
    it('should return all capabilities for a category', () => {
      const salesCaps = getCapabilitiesByCategory('sales');
      expect(salesCaps.length).toBeGreaterThan(0);
      salesCaps.forEach(cap => {
        expect(cap.category).toBe('sales');
      });
    });

    it('should return empty array for non-existent category', () => {
      const caps = getCapabilitiesByCategory('nonexistent');
      expect(caps).toEqual([]);
    });
  });

  describe('getAllCapabilityIds', () => {
    it('should return all capability IDs', () => {
      const ids = getAllCapabilityIds();
      expect(ids.length).toBe(POS_CAPABILITIES.length);
      expect(ids).toContain('pos:sale.create');
      expect(ids).toContain('pos:shift.open');
    });
  });

  describe('Determinism', () => {
    it('should return identical results across 10 repeated calls', () => {
      const results: string[][] = [];
      for (let i = 0; i < 10; i++) {
        results.push([...getAllCapabilityIds()]);
      }
      
      for (let i = 1; i < 10; i++) {
        expect(results[i]).toEqual(results[0]);
      }
    });
  });
});
