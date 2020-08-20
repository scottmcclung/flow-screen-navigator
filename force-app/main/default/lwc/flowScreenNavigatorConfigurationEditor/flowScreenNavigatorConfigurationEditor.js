import { LightningElement, api, track } from "lwc";

export default class FlowScreenNavigatorConfigurationEditor extends LightningElement {
  @track config = { buttons: [] };
  actions = ["Advance", "Back", "Pause"];
  styles = ["Base", "Neutral", "Brand", "Destructive", "Success", "Inverse"];

  /**
   * InputVariables
   * Flow interface.  Platform injects an object of flow metadata.
   *
   */
  @api
  get inputVariables() {
    return this._inputVariables || [];
  }

  set inputVariables(variables) {
    if (!variables) return;
    this._inputVariables = variables;
    this.config = JSON.parse(
      this.getInputVariableValue("config") || '{ "buttons": [] }'
    );
    if (this.buttons.length === 0) this.addButton();
  }

  @api validate() {
    const errors = [];
    const formElements = this.template.querySelectorAll(
      "c-flow-screen-navigator-input, c-flow-screen-navigator-picklist"
    );
    formElements.forEach((element) => {
      const error = element.validate();
      if (error) errors.push(error);
    });
    return errors;
  }

  get buttons() {
    return (
      Object.prototype.hasOwnProperty.call(this.config, "buttons") &&
      this.config.buttons
    );
  }

  handleChange(e) {
    if (!e) return;
    const fieldName = e.detail.name;
    const newValue = e.detail.value;
    const type = e.detail.type;
    const buttonIndex = this.buttons.findIndex((button) => {
      return button.index === fieldName;
    });
    this.buttons[buttonIndex][type] = newValue;
    this.sendUpdate();
  }

  handleAddButtonClick(e) {
    this.addButton();
  }

  handleDeleteButtonClick(e) {
    if (!e) return;
    const fieldName = e.currentTarget.name;
    const buttonIndex = this.buttons.findIndex((button) => {
      return button.index === fieldName;
    });
    this.removeButton(buttonIndex);
  }

  getInputVariableValue(variableName) {
    const param = this.inputVariables.find(({ name }) => name === variableName);
    return param && param.value;
  }

  addButton() {
    this.config.buttons.push({
      index: "Button " + (this.config.buttons.length + 1),
      label: "",
      action: "",
      style: ""
    });
    this.sendUpdate();
  }

  removeButton(buttonIndex) {
    this.config.buttons = this.config.buttons
      .filter((button, index) => {
        return buttonIndex != index;
      })
      .map((button, index) => {
        button.index = "Button " + (index + 1);
        return button;
      });
    this.sendUpdate();
  }

  sendUpdate() {
    this.dispatchEvent(
      new CustomEvent("configuration_editor_input_value_changed", {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {
          name: "config",
          newValue: JSON.stringify(this.config),
          newValueDataType: "String"
        }
      })
    );
  }
}
