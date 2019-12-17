import { css, customElement, html, LitElement, property } from "lit-element";
import "@polymer/paper-slider";
import "@vaadin/vaadin-text-field";

@customElement("slider-field")
export class SliderField extends LitElement {
  @property({ type: Number, attribute: "value" })
  _value: number = 0;
  @property({ type: Number })
  min: number = 0;
  @property({ type: Number })
  max: number = 10;
  @property({ type: Number })
  step: number = 1;
  @property({ type: Object, attribute: false })
  formatter: any;

  set value(value: number) {
    if (this._value === value) return;
    this._value = value;
    this.dispatchEvent(
      new CustomEvent("value-changed", { detail: { value: this.value } })
    );
  }
  get value() {
    return this._value;
  }

  static get styles() {
    return css`
      div {
        display: flex;
      }
      #input {
        width: 8em;
      }
    `;
  }
  render() {
    return html`
      <div>
        <paper-slider
          @immediate-value-changed=${(e: any) => this.fieldChanged(e)}
          min="${this.min}"
          max="${this.max}"
          step="${this.step}"
          value="${this.value}"
        ></paper-slider>
        <vaadin-text-field
          id="input"
          value="${this.format(this.value)}"
          readonly
        >
        </vaadin-text-field>
      </div>
    `;
  }
  fieldChanged(e: any) {
    this.value = e.detail.value;
    e.stopPropagation();
  }
  format(value: number) {
    if (this.formatter) {
      return this.formatter(value);
    } else {
      return value;
    }
  }
}
