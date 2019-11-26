import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';

@Component({
  styleUrl: 'gux-disclosure-button.less',
  tag: 'gux-disclosure-button'
})
export class GuxDisclosureButton {
  /**
   * Indicates the position of the button panel (right or left)
   */
  @Prop()
  position: string = 'left';

  /**
   * Indicates the label for the disclosure button
   */
  @Prop()
  label: string = 'open';

  /**
   * Denotes state of discloseure panel
   */
  @State()
  isPanelActive: boolean = false;

  /**
   * Indicated image used by button
   */
  @State()
  buttonImg: string = 'genesys-icon-expand-right';

  /**
   * Return the state of the components panel on state chenge
   * @return the panel state
   */
  @Event()
  active: EventEmitter;
  changeState() {
    this.togglePanel();
    this.active.emit(this.isPanelActive);
  }

  togglePanel() {
    this.isPanelActive = !this.isPanelActive;
    this.setButtonImg();
  }

  setButtonImg() {
    if (this.position === 'right') {
      this.buttonImg = this.isPanelActive
        ? 'genesys-icon-expand-right'
        : 'genesys-icon-expand-left';
    } else {
      this.buttonImg = this.isPanelActive
        ? 'genesys-icon-expand-left'
        : 'genesys-icon-expand-right';
    }
  }

  componentDidLoad() {
    this.setButtonImg();
  }

  render() {
    const activeClass = this.isPanelActive ? 'active' : '';
    return (
      <div class={`disclosure-button-container ${this.position}`}>
        <button
          class={`disclosure-button ${this.buttonImg}`}
          aria-label={this.label}
          onClick={() => this.changeState()}
        />
        <div class={`disclosure-panel ${this.position} ${activeClass}`}>
          <slot name="panel-content" />
        </div>
      </div>
    );
  }
}