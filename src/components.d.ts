/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { VNode } from "@stencil/core";
export { VNode } from "@stencil/core";
export namespace Components {
    interface RevoDropdown {
        /**
          * Where to append element
         */
        "appendTo": 'body' | 'current';
        /**
          * Should dropdown autoclose on changeValue
         */
        "autoClose": boolean;
        "autoFocus": boolean;
        "autocomplete": boolean;
        /**
          * Filter value
         */
        "currentFilter": any;
        /**
          * Define object mapping for id/value
         */
        "dataId": string;
        /**
          * Define object mapping for labels
         */
        "dataLabel": string;
        /**
          * Change value
         */
        "doChange": (val: any, originalEvent?: MouseEvent) => Promise<void>;
        /**
          * Close dropdown
         */
        "doClose": (isDisconnected?: boolean) => Promise<void>;
        /**
          * Open dropdown
         */
        "doOpen": () => Promise<void>;
        /**
          * Filter criteria
         */
        "filter": 'contains' | 'start';
        "hasFilter": boolean;
        "maxHeight": number;
        /**
          * Placeholder text
         */
        "placeholder": string;
        /**
          * Define object mapping for id/value
         */
        "source": any[];
        /**
          * Define your own vnode template
          * @example <revo-dropdown template={(h, item) => h('span', null, item.label)} />
         */
        "template"?: (h: Function, item: any) => VNode;
        /**
          * Selected value
         */
        "value": any;
    }
    interface RevoList {
        "isFocused": boolean;
        "refresh": (source: any[]) => Promise<void>;
        /**
          * Selected Value Index
         */
        "selectedIndex": number;
        /**
          * Define object mapping for id/value
         */
        "sourceItems": any[];
        "template": (item: any) => VNode;
    }
}
export interface RevoDropdownCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLRevoDropdownElement;
}
export interface RevoListCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLRevoListElement;
}
declare global {
    interface HTMLRevoDropdownElementEventMap {
        "changed": { val: any; originalEvent?: MouseEvent };
        "close": any;
        "open": any;
    }
    interface HTMLRevoDropdownElement extends Components.RevoDropdown, HTMLStencilElement {
        addEventListener<K extends keyof HTMLRevoDropdownElementEventMap>(type: K, listener: (this: HTMLRevoDropdownElement, ev: RevoDropdownCustomEvent<HTMLRevoDropdownElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLRevoDropdownElementEventMap>(type: K, listener: (this: HTMLRevoDropdownElement, ev: RevoDropdownCustomEvent<HTMLRevoDropdownElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLRevoDropdownElement: {
        prototype: HTMLRevoDropdownElement;
        new (): HTMLRevoDropdownElement;
    };
    interface HTMLRevoListElementEventMap {
        "changed": { item: any; e: any };
    }
    interface HTMLRevoListElement extends Components.RevoList, HTMLStencilElement {
        addEventListener<K extends keyof HTMLRevoListElementEventMap>(type: K, listener: (this: HTMLRevoListElement, ev: RevoListCustomEvent<HTMLRevoListElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLRevoListElementEventMap>(type: K, listener: (this: HTMLRevoListElement, ev: RevoListCustomEvent<HTMLRevoListElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLRevoListElement: {
        prototype: HTMLRevoListElement;
        new (): HTMLRevoListElement;
    };
    interface HTMLElementTagNameMap {
        "revo-dropdown": HTMLRevoDropdownElement;
        "revo-list": HTMLRevoListElement;
    }
}
declare namespace LocalJSX {
    interface RevoDropdown {
        /**
          * Where to append element
         */
        "appendTo"?: 'body' | 'current';
        /**
          * Should dropdown autoclose on changeValue
         */
        "autoClose"?: boolean;
        "autoFocus"?: boolean;
        "autocomplete"?: boolean;
        /**
          * Filter value
         */
        "currentFilter"?: any;
        /**
          * Define object mapping for id/value
         */
        "dataId"?: string;
        /**
          * Define object mapping for labels
         */
        "dataLabel"?: string;
        /**
          * Filter criteria
         */
        "filter"?: 'contains' | 'start';
        "hasFilter"?: boolean;
        "maxHeight"?: number;
        /**
          * When value changed
         */
        "onChanged"?: (event: RevoDropdownCustomEvent<{ val: any; originalEvent?: MouseEvent }>) => void;
        /**
          * Before element close, can be prevented
         */
        "onClose"?: (event: RevoDropdownCustomEvent<any>) => void;
        /**
          * Before element open, can be prevented
         */
        "onOpen"?: (event: RevoDropdownCustomEvent<any>) => void;
        /**
          * Placeholder text
         */
        "placeholder"?: string;
        /**
          * Define object mapping for id/value
         */
        "source"?: any[];
        /**
          * Define your own vnode template
          * @example <revo-dropdown template={(h, item) => h('span', null, item.label)} />
         */
        "template"?: (h: Function, item: any) => VNode;
        /**
          * Selected value
         */
        "value"?: any;
    }
    interface RevoList {
        "isFocused"?: boolean;
        "onChanged"?: (event: RevoListCustomEvent<{ item: any; e: any }>) => void;
        /**
          * Selected Value Index
         */
        "selectedIndex"?: number;
        /**
          * Define object mapping for id/value
         */
        "sourceItems"?: any[];
        "template": (item: any) => VNode;
    }
    interface IntrinsicElements {
        "revo-dropdown": RevoDropdown;
        "revo-list": RevoList;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "revo-dropdown": LocalJSX.RevoDropdown & JSXBase.HTMLAttributes<HTMLRevoDropdownElement>;
            "revo-list": LocalJSX.RevoList & JSXBase.HTMLAttributes<HTMLRevoListElement>;
        }
    }
}
