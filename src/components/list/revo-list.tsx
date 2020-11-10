import { Component, h, Prop, Event, EventEmitter, Method, Listen, State } from '@stencil/core';
import { getItemLabel } from '../../utils/item.helpers';

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
   * Define object mapping for labels
   */
  @Prop() dataLabel: string;

  @Event({ bubbles: false }) doChange: EventEmitter<{ item: any; e: any }>;

  /** Recived keyboard down from element */
  @Listen('keydown', { target: 'document' }) onKey(e: KeyboardEvent) {
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

  @Method() async refresh(source: any[]) {
    this.sourceItems = source;
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
      items.push(
        <li
          class={isSelected ? 'selected' : ''}
          ref={e => {
            if (isSelected) {
              this.selectedEl = e;
            }
          }}
          onClick={e => {
            this.doChange.emit({ item, e });
          }}
        >
          {getItemLabel(item, this.dataLabel)}
        </li>,
      );
    }
    return <ul>{items}</ul>;
  }
}
