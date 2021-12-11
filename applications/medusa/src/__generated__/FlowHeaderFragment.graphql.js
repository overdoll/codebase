/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { useCheckRequirementsFragment$ref } from "./useCheckRequirementsFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type FlowHeaderFragment$ref: FragmentReference;
declare export opaque type FlowHeaderFragment$fragmentType: FlowHeaderFragment$ref;
export type FlowHeaderFragment = {|
  +post: ?{|
    +id: string,
    +$fragmentRefs: useCheckRequirementsFragment$ref,
  |},
  +$refType: FlowHeaderFragment$ref,
|};
export type FlowHeaderFragment$data = FlowHeaderFragment;
export type FlowHeaderFragment$key = {
  +$data?: FlowHeaderFragment$data,
  +$fragmentRefs: FlowHeaderFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "reference"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "reference",
          "variableName": "reference"
        }
      ],
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "post",
      "plural": false,
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
          "name": "useCheckRequirementsFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'c9a89850dc421832044804f86863c336';
module.exports = node;
