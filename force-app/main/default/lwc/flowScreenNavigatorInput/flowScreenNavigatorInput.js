import { LightningElement, api, track } from "lwc";

export default class FlowScreenNavigatorInput extends LightningElement {
  @api label;
  @api name;
  @api type;

  @track errorString;

  @api
  get value() {
    return this._value;
  }

  set value(variable) {
    this._value = variable;
  }

  @api
  validate() {
    if (this.value) return;
    this.errorString = "The button label is required";
    this.enableErrorMode();
    return {
      key: "Button Label",
      errorString: this.errorString
    };
  }

  handleChange(e) {
    e.stopPropagation();
    this.disableErrorMode();
    this._value = e.currentTarget.value;
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        detail: {
          value: this._value,
          name: this.name,
          type: this.type
        }
      })
    );
  }

  enableErrorMode() {
    const element = this.template.querySelector("div");
    if (!element) return;
    element.classList.add("slds-has-error");
  }

  disableErrorMode() {
    const element = this.template.querySelector("div");
    if (!element) return;
    element.classList.remove("slds-has-error");
    this.errorString = "";
  }
}
