
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let dataLabel = undefined;
export let value = undefined;
export let currentFilter = undefined;
export let dataId = undefined;
export let autoClose = undefined;
export let source = undefined;
export let placeholder = undefined;
export let appendTo = undefined;
export let filter = undefined;
export let maxHeight = undefined;
export let hasFilter = undefined;
export let autocomplete = undefined;
export let autoFocus = undefined;

export const doClose = (...args) => __ref.doClose(...args);
export const doOpen = (...args) => __ref.doOpen(...args);
export const doChange = (...args) => __ref.doChange(...args);

export const getWebComponent = () => __ref;

onMount(() => { __mounted = true; });

const setProp = (prop, value) => { if (__ref) __ref[prop] = value; };

$: if (__mounted) setProp('source', source);

const onEvent = (e) => {
  e.stopPropagation();
  dispatch(e.type, e.detail);
};
</script>

<revo-dropdown 
  data-label={dataLabel}
  value={value}
  current-filter={currentFilter}
  data-id={dataId}
  auto-close={autoClose}
  placeholder={placeholder}
  append-to={appendTo}
  filter={filter}
  max-height={maxHeight}
  has-filter={hasFilter}
  autocomplete={autocomplete}
  auto-focus={autoFocus}
  on:changeValue={onEvent}
  on:close={onEvent}
  on:open={onEvent}
  bind:this={__ref}
>
  <slot></slot>
</revo-dropdown>
  