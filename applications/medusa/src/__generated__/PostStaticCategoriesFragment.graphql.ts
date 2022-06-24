/**
 * @generated SignedSource<<45b1bdba7b26d3ec05542ea6ce22cd79>>
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

(node as any).hash = "8f007b2872c334c2b4070013f8aa62f1";

export default node;
