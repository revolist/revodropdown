import { Component, h, Prop, Event, EventEmitter, Method, Listen, State, Watch, VNode } from '@stencil/core';

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

  @Prop() template!: (item: any) => VNode;

  @Event({ bubbles: false }) changed: EventEmitter<{ item: any; e: any }>;

  /** Recived keyboard down from element */
  @Listen('keydown', { target: 'document' }) onKey(e: KeyboardEvent) {
    let item: any;
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
      case 'Tab':
        e.preventDefault();
        item = this.sourceItems[this.currentItem];
        if (item) {
          this.changed.emit({ item, e });
        }
        break;
      case 'Enter':
        e.preventDefault();
        item = this.sourceItems[this.currentItem];
        if (item) {
          this.changed.emit({ item, e });
        }
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
    for (let i in this.sourceItems) {
      const item = this.sourceItems[i];
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
