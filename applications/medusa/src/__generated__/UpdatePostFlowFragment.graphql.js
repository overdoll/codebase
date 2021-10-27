/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FlowFooterFragment$ref } from "./FlowFooterFragment.graphql";
import type { FlowStepsFragment$ref } from "./FlowStepsFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type UpdatePostFlowFragment$ref: FragmentReference;
declare export opaque type UpdatePostFlowFragment$fragmentType: UpdatePostFlowFragment$ref;
export type UpdatePostFlowFragment = {|
  +$fragmentRefs: FlowStepsFragment$ref & FlowFooterFragment$ref,
  +$refType: UpdatePostFlowFragment$ref,
|};
export type UpdatePostFlowFragment$data = UpdatePostFlowFragment;
export type UpdatePostFlowFragment$key = {
  +$data?: UpdatePostFlowFragment$data,
  +$fragmentRefs: UpdatePostFlowFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdatePostFlowFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FlowStepsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FlowFooterFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '1c1c088c9034887f82a14c099cf3e355';
module.exports = node;
