import { newSpecPage } from '@stencil/core/testing';
import { RevoDropdownList } from '../list/revo-list';
import { RevoDropdown } from './revo-dropdown';

describe('revo-dropdown filtering', () => {
  const source = ['Northstar', 'Acme', 'Globex', 'Initech', 'Umbrella'];

  afterEach(() => jest.restoreAllMocks());

  it('keeps the portaled panel mounted while the filter changes', async () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
    const page = await newSpecPage({
      components: [RevoDropdown, RevoDropdownList],
      html: '<revo-dropdown></revo-dropdown>',
    });
    const dropdown = page.root as HTMLRevoDropdownElement;
    dropdown.source = source;

    await dropdown.doOpen();
    await page.waitForChanges();

    const panel = page.doc.body.querySelector('.revo-dropdown-list');
    const input = panel?.querySelector<HTMLInputElement>('input.filter-box');
    expect(panel).not.toBeNull();
    expect(input).not.toBeNull();

    for (const value of ['u', 'um', 'umb']) {
      input!.value = value;
      input!.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      await Promise.resolve();
      await page.waitForChanges();

      expect(page.doc.body.querySelector('.revo-dropdown-list') === panel).toBe(true);
      expect(panel?.querySelector('input.filter-box') === input).toBe(true);
    }

    const currentPanel = page.doc.body.querySelector('.revo-dropdown-list');
    const currentInput = currentPanel?.querySelector('input.filter-box');
    expect(dropdown.currentFilter).toBe('umb');
    expect(currentPanel === panel).toBe(true);
    expect(currentInput === input).toBe(true);
    expect(panel?.textContent).toContain('Umbrella');
    expect(panel?.textContent).not.toContain('Northstar');
    expect(consoleWarn).not.toHaveBeenCalled();
  });

  it('keeps autocomplete stable while filtering', async () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
    const page = await newSpecPage({
      components: [RevoDropdown, RevoDropdownList],
      html: '<revo-dropdown autocomplete="true"></revo-dropdown>',
    });
    const dropdown = page.root as HTMLRevoDropdownElement;
    dropdown.source = source;

    await dropdown.doOpen();
    await page.waitForChanges();

    const panel = page.doc.body.querySelector('.revo-dropdown-list');
    const input = dropdown.querySelector<HTMLInputElement>('input.filter-box');
    expect(panel).not.toBeNull();
    expect(input).not.toBeNull();

    for (const value of ['g', 'gl', 'glo']) {
      input!.value = value;
      input!.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      await Promise.resolve();
      await page.waitForChanges();

      expect(dropdown.querySelector('input.filter-box') === input).toBe(true);
      expect(page.doc.body.querySelector('.revo-dropdown-list') === panel).toBe(true);
      expect(dropdown.classList.contains('active')).toBe(true);
    }

    expect(dropdown.currentFilter).toBe('glo');
    expect(panel?.textContent).toContain('Globex');
    expect(panel?.textContent).not.toContain('Acme');
    expect(consoleWarn).not.toHaveBeenCalled();
  });

  it('applies and clears an external currentFilter update', async () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
    const page = await newSpecPage({
      components: [RevoDropdown, RevoDropdownList],
      html: '<revo-dropdown></revo-dropdown>',
    });
    const dropdown = page.root as HTMLRevoDropdownElement;
    dropdown.source = source;
    dropdown.currentFilter = 'ac';

    await dropdown.doOpen();
    await page.waitForChanges();

    let panel = page.doc.body.querySelector('.revo-dropdown-list');
    let input = panel?.querySelector<HTMLInputElement>('input.filter-box');
    expect(input?.value).toBe('ac');
    expect(panel?.textContent).toContain('Acme');
    expect(panel?.textContent).not.toContain('Globex');

    dropdown.currentFilter = 'glob';
    await Promise.resolve();
    await page.waitForChanges();

    panel = page.doc.body.querySelector('.revo-dropdown-list');
    input = panel?.querySelector<HTMLInputElement>('input.filter-box');
    expect(input?.value).toBe('glob');
    expect(panel?.textContent).toContain('Globex');
    expect(panel?.textContent).not.toContain('Acme');

    dropdown.currentFilter = '';
    await Promise.resolve();
    await page.waitForChanges();

    panel = page.doc.body.querySelector('.revo-dropdown-list');
    input = panel?.querySelector<HTMLInputElement>('input.filter-box');
    expect(input?.value).toBe('');
    for (const item of source) {
      expect(panel?.textContent).toContain(item);
    }
    expect(consoleWarn).not.toHaveBeenCalled();
  });
});
