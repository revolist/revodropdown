import { Component, Prop, h, VNode, State, Listen, Event, EventEmitter, Method, Watch, Host } from '@stencil/core';
import '../../utils/closestPolifill';
import { UUID } from '../../utils/consts';
import { getItemLabel, getItemValue } from '../../utils/item.helpers';

@Component({
  tag: 'revo-dropdown',
  styleUrl: 'revo-dropdown.style.scss',
})
export class RevoDropdown {
  private element: Element;
  private dropdown: HTMLElement;
  private dropdownInner: HTMLElement;
  private uuid: string = '';
  private currentFilter?: string;
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
  @Prop() source: any[];

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

  @Prop() hasFilter: boolean = true;

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
    const closeEvent = this.close.emit();
    if (closeEvent.defaultPrevented) {
      return;
    }
    this.isVisible = false;
  }
  /**
   * Open dropdown
   */
  @Method() async doOpen(): Promise<void> {
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
  }

  private renderDropdown() {
    return <div {...{[UUID]: this.uuid}}
      class='revo-dropdown-list'
      ref={e => this.dropdown = e}>
      <revo-list-filter
        ref={e => this.dropdownInner = e}
        isFocused={true}
        hasFilter={this.hasFilter}
        filter={this.filter}
        source={this.source}
        dataLabel={this.dataLabel}
        filterByValue={this.currentFilter}
        onFilterChange={e => this.currentFilter = e.detail}
        onDoChange={e => this.doChange(e.detail.item, e.detail.e)}/>
    </div>;
  }

  render() {
    let list: VNode;
    if (this.isVisible) {
      list = this.renderDropdown();
    }
    return <Host {...{[UUID]: this.uuid}} class={this.isVisible ? 'active' : ''} ref={e => this.element = e} onClick={() => {
      if (this.isVisible) {
        this.doClose();
      } else {
        this.doOpen();
      }
    }}>
      {(this.currentItem && getItemLabel(this.currentItem, this.dataLabel)) || this.placeholder || ''}
      {list}
      <svg class="arrow" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
      </svg>
      </Host>;
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
      maxHeight?: string;
      maxWidth?: string;
      left?: string;
    } = {};

    // top
    if (currentTop > visibleRect.centerY) {
      style.top = `${currentTop - height}px`;
      style.maxHeight = `${currentTop - height - visibleRect.top - 50}px`;
      this.dropdown.classList.add('top');
    
    // bottom
    } else {
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
