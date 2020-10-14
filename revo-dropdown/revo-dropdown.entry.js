import { r as registerInstance, e as createEvent, h, f as Host } from './index-ddad1057.js';
import { g as getItemValue, a as getItemLabel } from './item.helpers-c4902735.js';

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

const revoDropdownStyleCss = "revo-dropdown{display:block;font-size:1em;font-family:\"Roboto\", \"Helvetica\", \"Arial\", sans-serif;font-weight:400;line-height:2em;letter-spacing:0.01em;padding:0 10px;border:1px solid #ececec;border-radius:5px;box-sizing:border-box;cursor:pointer}revo-dropdown .arrow{width:9px;float:right;margin-top:5px;margin-left:5px;opacity:0.4}revo-dropdown.active{border-color:#0089ff;background-color:#0089ff;color:#fff}.revo-dropdown-list{font-size:1em;font-family:\"Roboto\", \"Helvetica\", \"Arial\", sans-serif;font-weight:400;line-height:2em;letter-spacing:0.01em;position:absolute;transition:opacity 247ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 165ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.revo-dropdown-list.top revo-list-filter{bottom:2px;flex-direction:column-reverse}.revo-dropdown-list.top revo-list-filter .filter-box{margin-bottom:0}.revo-dropdown-list:not(.top) revo-list-filter{top:2px;flex-direction:column}.revo-dropdown-list:not(.top) revo-list-filter .filter-box{margin-top:0}.revo-dropdown-list revo-list-filter{display:flex;max-height:100%;position:absolute;padding:8px 0;box-sizing:border-box;min-height:16px;min-width:16px;box-shadow:0 0 14px 0 rgba(53, 64, 82, 0.05);border-radius:4px;color:rgba(0, 0, 0, 0.87);overflow:hidden;background-color:#fff}.revo-dropdown-list revo-list-filter .filter-box{border:1px solid #ececec;min-height:30px;line-height:30px;margin:10px;border-radius:6px}.revo-dropdown-list revo-list-filter .filter-box:focus{outline:none;border-color:#0089ff}";

const RevoDropdown = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.changeValue = createEvent(this, "changeValue", 7);
    this.close = createEvent(this, "close", 7);
    this.open = createEvent(this, "open", 7);
    this.uuid = '';
    this.currentItem = null;
    this.isVisible = false;
    /**
     * Should dropdown autoclose on changeValue
     */
    this.autoClose = true;
    /**
     * Placeholder text
     */
    this.placeholder = 'Select';
    /**
     * Where to append element
     */
    this.appendTo = 'body';
    this.hasFilter = true;
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
    const closeEvent = this.close.emit();
    if (closeEvent.defaultPrevented) {
      return;
    }
    this.isVisible = false;
  }
  /**
   * Open dropdown
   */
  async doOpen() {
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
    if (this.dropdown && this.appendTo === 'body') {
      document.body.appendChild(this.dropdown);
    }
    if (this.isVisible) {
      this.updateStyles();
    }
  }
  renderDropdown() {
    return h("div", Object.assign({}, { [UUID]: this.uuid }, { class: 'revo-dropdown-list', ref: e => this.dropdown = e }), h("revo-list-filter", { ref: e => this.dropdownInner = e, isFocused: true, hasFilter: this.hasFilter, filter: this.filter, source: this.source, dataLabel: this.dataLabel, filterByValue: this.currentFilter, onFilterChange: e => this.currentFilter = e.detail, onDoChange: e => this.doChange(e.detail.item, e.detail.e) }));
  }
  render() {
    let list;
    if (this.isVisible) {
      list = this.renderDropdown();
    }
    return h(Host, Object.assign({}, { [UUID]: this.uuid }, { class: this.isVisible ? 'active' : '', ref: e => this.element = e, onClick: () => {
        if (this.isVisible) {
          this.doClose();
        }
        else {
          this.doOpen();
        }
      } }), (this.currentItem && getItemLabel(this.currentItem, this.dataLabel)) || this.placeholder || '', list, h("svg", { class: "arrow", "aria-hidden": "true", focusable: "false", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512" }, h("path", { fill: "currentColor", d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z" })));
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
      style.maxHeight = `${currentTop - height - visibleRect.top - 50}px`;
      this.dropdown.classList.add('top');
      // bottom
    }
    else {
      style.top = `${currentTop}px`;
      style.maxHeight = `${visibleRect.bottom - currentTop - 50}px`;
      this.dropdown.classList.remove('top');
    }
    // left
    let currentLeft = left + visibleRect.left;
    const rightSpace = visibleRect.right - (currentLeft + this.dropdown.clientWidth);
    if (rightSpace < 0) {
      currentLeft += rightSpace;
    }
    style.left = `${currentLeft}px`;
    this.dropdownInner.style.maxHeight = style.maxHeight;
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
