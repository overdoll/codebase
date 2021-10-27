/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { ArrangeFragment$ref } from "./ArrangeFragment.graphql";
import type { FlowFooterFragment$ref } from "./FlowFooterFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type UpdatePostFlowFragment$ref: FragmentReference;
declare export opaque type UpdatePostFlowFragment$fragmentType: UpdatePostFlowFragment$ref;
export type UpdatePostFlowFragment = {|
  +id: string,
  +content: $ReadOnlyArray<{|
    +urls: $ReadOnlyArray<{|
      +url: any
    |}>
  |}>,
  +$fragmentRefs: ArrangeFragment$ref & FlowFooterFragment$ref,
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
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ResourceUrl",
          "kind": "LinkedField",
          "name": "urls",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeFragment"
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
(node: any).hash = '86509a3939e4556bb98fc273d7e70885';
module.exports = node;
