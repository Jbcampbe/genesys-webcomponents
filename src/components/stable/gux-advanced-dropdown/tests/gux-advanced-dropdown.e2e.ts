import { newE2EPage } from '@stencil/core/testing';

describe('gux-advanced-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-advanced-dropdown lang="en"></gux-advanced-dropdown>'
    );
    const element = await page.find('gux-advanced-dropdown');
    expect(element).toHaveClass('hydrated');
  });

  it('opens drop down on click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <gux-advanced-dropdown lang="en">
        <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
        <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
      </gux-advanced-dropdown>
    `);
    await page.waitForChanges();

    const inputElm = await page.find(
      'gux-advanced-dropdown >>> .gux-select-input'
    );
    inputElm.click();
    await page.waitForChanges();

    const dropMenuElm = await page.find(
      'gux-advanced-dropdown >>> .gux-advanced-dropdown-menu'
    );
    expect(dropMenuElm.className.split(' ')).toContain('gux-opened');
  });

  it('selects an item when an option is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <gux-advanced-dropdown lang="en">
        <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
        <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
      </gux-advanced-dropdown>
    `);
    await page.waitForChanges();

    const element = await page.find('gux-advanced-dropdown');
    const inputSpy = await element.spyOnEvent('input');

    const inputElm = await page.find(
      'gux-advanced-dropdown >>> .gux-select-input'
    );
    inputElm.click();
    await page.waitForChanges();

    let dropMenuElm = await page.find(
      'gux-advanced-dropdown >>> .gux-advanced-dropdown-menu'
    );
    const enElm = await element.find('gux-dropdown-option');
    enElm.click();
    await page.waitForChanges();
    dropMenuElm = await page.find(
      'gux-advanced-dropdown >>> .gux-advanced-dropdown-menu'
    );

    expect(inputSpy).toHaveReceivedEventDetail('en');
    expect(dropMenuElm.className.split(' ')).not.toContain('gux-opened');
  });

  it('Should fire filter event with a delay', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <gux-advanced-dropdown lang="en" filter-debounce-timeout="100">
      <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
      <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
    </gux-advanced-dropdown>
  `);
    await page.waitForChanges();

    const element = await page.find('gux-advanced-dropdown');
    const filterSpy = await element.spyOnEvent('filter');

    const inputElm = await page.find(
      'gux-advanced-dropdown >>> .gux-select-input'
    );
    inputElm.click();
    await page.waitForChanges();

    const guxSearch = await page.find(
      'gux-advanced-dropdown >>> gux-search-beta'
    );
    guxSearch.setProperty('value', 'en');
    await page.waitForChanges();

    await page.waitFor(200);

    expect(filterSpy).toHaveReceivedEventDetail('en');
  });

  it('should not filter if filterLocal is false', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <gux-advanced-dropdown lang="en" filter-debounce-timeout="0" no-filter>
        <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
        <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
      </gux-advanced-dropdown>
    `);
    await page.waitForChanges();

    const element = await page.find('gux-advanced-dropdown');
    const filterSpy = await element.spyOnEvent('filter');

    const inputElm = await page.find(
      'gux-advanced-dropdown >>> .gux-select-input'
    );
    inputElm.click();
    await page.waitForChanges();

    const guxSearch = await page.find(
      'gux-advanced-dropdown >>> gux-search-beta'
    );
    guxSearch.setProperty('value', 'en');
    await page.waitForChanges();

    const items = await element.findAll('gux-dropdown-option');

    expect(items).toHaveLength(2);
    expect(filterSpy).toHaveReceivedEventDetail('en');
  });

  it('should allow options to be dynamically rendered', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <gux-advanced-dropdown lang="en" filter-debounce-timeout="0" no-filter>
        <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
        <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
      </gux-advanced-dropdown>
    `);
    await page.waitForChanges();

    await page.evaluate(() => {
      const element = document.querySelector('gux-advanced-dropdown');
      const option = document.querySelector('gux-dropdown-option');

      element.removeChild(option);
      element.appendChild(option);
    });
    await page.waitForChanges();

    const items = await page.findAll(
      'gux-advanced-dropdown > gux-dropdown-option'
    );

    expect(items).toHaveLength(2);
  });
});
