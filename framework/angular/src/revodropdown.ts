/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@revolist/revo-dropdown';

import { RevoDropdown as IRevoDropdown } from '@revolist/revo-dropdown/dist/custom-elements/components/dropdown/revo-dropdown';
export declare interface RevoDropdown extends Components.RevoDropdown {}
@ProxyCmp({
  inputs: ['appendTo', 'autoClose', 'autoFocus', 'autocomplete', 'currentFilter', 'dataId', 'dataLabel', 'filter', 'hasFilter', 'maxHeight', 'placeholder', 'source', 'value'],
  methods: ['doClose', 'doOpen', 'doChange']
})
@Component({
  selector: 'revo-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['appendTo', 'autoClose', 'autoFocus', 'autocomplete', 'currentFilter', 'dataId', 'dataLabel', 'filter', 'hasFilter', 'maxHeight', 'placeholder', 'source', 'value'],
  outputs: ['changeValue', 'close', 'open']
})
export class RevoDropdown {
  /** When value changed */
  changeValue!: IRevoDropdown['changeValue'];
  /** Before element close, can be prevented */
  close!: IRevoDropdown['close'];
  /** Before element open, can be prevented */
  open!: IRevoDropdown['open'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['changeValue', 'close', 'open']);
  }
}

import { RevoDropdownList as IRevoDropdownList } from '@revolist/revo-dropdown/dist/custom-elements/components/list/revo-list';
export declare interface RevoList extends Components.RevoList {}
@ProxyCmp({
  inputs: ['dataLabel', 'isFocused', 'sourceItems'],
  methods: ['refresh']
})
@Component({
  selector: 'revo-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['dataLabel', 'isFocused', 'sourceItems'],
  outputs: ['doChange']
})
export class RevoList {
  /**  */
  doChange!: IRevoDropdownList['doChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['doChange']);
  }
}
