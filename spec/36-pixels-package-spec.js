'use babel';

import 36PixelsPackage from '../lib/36-pixels-package';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('36PixelsPackage', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('36-pixels-package');
  });

  describe('when the 36-pixels-package:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.36-pixels-package')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, '36-pixels-package:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.36-pixels-package')).toExist();

        let 36PixelsPackageElement = workspaceElement.querySelector('.36-pixels-package');
        expect(36PixelsPackageElement).toExist();

        let 36PixelsPackagePanel = atom.workspace.panelForItem(36PixelsPackageElement);
        expect(36PixelsPackagePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, '36-pixels-package:toggle');
        expect(36PixelsPackagePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.36-pixels-package')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, '36-pixels-package:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let 36PixelsPackageElement = workspaceElement.querySelector('.36-pixels-package');
        expect(36PixelsPackageElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, '36-pixels-package:toggle');
        expect(36PixelsPackageElement).not.toBeVisible();
      });
    });
  });
});
