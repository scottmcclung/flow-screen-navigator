import { LightningElement, api, track } from "lwc";

export default class FlowScreenNavigatorPicklist extends LightningElement {
  @track errorString;
  @track choices = [];
  @api label;
  @api name;
  @api type;

  @api
  get value() {
    return this._value || "";
  }
  set value(value) {
    this._value = value;
    this.mapOptions(this.options);
  }

  @api
  get options() {
    return this._options || [];
  }

  set options(values) {
    this._options = values || [];
    this.mapOptions(this._options);
  }

  @api
  validate() {
    if (this._value) return;
    this.errorString = "Please make a selection";
    this.enableErrorMode();
    return {
      key: "Picklist",
      errorString: this.errorString
    };
  }

  mapOptions(values) {
    values = values || [];
    this.choices = values.map((value) => {
      return {
        value: value,
        selected: value === this.value ? "selected" : ""
      };
    });
  }

  handleChange(e) {
    e.stopPropagation();
    this.disableErrorMode();
    this._value = e.currentTarget.value;
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        composed: true,
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
