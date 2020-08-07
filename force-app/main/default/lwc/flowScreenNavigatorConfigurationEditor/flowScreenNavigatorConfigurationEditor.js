import { LightningElement, api } from "lwc";

export default class FlowScreenNavigatorConfigurationEditor extends LightningElement {
  _inputVariables = [];
  // actions = ["PAUSE", "NEXT", "BACK", "FINISH"];
  actions = ["Advance", "Back", "Pause"];
  styles = ["Base", "Neutral", "Brand", "Destructive", "Success", "Inverse"];

  @api
  get inputVariables() {
    return this._inputVariables;
  }

  set inputVariables(variables) {
    this._inputVariables = variables || [];
  }

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
      const newValue = e.detail.value;
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
