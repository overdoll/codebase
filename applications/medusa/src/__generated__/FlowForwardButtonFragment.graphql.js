/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type FlowForwardButtonFragment$ref: FragmentReference;
declare export opaque type FlowForwardButtonFragment$fragmentType: FlowForwardButtonFragment$ref;
export type FlowForwardButtonFragment = {|
  +id: string,
  +$refType: FlowForwardButtonFragment$ref,
|};
export type FlowForwardButtonFragment$data = FlowForwardButtonFragment;
export type FlowForwardButtonFragment$key = {
  +$data?: FlowForwardButtonFragment$data,
  +$fragmentRefs: FlowForwardButtonFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowForwardButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '338ec13f085fba019b7cf4f7ebe6eafa';
module.exports = node;
