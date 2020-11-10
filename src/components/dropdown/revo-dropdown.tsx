import { Component, Prop, h, VNode, State, Listen, Event, EventEmitter, Method, Watch, Host } from '@stencil/core';
import '../../utils/closestPolifill';
import { UUID } from '../../utils/consts';
import { getItemLabel, getItemValue } from '../../utils/item.helpers';
import { DropdownListFilter } from '../list/revo-list.filter';
import { ArrowRenderer } from './arrow';

@Component({
  tag: 'revo-dropdown',
  styleUrl: 'revo-dropdown.style.scss',
})
export class RevoDropdown {
  private element: Element;
  private dropdown: HTMLElement;
  private dropdownInner: HTMLElement;
  private dropdownInput: HTMLInputElement;
  autocompleteInput: HTMLInputElement;
  private revoList: HTMLRevoListElement;
  private uuid: string = '';
  private currentFilter: string = '';
  private currentSource?: any[];
  @State() currentItem: any = null;
  @State() isVisible = false;

  // --------------------------------------------------------------------------
  //
  //  Props
  //
  // --------------------------------------------------------------------------
  /**
   * Define object mapping for labels
   */
  @Prop() dataLabel: string;
  /**
   * Selected value
   */
  @Prop({ mutable: true }) value: any;

  /**
   * Define object mapping for id/value
   */
  @Prop() dataId: string;
  /**
   * Should dropdown autoclose on changeValue
   */
  @Prop() autoClose: boolean = true;

  /**
   * Define object mapping for id/value
   */
  @Prop() source: any[] = [];

  /**
   * Placeholder text
   */
  @Prop() placeholder: string = 'Select';
  /**
   * Where to append element
   */
  @Prop() appendTo: 'body'|'current' = 'body';
  /**
   * Filter criteria
   */
  @Prop() filter: 'contains'|'start';

  @Prop() maxHeight: number;

  @Prop() hasFilter: boolean = true;

  @Prop() autocomplete: boolean = false;
  @Prop() autoFocus: boolean = false;


  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------
  /**
   * When value changed
   */
  @Event() changeValue: EventEmitter<{val: any, originalEvent?: MouseEvent}>;
  /**
   * Before element close, can be prevented
   */
  @Event() close: EventEmitter;

  /**
   * Before element open, can be prevented
   */
  @Event() open: EventEmitter;


  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------


  /**
   * Close dropdown
   */
  @Method() async doClose(): Promise<void> {
    const event = this.close.emit();
    if (event.defaultPrevented) {
      return;
    }
    this.isVisible = false;
  }
  /**
   * Open dropdown
   */
  @Method() async doOpen(): Promise<void> {
    const event = this.open.emit();
    if (event.defaultPrevented) {
      return;
    }
    this.isVisible = true;
  }


