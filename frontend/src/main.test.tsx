import { describe, it } from 'vitest';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import React from 'react';
// ensure jsdom has a root element
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

describe('main entrypoint', () => {
  it('mounts the application without crashing', async () => {
    await act(async () => {
      await import('./main');
    });
    // allow any microtasks to flush
    await Promise.resolve();
    expect(document.body.textContent).toMatch(/DragDropDeploy/);
  });
});
