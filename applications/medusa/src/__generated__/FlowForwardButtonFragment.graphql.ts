/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FlowForwardButtonFragment = {
    readonly id: string;
    readonly content: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly audience: {
        readonly id: string;
    } | null;
    readonly brand: {
        readonly id: string;
    } | null;
    readonly categories: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly characters: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"useUpdateContentFragment" | "useUpdateAudienceFragment" | "useUpdateBrandFragment" | "useUpdateCategoryFragment" | "useUpdateCharacterFragment" | "useSubmitPostFragment">;
    readonly " $refType": "FlowForwardButtonFragment";
};
export type FlowForwardButtonFragment$data = FlowForwardButtonFragment;
export type FlowForwardButtonFragment$key = {
    readonly " $data"?: FlowForwardButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FlowForwardButtonFragment">;
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
(node as any).hash = 'dbf64aad155cc6f52b4ca96c03c2ddac';
export default node;
