/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useCheckRequirementsFragment = {
    readonly content: ReadonlyArray<{
        readonly __typename: string;
    }>;
    readonly audience: {
        readonly __typename: string;
    } | null;
    readonly brand: {
        readonly __typename: string;
    } | null;
    readonly categories: ReadonlyArray<{
        readonly __typename: string;
    }>;
    readonly characters: ReadonlyArray<{
        readonly __typename: string;
    }>;
    readonly " $refType": "useCheckRequirementsFragment";
};
export type useCheckRequirementsFragment$data = useCheckRequirementsFragment;
export type useCheckRequirementsFragment$key = {
    readonly " $data"?: useCheckRequirementsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"useCheckRequirementsFragment">;
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
(node as any).hash = 'b17933f1f7c57d1bdb2a54c575d46161';
export default node;
