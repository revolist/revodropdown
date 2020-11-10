import { r as registerInstance, e as createEvent, h } from './index-3bd4b602.js';
import { g as getItemLabel } from './item.helpers-a730f109.js';

const revoListStyleCss = "revo-list{overflow-x:hidden;overflow-y:auto;max-height:100%;display:block}revo-list ul{margin:0;padding:0;outline:0;list-style:none}revo-list ul>li{width:auto;overflow:hidden;font-size:14px;box-sizing:border-box;min-height:48px;font-weight:400;line-height:1.5;padding-top:6px;white-space:nowrap;padding-bottom:6px;padding-left:16px;padding-right:16px;display:flex;position:relative;text-align:left;align-items:center;justify-content:flex-start;text-decoration:none;cursor:pointer}revo-list ul>li.selected{background-color:rgba(0, 0, 0, 0.04)}revo-list ul>li:hover{background-color:rgba(0, 0, 0, 0.04)}";

const RevoDropdownList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.doChange = createEvent(this, "doChange", 3);
    this.currentItem = 0;
    /**
     * Define object mapping for id/value
     */
    this.sourceItems = [];
    this.isFocused = false;
  }
  /** Recived keyboard down from element */
  onKey(e) {
    if (!this.isFocused) {
      return;
    }
    switch (e.code) {
      case 'ArrowUp':
        e.preventDefault();
        if (this.currentItem <= 0) {
          return;
        }
        this.currentItem--;
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (this.sourceItems[this.currentItem + 1]) {
          this.currentItem++;
        }
        break;
      case 'Enter':
        e.preventDefault();
        const item = this.sourceItems[this.currentItem];
        if (item) {
          this.doChange.emit({ item, e });
        }
        break;
    }
  }
  async refresh(source) {
    this.sourceItems = source;
  }
  componentDidRender() {
    var _a;
    (_a = this.selectedEl) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
      block: 'nearest',
      inline: 'nearest'
    });
  }
  render() {
    this.selectedEl = undefined;
    const items = [];
    for (let i in this.sourceItems) {
      const item = this.sourceItems[i];
      const isSelected = parseInt(i) === this.currentItem;
      items.push(h("li", { class: isSelected ? 'selected' : '', ref: e => {
          if (isSelected) {
            this.selectedEl = e;
          }
        }, onClick: (e) => { this.doChange.emit({ item, e }); } }, getItemLabel(item, this.dataLabel)));
    }
    return h("ul", null, items);
  }
};
RevoDropdownList.style = revoListStyleCss;

export { RevoDropdownList as revo_list };
