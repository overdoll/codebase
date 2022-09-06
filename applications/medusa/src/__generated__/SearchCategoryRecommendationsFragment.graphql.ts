/**
 * @generated SignedSource<<3e8f6db389accd800c8a9ae0282cbb28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCategoryRecommendationsFragment$data = {
  readonly categories: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"ClickableCategoryFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "SearchCategoryRecommendationsFragment";
};
export type SearchCategoryRecommendationsFragment$key = {
  readonly " $data"?: SearchCategoryRecommendationsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCategoryRecommendationsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchCategoryRecommendationsFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 7
        }
      ],
      "concreteType": "CategoryConnection",
      "kind": "LinkedField",
      "name": "categories",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CategoryEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Category",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
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
          "storageKey": null
        }
      ],
      "storageKey": "categories(first:7)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "aa65314e8e8433d05825371e5b9e91ee";

export default node;
