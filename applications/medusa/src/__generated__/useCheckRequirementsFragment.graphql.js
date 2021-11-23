/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type useCheckRequirementsFragment$ref: FragmentReference;
declare export opaque type useCheckRequirementsFragment$fragmentType: useCheckRequirementsFragment$ref;
export type useCheckRequirementsFragment = {|
  +content: $ReadOnlyArray<{|
    +__typename: string
  |}>,
  +audience: ?{|
    +__typename: string
  |},
  +brand: ?{|
    +__typename: string
  |},
  +categories: $ReadOnlyArray<{|
    +__typename: string
  |}>,
  +characters: $ReadOnlyArray<{|
    +__typename: string
  |}>,
  +$refType: useCheckRequirementsFragment$ref,
|};
export type useCheckRequirementsFragment$data = useCheckRequirementsFragment;
export type useCheckRequirementsFragment$key = {
  +$data?: useCheckRequirementsFragment$data,
  +$fragmentRefs: useCheckRequirementsFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useCheckRequirementsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Audience",
      "kind": "LinkedField",
      "name": "audience",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Brand",
      "kind": "LinkedField",
      "name": "brand",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Category",
      "kind": "LinkedField",
      "name": "categories",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = 'b17933f1f7c57d1bdb2a54c575d46161';
module.exports = node;
