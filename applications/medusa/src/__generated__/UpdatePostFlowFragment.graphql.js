/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { ArrangeFragment$ref } from "./ArrangeFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type UpdatePostFlowFragment$ref: FragmentReference;
declare export opaque type UpdatePostFlowFragment$fragmentType: UpdatePostFlowFragment$ref;
export type UpdatePostFlowFragment = {|
  +id: string,
  +$fragmentRefs: ArrangeFragment$ref,
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'e82cd9ab275bfa0dac7f878b9e5335bc';
module.exports = node;
