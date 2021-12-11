/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { useSubmitPostFragment$ref } from "./useSubmitPostFragment.graphql";
import type { useUpdateAudienceFragment$ref } from "./useUpdateAudienceFragment.graphql";
import type { useUpdateBrandFragment$ref } from "./useUpdateBrandFragment.graphql";
import type { useUpdateCategoryFragment$ref } from "./useUpdateCategoryFragment.graphql";
import type { useUpdateCharacterFragment$ref } from "./useUpdateCharacterFragment.graphql";
import type { useUpdateContentFragment$ref } from "./useUpdateContentFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type FlowForwardButtonFragment$ref: FragmentReference;
declare export opaque type FlowForwardButtonFragment$fragmentType: FlowForwardButtonFragment$ref;
export type FlowForwardButtonFragment = {|
  +id: string,
  +content: $ReadOnlyArray<{|
    +id: string
  |}>,
  +audience: ?{|
    +id: string
  |},
  +brand: ?{|
    +id: string
  |},
  +categories: $ReadOnlyArray<{|
    +id: string
  |}>,
  +characters: $ReadOnlyArray<{|
    +id: string
  |}>,
  +$fragmentRefs: useUpdateContentFragment$ref & useUpdateAudienceFragment$ref & useUpdateBrandFragment$ref & useUpdateCategoryFragment$ref & useUpdateCharacterFragment$ref & useSubmitPostFragment$ref,
  +$refType: FlowForwardButtonFragment$ref,
|};
export type FlowForwardButtonFragment$data = FlowForwardButtonFragment;
export type FlowForwardButtonFragment$key = {
  +$data?: FlowForwardButtonFragment$data,
  +$fragmentRefs: FlowForwardButtonFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowForwardButtonFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Audience",
      "kind": "LinkedField",
      "name": "audience",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Brand",
      "kind": "LinkedField",
      "name": "brand",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Category",
      "kind": "LinkedField",
      "name": "categories",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useUpdateContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useUpdateAudienceFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useUpdateBrandFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useUpdateCategoryFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useUpdateCharacterFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useSubmitPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = 'dbf64aad155cc6f52b4ca96c03c2ddac';
module.exports = node;
