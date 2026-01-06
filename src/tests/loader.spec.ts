import { describe, it, expect } from 'vitest';
import { Templates } from '@/features/email/templates/loader';

describe('Templates Loader', () => {
  it('should load all templates', () => {
    const all = Templates.all();
    expect(all).toBeDefined();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
  });

  it('should get template by id', () => {
    const tpl = Templates.get('ot-record-initiation');
    expect(tpl).toBeDefined();
    expect(tpl.id).toBe('ot-record-initiation');
    expect(tpl.subject).toBeDefined();
    expect(tpl.body).toBeDefined();
  });

  it('should throw error for non-existent template', () => {
    expect(() => Templates.get('non-existent')).toThrow('Template not found');
  });

  it('should have valid template structure', () => {
    const tpl = Templates.get('ot-record-initiation');
    expect(tpl).toHaveProperty('id');
    expect(tpl).toHaveProperty('displayName');
    expect(tpl).toHaveProperty('subject');
    expect(tpl).toHaveProperty('body');
    expect(tpl).toHaveProperty('placeholders');
    expect(Array.isArray(tpl.placeholders)).toBe(true);
  });
});
