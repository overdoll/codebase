/**
 * @generated SignedSource<<3bbac91f8c5c6140f08090efc33dbb44>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostStaticCategoriesFragment$data = {
  readonly categories: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
  }>;
  readonly " $fragmentType": "PostStaticCategoriesFragment";
};
export type PostStaticCategoriesFragment$key = {
  readonly " $data"?: PostStaticCategoriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostStaticCategoriesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStaticCategoriesFragment",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "9d6de798b0faae2a3acdc30ddd1e75df";

export default node;
