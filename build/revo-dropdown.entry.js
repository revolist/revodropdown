import { h, r as registerInstance, e as createEvent, f as Host } from './index-3bd4b602.js';
import { g as getItemLabel, a as getItemValue } from './item.helpers-a730f109.js';

(function closest() {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
  }
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      let el = this;
      do {
        if (Element.prototype.matches.call(el, s)) {
          return el;
        }
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }
})();

const UUID = 'uuid';

;
function doFilter(p, val) {
  var _a;
  let newSource = [];
  const filterValue = (_a = val === null || val === void 0 ? void 0 : val.trim()) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
  if (!filterValue) {
    newSource = p.source;
  }
  else {
    for (let item of p.source) {
      let val = getItemLabel(item, p.dataLabel);
      if (typeof val === 'string') {
        val = val.toLocaleLowerCase();
        switch (p.filter) {
          case 'start':
            if (val.indexOf(filterValue) === 0) {
              newSource.push(item);
            }
            break;
          default:
            if (val.indexOf(filterValue) > -1) {
              newSource.push(item);
            }
            break;
        }
      }
    }
  }
  return newSource;
}
const DropdownListFilter = (p) => {
  const filterChange = (value) => {
    const items = doFilter(p, value);
    p.onFilterChange({ value, items });
  };
  if (!p.filter) {
    p.filter = 'contains';
  }
  filterChange(p.filterValue);
  return h("input", Object.assign({ class: {
      'filter-box': true
    }, type: "text" }, p, { onClick: e => {
      e.preventDefault();
      p.onClick && p.onClick(e);
    }, onInput: e => {
      var _a;
      p.onInput && p.onInput();
      const value = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.value;
      filterChange(value);
    } }));
};

