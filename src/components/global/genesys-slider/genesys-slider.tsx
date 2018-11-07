import { Event, EventEmitter, Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'genesys-slider',
  styleUrl: 'genesys-slider.less'
})
export class GenesysSlider {
  /**
   * Indicates the minimum value for the slider
   **/
  @Prop() min: number = 0;
  /**
   * Indicates the maximum value for the slider
   **/
  @Prop() max: number = 100;
  /**
   * Indocates the value of the slider
   **/
  @Prop({ mutable: true, reflectToAttr: true }) value: number;
  /**
   * Indicate if the input box
   **/
  @Prop() displayTextBox: boolean = false;

  @State() placement: {};

  sliderInput: HTMLInputElement;
  sliderTooltip: HTMLElement;

  /**
   * Triggered when the value is changed
   * @return the current value
   */
  @Event() update: EventEmitter;

  updateValue (event) {
    const newValue = event.target.valueAsNumber;
    const upToDate = this.value === newValue;
    this.value = newValue;
    if (!upToDate) {
      this.update.emit(this.value);
      this.updateTooltipPosition();
    }
  }

  /**
   * Once the component is loaded do the setup
   */
  componentDidLoad () {
    this.updateTooltipPosition();
  }

  updateTooltipPosition() {
    const width = this.sliderInput.offsetWidth;
    const placementPercentage = (this.sliderInput.valueAsNumber - this.min)/(this.max - this.min);
    const newPlacement = width * placementPercentage;
    this.sliderTooltip.style.left = String(newPlacement) + 'px';
  }

  render() {
    return (<div>
      <input
        type="range"
        min={this.min}
        max={this.max}
        value={this.value}
        aria-describedby="range-tooltip"
        ref={el => this.sliderInput = el}
        onChange={(e: UIEvent) => this.updateValue(e)}>
      </input>
      {this.displayTextBox ? (
        <input
          type="text"
          value={this.value}
          onChange={(e: UIEvent) => this.updateValue(e)}>
        </input>
      ) : (
        <div
          id="range-tooltip"
          class="range-tooltip"
          role="tooltip"
          ref={el => this.sliderTooltip = el}>
          {this.value}
        </div>
        )}
    </div>);
  }
}
