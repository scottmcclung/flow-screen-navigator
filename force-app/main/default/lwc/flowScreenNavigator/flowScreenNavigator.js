import {
  FlowAttributeChangeEvent,
  FlowNavigationBackEvent,
  FlowNavigationFinishEvent,
  FlowNavigationNextEvent,
  FlowNavigationPauseEvent
} from "lightning/flowSupport";
import { LightningElement, api, track } from "lwc";

export default class FlowScreenNavigator extends LightningElement {
  @api availableActions = [];

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

  @api navPause() {
    this.dispatchEvent(new FlowNavigationPauseEvent());
  }

  @api navNext() {
    this.dispatchEvent(new FlowNavigationNextEvent());
  }

  @api navBack() {
    this.dispatchEvent(new FlowNavigationBackEvent());
  }

  @api navFinish() {
    this.dispatchEvent(new FlowNavigationFinishEvent());
  }

  buttonCollection = new Map();

  get showBtn1() {
    return !!this.btn1Label && this.availableActions.includes(this.btn1Action); // Logic: btn has a label and if it has a nav event, the nav event is available.
  }

  get showBtn2() {
    return !!this.btn2Label && this.availableActions.includes(this.btn2Action);
  }

  get showBtn3() {
    return !!this.btn3Label && this.availableActions.includes(this.btn3Action);
  }

  get showBtn4() {
    return !!this.btn4Label && this.availableActions.includes(this.btn4Action);
  }

  connectedCallback() {
    this.buildButtonCollection();
  }

  handleButtonClick(e) {
    const buttonLabel = e.currentTarget.dataset.label;
    if (!this.buttonCollection.has(buttonLabel)) return;

    const buttonObject = this.buttonCollection.get(buttonLabel);
    this.value = buttonObject.label;
    this.handleAction(buttonObject.action);
  }

  handleAction(action) {
    if (!this.availableActions.includes(action)) return;
    if (action == "PAUSE") this.handlePause();
    if (action == "NEXT") this.handleNext();
    if (action == "BACK") this.handleBack();
    if (action == "FINISH") this.handleFinish();
  }

  handlePause(e) {
    this.dispatchEvent(new CustomEvent("pause"));
    this.navPause();
  }

  handleNext(e) {
    this.dispatchEvent(new CustomEvent("next"));
    this.navNext();
  }

  handleBack(e) {
    this.dispatchEvent(new CustomEvent("back"));
    this.navBack();
  }

  handleFinish(e) {
    this.dispatchEvent(new CustomEvent("finish"));
    this.navFinish();
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
