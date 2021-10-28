/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FlowStepsTagFragment$ref } from "./FlowStepsTagFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type UpdatePostFlowTagFragment$ref: FragmentReference;
declare export opaque type UpdatePostFlowTagFragment$fragmentType: UpdatePostFlowTagFragment$ref;
export type UpdatePostFlowTagFragment = {|
  +$fragmentRefs: FlowStepsTagFragment$ref,
  +$refType: UpdatePostFlowTagFragment$ref,
|};
export type UpdatePostFlowTagFragment$data = UpdatePostFlowTagFragment;
export type UpdatePostFlowTagFragment$key = {
  +$data?: UpdatePostFlowTagFragment$data,
  +$fragmentRefs: UpdatePostFlowTagFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdatePostFlowTagFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FlowStepsTagFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '75f7d6df633383d51d668e8e4f5b970e';
module.exports = node;