const ArrowRenderer = () => {
  return h("span", { class: "arrow-wrapper" },
    h("svg", { class: "arrow", "aria-hidden": "true", focusable: "false", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512" },
      h("path", { fill: "currentColor", d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z" })));
};

const revoDropdownStyleCss = "revo-dropdown{font-size:1em;font-family:\"Roboto\", \"Helvetica\", \"Arial\", sans-serif;font-weight:400;line-height:2em;letter-spacing:0.01em;display:inline-flex;flex-direction:column;vertical-align:top;padding:0;box-sizing:border-box;cursor:pointer;position:relative}revo-dropdown .rv-dr-root{padding:5px 9px;padding-right:35px;flex-wrap:wrap;position:relative;border-radius:4px;cursor:text;display:inline-flex;position:relative;font-size:1rem;box-sizing:border-box;align-items:center}revo-dropdown input.filter-box{padding-left:6px;padding:9.5px 4px;width:0;min-width:30px;flex-grow:1;text-overflow:ellipsis;border:0;height:1.1876em;margin:0;display:block;background:none;box-sizing:content-box;letter-spacing:inherit;animation-duration:10ms}revo-dropdown input.filter-box:focus{outline:none}revo-dropdown .actions{right:9px;top:calc(50% - $font-size);position:absolute}revo-dropdown label{font-size:1rem;z-index:1;top:0;left:0;position:absolute;display:block;transform-origin:top left;line-height:1;transition:color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;transform:translate(14px, 14px) scale(1);pointer-events:none}revo-dropdown fieldset{border-color:#ececec;top:-5px;left:0;right:0;bottom:0;margin:0;padding:0 8px;overflow:hidden;position:absolute;border-style:solid;border-width:1px;border-radius:inherit;pointer-events:none}revo-dropdown fieldset legend{width:auto;height:11px;display:block;padding:0;font-size:0.75em;max-width:0.01px;text-align:left;transition:max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;visibility:hidden}revo-dropdown fieldset legend>span{display:inline-block;padding-left:5px;padding-right:5px}revo-dropdown.shrink label{transform:translate(14px, -6px) scale(0.75)}revo-dropdown.shrink legend{max-width:1000px;transition:max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms}revo-dropdown .arrow{width:9px;margin-top:5px;margin-left:5px;opacity:0.4}revo-dropdown .arrow-wrapper{width:15px;text-align:center}revo-dropdown.active label{color:#0089ff}revo-dropdown.active fieldset{border-color:#0089ff}.revo-dropdown-list{font-size:1em;font-family:\"Roboto\", \"Helvetica\", \"Arial\", sans-serif;font-weight:400;line-height:2em;letter-spacing:0.01em;position:absolute;transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 160ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;z-index:999}.revo-dropdown-list.top .dropdown-inner{bottom:2px;flex-direction:column-reverse}.revo-dropdown-list.top .dropdown-inner .filter-box{margin-bottom:0}.revo-dropdown-list:not(.top) .dropdown-inner{top:2px;flex-direction:column}.revo-dropdown-list:not(.top) .dropdown-inner .filter-box{margin-top:0}.revo-dropdown-list .dropdown-inner{display:flex;max-height:100%;position:absolute;padding:8px 0;box-sizing:border-box;min-height:16px;min-width:16px;box-shadow:0 0 14px 0 rgba(53, 64, 82, 0.05);border:1px solid rgba(0, 0, 0, 0.05);border-radius:4px;color:rgba(0, 0, 0, 0.87);overflow:hidden;background-color:#fff}.revo-dropdown-list .dropdown-inner .filter-box{border:1px solid #ececec;min-height:30px;line-height:30px;margin:10px;border-radius:6px}.revo-dropdown-list .dropdown-inner .filter-box:focus{outline:none;border-color:#0089ff}";

const RevoDropdown = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.changeValue = createEvent(this, "changeValue", 7);
    this.close = createEvent(this, "close", 7);
    this.open = createEvent(this, "open", 7);
    this.uuid = '';
    this.currentFilter = '';
    this.currentItem = null;
    this.isVisible = false;
    /**
     * Should dropdown autoclose on changeValue
     */
    this.autoClose = true;
    /**
     * Define object mapping for id/value
     */
    this.source = [];
    /**
     * Placeholder text
     */
    this.placeholder = 'Select';
    /**
     * Where to append element
     */
    this.appendTo = 'body';
    this.hasFilter = true;
    this.autocomplete = false;
    this.autoFocus = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Close dropdown
   */
  async doClose() {
    const event = this.close.emit();
    if (event.defaultPrevented) {
      return;
    }
    this.isVisible = false;
  }
  /**
   * Open dropdown
   */
  async doOpen() {
    const event = this.open.emit();
    if (event.defaultPrevented) {
      return;
    }
    this.isVisible = true;
  }
  /**
   * Change value
   */
  async doChange(val, originalEvent) {
    this.value = val;
    this.changeValue.emit({ val, originalEvent });
    if (this.autoClose && this.isVisible) {
      this.doClose();
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Internal
  //
  // --------------------------------------------------------------------------
  /** Action finished */
  onMouseUp(e) {
    var _a;
    if (this.isVisible && !e.defaultPrevented) {
      if (!((_a = e.target) === null || _a === void 0 ? void 0 : _a.closest(`[${UUID}="${this.uuid}"]`))) {
        this.doClose();
      }
    }
  }
  onKey(e) {
    switch (e.code) {
      case 'Escape':
        e.preventDefault();
        this.doClose();
        break;
    }
  }
  onValueChanged(newVal) {
    for (let index in this.source) {
      const item = this.source[index];
      if (newVal == getItemValue(item, this.dataId)) {
        this.currentItem = item;
        return;
      }
    }
    this.currentItem = null;
  }
  connectedCallback() {
    this.uuid = `${(new Date()).getTime()}-rvdropdown`;
    if (typeof this.value !== 'undefined') {
      this.onValueChanged(this.value);
    }
  }
  disconnectedCallback() {
    this.doClose();
  }
  componentDidRender() {
    var _a;
    if (this.dropdown && this.appendTo === 'body') {
      document.body.appendChild(this.dropdown);
    }
    if (this.isVisible) {
      this.updateStyles();
    }
    if (this.dropdownInput) {
      this.dropdownInput.focus();
    }
    if (this.autoFocus) {
      if (this.autocomplete) {
        (_a = this.autocompleteInput) === null || _a === void 0 ? void 0 : _a.focus();
      }
    }
  }
  renderDropdown() {
    return h("div", Object.assign({}, { [UUID]: this.uuid }, { class: 'revo-dropdown-list', ref: e => this.dropdown = e }), h("div", { class: 'dropdown-inner', ref: e => this.dropdownInner = e }, this.hasFilter && !this.autocomplete ?
      h(DropdownListFilter, { ref: e => this.dropdownInput = e, source: this.source, filter: this.filter, dataLabel: this.dataLabel, value: this.currentFilter || '', filterValue: this.currentFilter || '', onFilterChange: e => {
          var _a;
          this.currentFilter = e.value;
          this.currentSource = e.items;
          (_a = this.revoList) === null || _a === void 0 ? void 0 : _a.refresh(this.currentSource);
        } }) :
      undefined, h("revo-list", { ref: e => this.revoList = e, isFocused: true, sourceItems: this.currentSource, dataLabel: this.dataLabel, onDoChange: e => this.doChange(e.detail.item, e.detail.e) })));
  }
  renderSelect() {
    return h("input", { type: "text", disabled: true, class: 'filter-box', value: this.currentItem && getItemLabel(this.currentItem, this.dataLabel) || '' });
  }
  renderAutocomplete() {
    const val = this.currentItem ? getItemLabel(this.currentItem, this.dataLabel) : '';
    return h(DropdownListFilter, { ref: e => this.autocompleteInput = e, source: this.source, filter: this.filter, dataLabel: this.dataLabel, value: val, filterValue: this.currentFilter, onKeyDown: (e) => {
        if (this.isVisible) {
          return;
        }
        switch (e.code) {
          case 'ArrowUp':
          case 'ArrowDown':
            e.preventDefault();
            this.showAutoComplete();
            break;
        }
      }, onInput: () => this.showAutoComplete(), onFocus: () => this.showAutoComplete(), onClick: () => this.showAutoComplete(), onBlur: (e) => {
        var _a, _b;
        if (!((_b = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.trim())) {
          this.currentItem = null;
        }
      }, onFilterChange: e => {
        var _a;
        this.currentFilter = e.value;
        this.currentSource = e.items;
        (_a = this.revoList) === null || _a === void 0 ? void 0 : _a.refresh(this.currentSource);
      } });
  }
  showAutoComplete() {
    if (!this.isVisible) {
      this.currentFilter = '';
      this.isVisible = true;
    }
  }
  render() {
    var _a;
    let list;
    if (this.isVisible) {
      list = this.renderDropdown();
    }
    const props = Object.assign({ [UUID]: this.uuid }, (this.autocomplete ? { ['autocomplete']: true } : undefined));
    return h(Host, Object.assign({}, props, { class: {
        active: this.isVisible,
        shrink: this.isVisible || !!this.currentItem || !!((_a = this.autocompleteInput) === null || _a === void 0 ? void 0 : _a.value)
      }, ref: e => this.element = e, onClick: (e) => this.selectClick(e) }), h("label", null, this.placeholder), h("div", { class: "rv-dr-root" }, this.autocomplete ? this.renderAutocomplete() : this.renderSelect(), h("span", { class: "actions" }, h(ArrowRenderer, null)), h("fieldset", null, h("legend", null, h("span", null, this.placeholder)))), list);
  }
  selectClick(e) {
    if (e.defaultPrevented) {
      return;
    }
    if (this.isVisible) {
      this.doClose();
    }
    else {
      this.doOpen();
    }
  }
  updateStyles() {
    if (!this.dropdown) {
      return;
    }
    const { top, left, height } = this.element.getBoundingClientRect();
    const visibleRect = this.clientRectangle();
    let currentTop = top + height + visibleRect.top;
    const style = {};
    // top
    if (currentTop > visibleRect.centerY) {
      style.top = `${currentTop - height}px`;
      style.maxHeight = currentTop - height - visibleRect.top - 50;
      this.dropdown.classList.add('top');
      // bottom
    }
    else {
      style.top = `${currentTop}px`;
      style.maxHeight = visibleRect.bottom - currentTop - 50;
      this.dropdown.classList.remove('top');
    }
    // left
    let currentLeft = left + visibleRect.left;
    const rightSpace = visibleRect.right - (currentLeft + this.dropdown.clientWidth);
    if (rightSpace < 0) {
      currentLeft += rightSpace;
    }
    style.left = `${currentLeft}px`;
    this.dropdownInner.style.maxHeight = `${Math.min(style.maxHeight, this.maxHeight || style.maxHeight)}px`;
    this.dropdownInner.style.maxWidth = style.maxWidth;
    for (let s in style) {
      this.dropdown.style[s] = style[s];
    }
  }
  clientRectangle() {
    const rect = {
      top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
      bottom: 0,
      centerY: 0,
      height: document.body.clientHeight,
      left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
      right: 0,
      width: document.body.clientWidth,
      centerX: 0,
    };
    rect.bottom = rect.top + rect.height;
    rect.right = rect.left + rect.width;
    rect.centerY = rect.top + rect.height / 2;
    rect.centerX = rect.left + rect.width / 2;
    return rect;
  }
  static get watchers() { return {
    "value": ["onValueChanged"]
  }; }
};
RevoDropdown.style = revoDropdownStyleCss;

export { RevoDropdown as revo_dropdown };
