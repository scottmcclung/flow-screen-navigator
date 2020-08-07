import { LightningElement, api } from "lwc";

export default class FlowScreenNavigatorButton extends LightningElement {
  @api name;
  @api label;

  @api
  get variant() {
    return this._variant || "Base";
  }

  set variant(value) {
    if (!Object.keys(this.styleClassMap).includes(value)) return;
    this._variant = value;
  }

  styleClassMap = {
    Base: "slds-button",
    Neutral: "slds-button_neutral",
    Brand: "slds-button_brand",
    Destructive: "slds-button_destructive",
    Success: "slds-button_success",
    Inverse: "slds-button_inverse"
  };

  renderedCallback() {
    this.template
      .querySelector("button")
      .classList.add(this.styleClassMap[this.variant]);
  }
}
