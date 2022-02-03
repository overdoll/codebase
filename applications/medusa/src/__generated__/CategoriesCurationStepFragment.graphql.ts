/**
 * @generated SignedSource<<6c8f3afc46f103727fd5ead5ed2e080e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategoriesCurationStepFragment$data = {
  readonly category: {
    readonly categories: ReadonlyArray<{
      readonly id: string;
      readonly title: string;
    }>;
  };
  readonly " $fragmentType": "CategoriesCurationStepFragment";
};
export type CategoriesCurationStepFragment = CategoriesCurationStepFragment$data;
export type CategoriesCurationStepFragment$key = {
  readonly " $data"?: CategoriesCurationStepFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CategoriesCurationStepFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoriesCurationStepFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CategoryCurationProfile",
      "kind": "LinkedField",
      "name": "category",
      "plural": false,
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
      "storageKey": null
    }
  ],
  "type": "CurationProfile",
  "abstractKey": null
};

(node as any).hash = "182203d2b95a3f85cf9d555247424286";

export default node;
