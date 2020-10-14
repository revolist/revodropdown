import { EventEmitter } from "../../stencil-public-runtime";
export declare class RevoDropdownList {
  currentItem: number;
  private selectedEl;
  /**
   * Define object mapping for id/value
   */
  sourceItems: any[];
  isFocused: boolean;
  /**
 * Define object mapping for labels
 */
  dataLabel: string;
  doChange: EventEmitter<{
    item: any;
    e: any;
  }>;
  /** Recived keyboard down from element */
  onKey(e: KeyboardEvent): void;
  refresh(source: any[]): Promise<void>;
  componentDidRender(): void;
  render(): any;
}
