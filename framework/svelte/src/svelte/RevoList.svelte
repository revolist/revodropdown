
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let sourceItems = undefined;
export let isFocused = undefined;
export let dataLabel = undefined;

export const refresh = (...args) => __ref.refresh(...args);

export const getWebComponent = () => __ref;

onMount(() => { __mounted = true; });

const setProp = (prop, value) => { if (__ref) __ref[prop] = value; };

$: if (__mounted) setProp('sourceItems', sourceItems);

const onEvent = (e) => {
  e.stopPropagation();
  dispatch(e.type, e.detail);
};
</script>

<revo-list 
  is-focused={isFocused}
  data-label={dataLabel}
  on:doChange={onEvent}
  bind:this={__ref}
>
  <slot></slot>
</revo-list>
  