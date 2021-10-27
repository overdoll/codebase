/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FlowForwardButtonFragment$ref } from "./FlowForwardButtonFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type FlowFooterFragment$ref: FragmentReference;
declare export opaque type FlowFooterFragment$fragmentType: FlowFooterFragment$ref;
export type FlowFooterFragment = {|
  +$fragmentRefs: FlowForwardButtonFragment$ref,
  +$refType: FlowFooterFragment$ref,
|};
export type FlowFooterFragment$data = FlowFooterFragment;
export type FlowFooterFragment$key = {
  +$data?: FlowFooterFragment$data,
  +$fragmentRefs: FlowFooterFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowFooterFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FlowForwardButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'd166dc317911679a6b21a2f779ae9498';
module.exports = node;
