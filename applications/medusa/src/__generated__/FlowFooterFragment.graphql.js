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
  +post: ?{|
    +$fragmentRefs: FlowForwardButtonFragment$ref
  |},
  +$refType: FlowFooterFragment$ref,
|};
export type FlowFooterFragment$data = FlowFooterFragment;
export type FlowFooterFragment$key = {
  +$data?: FlowFooterFragment$data,
  +$fragmentRefs: FlowFooterFragment$ref,
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
  "name": "FlowFooterFragment",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "FlowForwardButtonFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'c25ba774c1fdad32628d3956ac08e6d8';
module.exports = node;
