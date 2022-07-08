/**
 * @generated SignedSource<<2524f43ca9f27334a39650dc07c2eec9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostClickableCategoriesFragment$data = {
  readonly categories: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ClickableCategoryFragment">;
  }>;
  readonly " $fragmentType": "PostClickableCategoriesFragment";
};
export type PostClickableCategoriesFragment$key = {
  readonly " $data"?: PostClickableCategoriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostClickableCategoriesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostClickableCategoriesFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Category",
      "kind": "LinkedField",
      "name": "categories",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClickableCategoryFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "812aa6ee171e3b6c6c5180bb2f63e9fc";

export default node;
