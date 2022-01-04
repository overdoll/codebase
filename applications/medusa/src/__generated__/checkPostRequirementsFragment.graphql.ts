/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type checkPostRequirementsFragment = {
    readonly content: ReadonlyArray<{
        readonly __typename: string;
    }>;
    readonly audience: {
        readonly __typename: string;
    } | null;
    readonly categories: ReadonlyArray<{
        readonly __typename: string;
    }>;
    readonly characters: ReadonlyArray<{
        readonly __typename: string;
    }>;
    readonly " $refType": "checkPostRequirementsFragment";
};
export type checkPostRequirementsFragment$data = checkPostRequirementsFragment;
export type checkPostRequirementsFragment$key = {
    readonly " $data"?: checkPostRequirementsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"checkPostRequirementsFragment">;
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
  "name": "checkPostRequirementsFragment",
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
(node as any).hash = '7afa0771be015a72bbc20dbefde6104e';
export default node;
