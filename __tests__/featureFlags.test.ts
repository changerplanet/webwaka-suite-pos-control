import {
  POS_FEATURE_FLAGS,
  getFeatureFlagById,
  getDefaultFeatureFlagValues,
  getAllFeatureFlagIds
} from '../src/featureFlags';

describe('POS Feature Flags', () => {
  describe('POS_FEATURE_FLAGS', () => {
    it('should be frozen and immutable', () => {
      expect(Object.isFrozen(POS_FEATURE_FLAGS)).toBe(true);
    });

    it('should contain required feature flags', () => {
      const ids = POS_FEATURE_FLAGS.map(f => f.id);
      expect(ids).toContain('pos-enabled');
      expect(ids).toContain('pos-offline-sales');
      expect(ids).toContain('pos-cash-rounding');
      expect(ids).toContain('pos-nigeria-vat');
    });

    it('should have unique feature flag IDs', () => {
      const ids = POS_FEATURE_FLAGS.map(f => f.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have all required properties for each flag', () => {
      POS_FEATURE_FLAGS.forEach(flag => {
        expect(flag).toHaveProperty('id');
        expect(flag).toHaveProperty('name');
        expect(flag).toHaveProperty('description');
        expect(flag).toHaveProperty('defaultValue');
        expect(typeof flag.id).toBe('string');
        expect(typeof flag.name).toBe('string');
        expect(typeof flag.description).toBe('string');
        expect(typeof flag.defaultValue).toBe('boolean');
      });
    });

    it('should contain only data without experimentation logic', () => {
      POS_FEATURE_FLAGS.forEach(flag => {
        const keys = Object.keys(flag);
        expect(keys).toEqual(['id', 'name', 'description', 'defaultValue']);
      });
    });
  });

  describe('getFeatureFlagById', () => {
    it('should return feature flag when found', () => {
      const flag = getFeatureFlagById('pos-enabled');
      expect(flag).toBeDefined();
      expect(flag?.id).toBe('pos-enabled');
      expect(flag?.defaultValue).toBe(true);
    });

    it('should return undefined for non-existent flag', () => {
      const flag = getFeatureFlagById('pos-nonexistent');
      expect(flag).toBeUndefined();
    });
  });

  describe('getDefaultFeatureFlagValues', () => {
    it('should return all default values as key-value pairs', () => {
      const defaults = getDefaultFeatureFlagValues();
      expect(typeof defaults).toBe('object');
      expect(Object.keys(defaults).length).toBe(POS_FEATURE_FLAGS.length);
    });

    it('should have correct default values', () => {
      const defaults = getDefaultFeatureFlagValues();
      expect(defaults['pos-enabled']).toBe(true);
      expect(defaults['pos-offline-sales']).toBe(false);
      expect(defaults['pos-cash-rounding']).toBe(false);
    });

    it('should be compatible with Core engine format', () => {
      const defaults = getDefaultFeatureFlagValues();
      Object.entries(defaults).forEach(([key, value]) => {
        expect(typeof key).toBe('string');
        expect(typeof value).toBe('boolean');
      });
    });
  });

  describe('getAllFeatureFlagIds', () => {
    it('should return all feature flag IDs', () => {
      const ids = getAllFeatureFlagIds();
      expect(ids.length).toBe(POS_FEATURE_FLAGS.length);
      expect(ids).toContain('pos-enabled');
      expect(ids).toContain('pos-offline-sales');
    });
  });

  describe('Determinism', () => {
    it('should return identical results across 10 repeated calls', () => {
      const results: Record<string, boolean>[] = [];
      for (let i = 0; i < 10; i++) {
        results.push(getDefaultFeatureFlagValues());
      }
      
      for (let i = 1; i < 10; i++) {
        expect(results[i]).toEqual(results[0]);
      }
    });
  });
});
