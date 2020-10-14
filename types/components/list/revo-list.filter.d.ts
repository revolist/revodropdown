import { EventEmitter } from "../../stencil-public-runtime";
export declare class RevoDropdownListFilter {
  filter: 'contains' | 'start';
  hasFilter: boolean;
  /**
   * Define object mapping for id/value
   */
  source: any[];
  /**
   * Define object mapping for labels
   */
  dataLabel: string;
  filterByValue: string;
  filterChange: EventEmitter<string | undefined>;
  doChange: EventEmitter<{
    item: any;
    e: any;
  }>;
  isFocused: boolean;
  private revoList;
  private filterEl;
  private filterValue;
  private sourceItems;
  onSourceChange(): void;
  doFilter(val?: string): Promise<void>;
  private onFilter;
  private renderFilter;
  componentWillLoad(): void;
  componentDidRender(): void;
  render(): any[];
}
