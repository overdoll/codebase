/**
 * @generated SignedSource<<80efe34691d61d47e78de86a54a6a366>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TagsPublicPostFragment$data = {
  readonly categories: ReadonlyArray<{
    readonly __typename: "Category";
  }>;
  readonly characters: ReadonlyArray<{
    readonly __typename: "Character";
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewCategoriesFragment" | "PostPreviewCharactersFragment" | "PostPreviewSeriesFragment">;
  readonly " $fragmentType": "TagsPublicPostFragment";
};
export type TagsPublicPostFragment$key = {
  readonly " $data"?: TagsPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TagsPublicPostFragment">;
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
  "name": "TagsPublicPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostPreviewCharactersFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostPreviewCategoriesFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostPreviewSeriesFragment"
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
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "ea41c53de815e7cdd60694bbb0d0d579";

export default node;
