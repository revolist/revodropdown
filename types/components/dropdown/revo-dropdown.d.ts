import { EventEmitter } from '../../stencil-public-runtime';
import '../../utils/closestPolifill';
export declare class RevoDropdown {
  private element;
  private dropdown;
  private dropdownInner;
  private uuid;
  private currentFilter?;
  currentItem: any;
  isVisible: boolean;
  /**
   * Define object mapping for labels
   */
  dataLabel: string;
  /**
   * Selected value
   */
  value: any;
  /**
   * Define object mapping for id/value
   */
  dataId: string;
  /**
   * Should dropdown autoclose on changeValue
   */
  autoClose: boolean;
  /**
   * Define object mapping for id/value
   */
  source: any[];
  /**
   * Placeholder text
   */
  placeholder: string;
  /**
   * Where to append element
   */
  appendTo: 'body' | 'current';
  /**
   * Filter criteria
   */
  filter: 'contains' | 'start';
  hasFilter: boolean;
  /**
   * When value changed
   */
  changeValue: EventEmitter<{
    val: any;
    originalEvent?: MouseEvent;
  }>;
  /**
   * Before element close, can be prevented
   */
  close: EventEmitter;
  /**
   * Before element open, can be prevented
   */
  open: EventEmitter;
  /**
   * Close dropdown
   */
  doClose(): Promise<void>;
  /**
   * Open dropdown
   */
  doOpen(): Promise<void>;
  /**
   * Change value
   */
  doChange(val: any, originalEvent?: MouseEvent): Promise<void>;
  /** Action finished */
  onMouseUp(e: MouseEvent): void;
  onKey(e: KeyboardEvent): void;
  onValueChanged(newVal: any): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentDidRender(): void;
  private renderDropdown;
  render(): any;
  private updateStyles;
  private clientRectangle;
}
