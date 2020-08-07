import { LightningElement, api } from 'lwc';

export default class FlowScreenNavigatorConfigurationEditor extends LightningElement {
                 _inputVariables = [];

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

                 get btn2Label() {
                   return this.getInputVariableValue("btn2Label");
                 }

                 get btn3Label() {
                   return this.getInputVariableValue("btn3Label");
                 }

                 get btn4Label() {
                   return this.getInputVariableValue("btn4Label");
                 }

                 getInputVariableValue(variableName) {
                   const param = this.inputVariables.find(
                     ({ name }) => name === variableName
                   );
                   return param && param.value;
                 }
               }