/**
 * @generated SignedSource<<32713267a7140430a585b046ff2ad24d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPreviewCategoriesFragment$data = {
  readonly categories: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"CategoryLinkTileFragment" | "PreviewCategoryFragment">;
  }>;
  readonly " $fragmentType": "PostPreviewCategoriesFragment";
};
export type PostPreviewCategoriesFragment$key = {
  readonly " $data"?: PostPreviewCategoriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewCategoriesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPreviewCategoriesFragment",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PreviewCategoryFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CategoryLinkTileFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "a6ed43590756e5b66507bb26eb4d3bcd";

export default node;
