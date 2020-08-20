import {
  FlowAttributeChangeEvent,
  FlowNavigationBackEvent,
  FlowNavigationFinishEvent,
  FlowNavigationNextEvent,
  FlowNavigationPauseEvent
} from "lightning/flowSupport";
import { LightningElement, api, track } from "lwc";

export default class FlowScreenNavigator extends LightningElement {
  @track buttons = [];

  /**
   * Value
   * The component output value.  Set to the button label that the user clicks.
   */
  @api value;

  /**
   * AvailableActions
   * Flow interface.   Platform injects an array of the navigation actions available to the screen
   */
  @api
  get availableActions() {
    return this._availableActions || new Map();
  }

  set availableActions(values) {
    this._availableActions = new Map();
    if (!values || !Array.isArray(values)) return;

    values.forEach((action) => {
      switch (action) {
        case "NEXT":
          this._availableActions.set("Advance", this.handleNext);
          break;
        case "FINISH":
          this._availableActions.set("Advance", this.handleFinish);
          break;
        case "BACK":
          this._availableActions.set("Back", this.handleBack);
          break;
        case "PAUSE":
          this._availableActions.set("Pause", this.handlePause);
          break;
        default:
      }
    });
  }

  /**
   * Config
   * JSON representation of the button configuration
   */
  @api
  get config() {
    return this._config || { buttons: [] };
  }

  set config(value) {
    if (!value) return;
    this._config = JSON.parse(value || '{ "buttons": [] }');
    // filter the buttons in config to only those with a label and a valid action
    this.buttons = this._config.buttons.filter((button) => {
      return (
        Object.prototype.hasOwnProperty.call(button, "label") &&
        Object.prototype.hasOwnProperty.call(button, "action") &&
        !!button.label &&
        this.availableActions.has(button.action)
      );
    });
  }

  @api pause() {
    this.dispatchEvent(new FlowNavigationPauseEvent());
  }

  @api next() {
    this.dispatchEvent(new FlowNavigationNextEvent());
  }

  @api back() {
    this.dispatchEvent(new FlowNavigationBackEvent());
  }

  @api finish() {
    this.dispatchEvent(new FlowNavigationFinishEvent());
  }

  handlePause() {
    this.dispatchEvent(new CustomEvent("pause"));
    this.pause();
  }

  handleNext() {
    this.dispatchEvent(new CustomEvent("next"));
    this.next();
  }

  handleBack() {
    this.dispatchEvent(new CustomEvent("back"));
    this.back();
  }

  handleFinish() {
    this.dispatchEvent(new CustomEvent("finish"));
    this.finish();
  }

  handleButtonClick(e) {
    const buttonLabel = e.currentTarget.name;
    const buttonObject = this.buttons.find((button) => {
      return button.label === buttonLabel;
    });

    if (!buttonObject) return;

    if (this.availableActions.has(buttonObject.action)) {
      this.dispatchEvent(
        new FlowAttributeChangeEvent("value", buttonObject.label)
      );
      this.availableActions.get(buttonObject.action).call(this);
    }
  }
}

/*
Example config structure
{
  buttons: [
    {
      label:
      action:
      style:
    }
  ]
}
*/
