import "@polymer/paper-slider";
import {
  showErrorNotification,
  showNotification,
} from "@vaadin/flow-frontend/a-notification";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-lumo-styles/all-imports";
import "@vaadin/vaadin-ordered-layout";
import "@vaadin/vaadin-radio-button";
import "@vaadin/vaadin-radio-button/vaadin-radio-group";
import { customElement, html, LitElement, property } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import { cache } from "./cache";
import Options from "./generated/com/example/app/endpoint/Options";
import Rate from "./generated/com/example/app/endpoint/Rate";
import * as RateEndpoint from "./generated/RateEndpoint";
import "./slider-field";
import { formatCurrency, formatPct } from "./util";

@customElement("main-view")
export class MainView extends LitElement {
  @property({ type: Array })
  rates: Rate[] = [];
  @property({ type: Number })
  inflationRate: number = 1.9;

  @property({ type: Number })
  minLoan = 100000;
  @property({ type: Number })
  maxLoan = 2000000;
  @property({ type: Number })
  minPaybackTime = 10;
  @property({ type: Number })
  maxPaybackTime = 30;
  @property({ type: Number })
  trueInterestRate: number = 0;

  @property({ type: Object })
  selectedOptions: Options = {
    amount: this.minLoan * 2,
    paybackTimeMonths: this.minPaybackTime * 12,
    rate: { name: "", rate: 0, margin: 0, defaultRate: false }
  };
  @property({ type: Boolean })
  online: boolean = true;

  createRenderRoot() {
    return this;
  }

  get total() {
    return this.monthlyPayment * this.selectedOptions.paybackTimeMonths;
  }
  get monthlyRate() {
    return (
      (this.selectedOptions.rate.rate + this.selectedOptions.rate.margin) / 12
    );
  }
  get monthlyPayment() {
    if (!this.monthlyRate) {
      return 0;
    }
    const i = this.monthlyRate / 100.0;
    const time = this.selectedOptions.paybackTimeMonths;
    const a = i * Math.pow(1 + i, time);
    const b = Math.pow(1 + i, time) - 1;
    return (this.selectedOptions.amount * a) / b;
  }
  render() {
    return html`
      <div part="label">Amount (€)</div>
      <slider-field
        @value-changed=${(e: any) => this.amountChanged(e.detail.value)}
        min=${this.minLoan}
        max=${this.maxLoan}
        value=${this.minLoan * 2}
        step=${this.minLoan}
        .formatter="${(value: number) => formatCurrency(value, 0)}"
      >
      </slider-field>
      <div part="label">Payback time (years)</div>
      <slider-field
        @value-changed=${(e: any) => this.paybackTimeChanged(e.detail.value)}
        value="${this.minPaybackTime}"
        min="${this.minPaybackTime}"
        max="${this.maxPaybackTime}"
        .formatter="${(value: number) => value}"
      ></slider-field>
      <vaadin-radio-group
        label="Rate"
        @value-changed=${(e: any) => this.rateSelected(e.detail.value)}
      >
        ${repeat(
          this.rates,
          rate => rate.name,
          rate => html`
            <vaadin-radio-button .value=${rate} ?checked=${rate.defaultRate}
              >${rate.name}
              (${formatPct(rate.rate + rate.margin)})</vaadin-radio-button
            >
          `
        )}
      </vaadin-radio-group>

      <div part="label">Monthly payment</div>
      <p>${formatCurrency(this.monthlyPayment, 2)} / month</p>
      <vaadin-button ?disabled="${!this.online}" @click="${() => this.apply()}"
        >Apply!</vaadin-button
      >
      ${!this.online
        ? html`
            <div>You need to be online to apply</div>
          `
        : ``}
    `;
  }
  amountChanged(value: number) {
    this.selectedOptions.amount = value;
    this.requestUpdate("selectedOptions");
  }
  paybackTimeChanged(value: number) {
    this.selectedOptions.paybackTimeMonths = value * 12;
    this.requestUpdate("selectedOptions");
  }
  rateSelected(rate: Rate) {
    this.selectedOptions.rate = rate;
    this.requestUpdate("selectedOptions");
  }

  async connectedCallback() {
    super.connectedCallback();
    this.online = navigator.onLine;
    window.addEventListener("online", () => (this.online = true));
    window.addEventListener("offline", () => (this.online = false));

    if (this.online) {
      this.rates = await RateEndpoint.getRates();
      cache.put("rates", this.rates);
    } else {
      this.rates = cache.get("rates");
    }
  }

  async apply() {
    const result = await RateEndpoint.apply("John Doe", this.selectedOptions);
    if (result.approved) {
      showNotification("Your application was approved!\n" + result.message);
    } else {
      showErrorNotification(
        "Sorry, your application was denied.\n" + result.message
      );
    }
  }
}
