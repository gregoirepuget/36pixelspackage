'use babel';

import 36PixelsPackageView from './36-pixels-package-view';
import { CompositeDisposable } from 'atom';

export default {

  36PixelsPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.36PixelsPackageView = new 36PixelsPackageView(state.36PixelsPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.36PixelsPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      '36-pixels-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.36PixelsPackageView.destroy();
  },

  serialize() {
    return {
      36PixelsPackageViewState: this.36PixelsPackageView.serialize()
    };
  },

  toggle() {
    console.log('36PixelsPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
