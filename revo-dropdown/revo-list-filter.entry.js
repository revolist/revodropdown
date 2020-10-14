import { r as registerInstance, e as createEvent, h } from './index-ddad1057.js';
import { a as getItemLabel } from './item.helpers-c4902735.js';

const RevoDropdownListFilter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.filterChange = createEvent(this, "filterChange", 3);
    this.doChange = createEvent(this, "doChange", 3);
    this.filter = 'contains';
    this.hasFilter = true;
    this.filterByValue = '';
    this.isFocused = false;
    this.filterValue = '';
    this.sourceItems = [];
  }
  onSourceChange() {
    this.doFilter(this.filterValue);
  }
  async doFilter(val) {
    var _a;
    let newSource = [];
    this.filterValue = val.trim().toLocaleLowerCase();
    if (!this.filterValue) {
      newSource = this.source;
    }
    else {
      for (let item of this.source) {
        let val = getItemLabel(item, this.dataLabel);
        if (typeof val === 'string') {
          val = val.toLocaleLowerCase();
          switch (this.filter) {
            case 'start':
              if (val.indexOf(this.filterValue) === 0) {
                newSource.push(item);
              }
              break;
            default:
              if (val.indexOf(this.filterValue) > -1) {
                newSource.push(item);
              }
              break;
          }
        }
      }
    }
    this.sourceItems = newSource;
    (_a = this.revoList) === null || _a === void 0 ? void 0 : _a.refresh(this.sourceItems);
  }
  onFilter(val) {
    this.doFilter(val);
    this.filterChange.emit(val);
  }
  renderFilter() {
    return h("input", { class: "filter-box", type: "text", ref: e => this.filterEl = e, value: this.filterValue, onInput: e => { var _a; return this.onFilter((_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.value); } });
  }
  componentWillLoad() {
    this.filterValue = this.filterByValue;
    this.onSourceChange();
  }
  componentDidRender() {
    if (this.hasFilter) {
      setTimeout(() => {
        var _a;
        (_a = this.filterEl) === null || _a === void 0 ? void 0 : _a.focus({
          preventScroll: true
        });
      }, 0);
    }
  }
  render() {
    return [this.hasFilter ? this.renderFilter() : '', h("revo-list", { ref: e => this.revoList = e, isFocused: this.isFocused, sourceItems: this.sourceItems, dataLabel: this.dataLabel, onDoChange: e => this.doChange.emit(e.detail) })];
  }
  static get watchers() { return {
    "source": ["onSourceChange"]
  }; }
};

export { RevoDropdownListFilter as revo_list_filter };
