import { Component, h, Prop, Event, EventEmitter, Method, Listen, State, Watch } from '@stencil/core';

@Component({ tag: 'revo-list', styleUrl: 'revo-list.style.scss' })
export class RevoDropdownList {
  @State() currentItem = 0;
  private selectedEl: HTMLElement;
  /**
   * Define object mapping for id/value
   */
  @Prop() sourceItems: any[] = [];
  @Prop() isFocused: boolean = false;

  /**
   * Selected Value Index
   */
  @Prop() selectedIndex = 0;

  @Prop() template!: (item: any) => unknown;

  @Event({ bubbles: false }) changed: EventEmitter<{ item: any; e: any }>;

  @Method() async moveSelection(offset: number) {
    const items = this.sourceItems || [];
    const nextItem = this.currentItem + offset;
    if (nextItem < 0 || nextItem >= items.length) {
      return;
    }
    this.currentItem = nextItem;
  }

  @Method() async selectCurrent(e: globalThis.Event) {
    const item = (this.sourceItems || [])[this.currentItem];
    if (item) {
      this.changed.emit({ item, e });
    }
  }

  /** Keep keyboard selection active while the dropdown owns focus. */
  @Listen('keydown', { target: 'document' }) onKey(e: KeyboardEvent) {
    if (!this.isFocused) {
      return;
    }
    switch (e.code) {
      case 'ArrowUp':
        e.preventDefault();
        this.moveSelection(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.moveSelection(1);
        break;
      case 'Tab':
      case 'Enter':
        e.preventDefault();
        this.selectCurrent(e);
        break;
    }
  }

  @Method() async refresh(source: any[]) {
    this.sourceItems = source;
  }

  @Watch('selectedIndex') valueChanged(newV: number) {
    this.currentItem = newV;
  }

  componentWillLoad() {
    this.valueChanged(this.selectedIndex);
  }

  componentDidRender() {
    this.selectedEl?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }

  render() {
    this.selectedEl = undefined;
    const items = [];
    const sourceItems = this.sourceItems || [];
    for (let i in sourceItems) {
      const item = sourceItems[i];
      const isSelected = parseInt(i) === this.currentItem;
      const props = {
        class: { selected: isSelected },
        ref: e => {
          if (isSelected) {
            this.selectedEl = e;
          }
        },
        onClick: e => this.changed.emit({ item, e }),
      };
      const li = <li {...props}>{this.template(item)}</li>;
      items.push(li);
    }
    return <ul>{items}</ul>;
  }
}
