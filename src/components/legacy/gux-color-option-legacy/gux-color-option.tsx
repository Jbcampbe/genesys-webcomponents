import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop
} from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';

@Component({
  styleUrl: 'gux-color-option.less',
  tag: 'gux-color-option-legacy'
})
export class GuxColorOptionBeta {
  @Element()
  private root: HTMLElement;

  /**
   * Indicate if the tile is active
   */
  @Prop()
  active: boolean;

  /**
   * Indicate the color of the tile, if undefined, tile will be blank and be disabled
   */
  @Prop()
  value: string;

  /**
   * Triggers when the tile is clicked
   */
  @Event()
  tileClick: EventEmitter;

  onTileClickHandler = (e: MouseEvent) => {
    this.tileClick.emit(e);
  };

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render() {
    return (
      <button
        value={this.value}
        class={this.active ? 'gux-color-option-active' : ''}
        disabled={!this.value}
        style={this.value && { 'background-color': this.value }}
        onClick={this.onTileClickHandler}
        title={this.value}
      />
    );
  }
}
