import { Component, h, Prop, Event, EventEmitter, Watch, Method } from "@stencil/core";
import { getItemLabel } from "../../utils/item.helpers";

@Component({ tag: 'revo-list-filter' })
export class RevoDropdownListFilter {
    @Prop() filter: 'contains'|'start' = 'contains';
    @Prop() hasFilter: boolean = true;
    /**
     * Define object mapping for id/value
     */
    @Prop() source: any[];
    /**
     * Define object mapping for labels
     */
    @Prop() dataLabel: string;
    @Prop() filterByValue: string = '';
    @Event({ bubbles: false }) filterChange: EventEmitter<string|undefined>;
		@Event({ bubbles: false }) doChange: EventEmitter<{ item: any, e: any }>;
	
		@Prop() isFocused: boolean = false;
    

    private revoList: HTMLRevoListElement;
    private filterEl: HTMLInputElement;
    private filterValue: string = '';
    private sourceItems: any[] = [];
    @Watch('source') onSourceChange() {
			this.doFilter(this.filterValue);
    }
    @Method() async doFilter(val?: string) {
			let newSource = [];
			this.filterValue = val.trim().toLocaleLowerCase();
			if (!this.filterValue) {
				newSource = this.source;
			} else {
				for (let item of this.source) {
					let val = getItemLabel(item, this.dataLabel);
					if (typeof val === 'string') {
							val = val.toLocaleLowerCase();
							switch (this.filter) {
								case 'start':
									if (val.indexOf(this.filterValue) === 0) {
										newSource.push(item);
									}
									break;
								default:
									if (val.indexOf(this.filterValue) > -1) {
										newSource.push(item);
									}
									break;
							}
					}
				}
			}

			this.sourceItems = newSource;
			this.revoList?.refresh(this.sourceItems);
		}
		private onFilter(val?: string) {
			this.doFilter(val);
			this.filterChange.emit(val);
		}
    private renderFilter() {
      return <input class="filter-box" type="text" ref={e => this.filterEl = e} value={this.filterValue} onInput={e => this.onFilter((e.currentTarget as HTMLInputElement)?.value)}/>;
		}

		componentWillLoad() {
			this.filterValue = this.filterByValue;
			this.onSourceChange();
		}

		componentDidRender() {
			if (this.hasFilter) {
				setTimeout(() => {
					this.filterEl?.focus({
						preventScroll: true
					});
				}, 0);
			}
		}

    render() {
			return [this.hasFilter ? this.renderFilter() : '',
				<revo-list
					ref={e => this.revoList = e}
					isFocused={this.isFocused}
					sourceItems={this.sourceItems}
					dataLabel={this.dataLabel}
					onDoChange={e => this.doChange.emit(e.detail)}/>];
    }
}

