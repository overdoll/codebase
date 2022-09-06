/**
 * @generated SignedSource<<04e289645160152a4d992f73aa092e78>>
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
    readonly id: string;
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
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

(node as any).hash = "2b12bd30c3514e83388e82be94260160";

export default node;