  /**
   * Change value
   */
  @Method() async doChange(val: any, originalEvent?: MouseEvent): Promise<void> {
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
  @Listen('mousedown', { target: 'document' })
  onMouseUp(e: MouseEvent): void {
    if (this.isVisible && !e.defaultPrevented) {
      if (!(e.target as HTMLElement|null)?.closest(`[${UUID}="${this.uuid}"]`)) {
        this.doClose();
      }
    }
  }

  @Listen('keydown', { target: 'document' }) onKey(e: KeyboardEvent) {
    switch (e.code) {
      case 'Escape':
        e.preventDefault();
        this.doClose();
        break;
    }
  }

  @Watch('value') onValueChanged(newVal: any) {
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
    if (this.dropdownInput) {
      this.dropdownInput.focus();
    }
    if (this.autoFocus) {
      if (this.autocomplete) {
        this.autocompleteInput?.focus();
      }
    }
  }

  private renderDropdown() {
    return <div {...{[UUID]: this.uuid}}
      class='revo-dropdown-list'
      ref={e => this.dropdown = e}>
        <div class='dropdown-inner' ref={e => this.dropdownInner = e}>
            {this.hasFilter && !this.autocomplete ? 
              <DropdownListFilter
                ref={e => this.dropdownInput = e}
                source={this.source}
                filter={this.filter}
                dataLabel={this.dataLabel}
                value={this.currentFilter || ''}
                filterValue={this.currentFilter || ''}
                onFilterChange={e => {
                  this.currentFilter = e.value;
                  this.currentSource = e.items;
                  this.revoList?.refresh(this.currentSource );
                }}/> :
              undefined
            }
            <revo-list
              ref={e => this.revoList = e}
              isFocused={true}
              sourceItems={this.currentSource}
              dataLabel={this.dataLabel}
              onDoChange={e => this.doChange(e.detail.item, e.detail.e)}/>
        </div>
    </div>;
  }

  renderSelect() {
    return <input type="text" disabled class='filter-box' value={this.currentItem && getItemLabel(this.currentItem, this.dataLabel) || ''} />;
  }

  renderAutocomplete() {
    const val = this.currentItem ? getItemLabel(this.currentItem, this.dataLabel) : '';
    return <DropdownListFilter
      ref={e => this.autocompleteInput = e}
      source={this.source}
      filter={this.filter}
      dataLabel={this.dataLabel}
      value={val}
      filterValue={this.currentFilter}
      onKeyDown={(e) => {
        if (this.isVisible) {
          return;
        }
        switch (e.code) {
          case 'ArrowUp':
          case 'ArrowDown':
            e.preventDefault();
            this.showAutoComplete();
            break;
      }}}
      onInput={() => this.showAutoComplete()}
      onFocus={() => this.showAutoComplete()}
      onClick={() => this.showAutoComplete()}
      onBlur={(e) => {
        if (!(e?.target as HTMLInputElement|null)?.value?.trim()) {
          this.currentItem = null;
        }
      }}
      onFilterChange={e => {
        this.currentFilter = e.value;
        this.currentSource = e.items;
        this.revoList?.refresh(this.currentSource );
      }}/>;
  }

  private showAutoComplete() {
    if (!this.isVisible) {
      this.currentFilter = '';
      this.isVisible = true;
    }
  }

  render() {
    let list: VNode;
    if (this.isVisible) {
      list = this.renderDropdown();
    }
    const props = {
      [UUID]: this.uuid,
      ...(this.autocomplete ? {['autocomplete']: true} : undefined)
    };
    return <Host {...props}
      class={{
        active: this.isVisible,
        shrink: this.isVisible || !!this.currentItem || !!this.autocompleteInput?.value
      }}
      ref={e => this.element = e}
      onClick={(e) => this.selectClick(e)}>
      <label>{this.placeholder}</label>
      <div class="rv-dr-root">
        {this.autocomplete ? this.renderAutocomplete() : this.renderSelect()}
        <span class="actions"><ArrowRenderer/></span>
        <fieldset>
          <legend>
            <span>{this.placeholder}</span>
          </legend>
        </fieldset>
      </div>
      {list}
      </Host>;
  }

  private selectClick(e: Event) {
    if (e.defaultPrevented) {
      return;
    }
    if (this.isVisible) {
      this.doClose();
    } else {
      this.doOpen();
    }
  }
  
  private updateStyles() {
    if (!this.dropdown) {
      return;
    }
    const {top, left, height} = this.element.getBoundingClientRect();
    const visibleRect = this.clientRectangle();
    let currentTop = top + height + visibleRect.top;

    const style: {
      top?: string;
      maxHeight?: number;
      maxWidth?: string;
      left?: string;
    } = {};

    // top
    if (currentTop > visibleRect.centerY) {
      style.top = `${currentTop - height}px`;
      style.maxHeight = currentTop - height - visibleRect.top - 50;
      this.dropdown.classList.add('top');
    
    // bottom
    } else {
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


  private clientRectangle() {
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
    rect.centerY = rect.top + rect.height/2;
    rect.centerX = rect.left + rect.width/2;
    return rect;
  }
}
