import { LightningElement, api } from "lwc";

export default class FlowScreenNavigatorConfigurationEditor extends LightningElement {
  _inputVariables = [];
  actions = ["PAUSE", "NEXT", "BACK", "FINISH"];
  styles = ["Base", "Neutral", "Brand", "Destructive", "Success", "Inverse"];

  @api
  get inputVariables() {
    return this._inputVariables;
  }

  // Set a field with the data that was stored from the flow.
  // This data includes the public volume property of the custom volume
  // component.
  set inputVariables(variables) {
    this._inputVariables = variables || [];
  }

  // Get the value of the btn1Label input variable.
  get btn1Label() {
    return this.getInputVariableValue("btn1Label");
  }

  get btn1Action() {
    return this.getInputVariableValue("btn1Action");
  }

  get btn1Style() {
    return this.getInputVariableValue("btn1Style");
  }

  get btn2Label() {
    return this.getInputVariableValue("btn2Label");
  }

  get btn2Action() {
    return this.getInputVariableValue("btn2Action");
  }

  get btn2Style() {
    return this.getInputVariableValue("btn2Style");
  }

  get btn3Label() {
    return this.getInputVariableValue("btn3Label");
  }

  get btn3Action() {
    return this.getInputVariableValue("btn3Action");
  }

  get btn3Style() {
    return this.getInputVariableValue("btn3Style");
  }

  get btn4Label() {
    return this.getInputVariableValue("btn4Label");
  }

  get btn4Action() {
    return this.getInputVariableValue("btn4Action");
  }

  get btn4Style() {
    return this.getInputVariableValue("btn4Style");
  }

  getInputVariableValue(variableName) {
    const param = this.inputVariables.find(({ name }) => name === variableName);
    return param && param.value;
  }

  handleChange(e) {
    if (e && e.detail) {
      const fieldName = e.currentTarget.name;
      console.log("fieldname:", fieldName);
      const newValue = e.detail.value;
      console.log("newvalue", newValue);
      this.dispatchEvent(
        new CustomEvent("configuration_editor_input_value_changed", {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail: {
            name: fieldName,
            newValue,
            newValueDataType: "String"
          }
        })
      );
    }
  }

  handleToggleSection(e) {}
}
