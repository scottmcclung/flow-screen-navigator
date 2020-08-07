import {
  FlowAttributeChangeEvent,
  FlowNavigationBackEvent,
  FlowNavigationFinishEvent,
  FlowNavigationNextEvent,
  FlowNavigationPauseEvent
} from "lightning/flowSupport";
import { LightningElement, api } from "lwc";

export default class FlowScreenNavigator extends LightningElement {
  @api btn1Label;
  @api btn1Action;
  @api btn1Style;

  @api btn2Label;
  @api btn2Action;
  @api btn2Style;

  @api btn3Label;
  @api btn3Action;
  @api btn3Style;

  @api btn4Label;
  @api btn4Action;
  @api btn4Style;

  @api value;

  @api
  get availableActions() {
    return this._availableActions || new Map();
  }

  set availableActions(values) {
    this._availableActions = new Map();
    if (!values || !Array.isArray(values)) return;

    values.forEach(action => {
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
      }
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

  buttonCollection = new Map();

  get showBtn1() {
    return !!this.btn1Label && this.availableActions.has(this.btn1Action); // Logic: btn has a label and if it has a nav event, the nav event is available.
  }

  get showBtn2() {
    return !!this.btn2Label && this.availableActions.has(this.btn2Action);
  }

  get showBtn3() {
    return !!this.btn3Label && this.availableActions.has(this.btn3Action);
  }

  get showBtn4() {
    return !!this.btn4Label && this.availableActions.has(this.btn4Action);
  }

  connectedCallback() {
    this.buildButtonCollection();
  }

  handleButtonClick(e) {
    const buttonLabel = e.currentTarget.name;
    if (!this.buttonCollection.has(buttonLabel)) return;

    const buttonObject = this.buttonCollection.get(buttonLabel);

    this.dispatchEvent(
      new FlowAttributeChangeEvent("value", buttonObject.label)
    );

    if (this.availableActions.has(buttonObject.action)) {
      this.availableActions.get(buttonObject.action).call(this);
    }
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

  buildButtonCollection() {
    if (this.btn1Label) {
      this.buttonCollection.set(this.btn1Label, {
        label: this.btn1Label,
        action: this.btn1Action,
        style: this.btn1Style
      });
    }

    if (this.btn2Label) {
      this.buttonCollection.set(this.btn2Label, {
        label: this.btn2Label,
        action: this.btn2Action,
        style: this.btn2Style
      });
    }

    if (this.btn3Label) {
      this.buttonCollection.set(this.btn3Label, {
        label: this.btn3Label,
        action: this.btn3Action,
        style: this.btn3Style
      });
    }

    if (this.btn4Label) {
      this.buttonCollection.set(this.btn4Label, {
        label: this.btn4Label,
        action: this.btn4Action,
        style: this.btn4Style
      });
    }
  }
}
