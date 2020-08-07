import { LightningElement, api } from "lwc";

export default class FlowScreenNavigatorPicklist extends LightningElement {
  @api label;
  @api name;

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
    values = values || [];
    this.mapOptions(values);

    console.log("selected value", JSON.stringify(this.value));
    console.log("options:", JSON.stringify(this._options));
  }

  mapOptions(values) {
    values = values || [];
    this._options = values.map((value) => {
      return {
        value: value,
        selected: value === this.value ? "selected" : ""
      };
    });
  }

  handleChange(e) {
    this.value = e.currentTarget.value;
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      })
    );
  }
}
