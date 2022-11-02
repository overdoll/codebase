/**
 * @generated SignedSource<<b4b34e5a68223d37081a15e4710862ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PopularTagsCardsFragment$data = {
  readonly tags: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: string;
        readonly __id: string;
        readonly " $fragmentSpreads": FragmentRefs<"SearchResultsUnionFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "PopularTagsCardsFragment";
};
export type PopularTagsCardsFragment$key = {
  readonly " $data"?: PopularTagsCardsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PopularTagsCardsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PopularTagsCardsFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 9
        }
      ],
      "concreteType": "TagConnection",
      "kind": "LinkedField",
      "name": "tags",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "TagEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SearchResultsUnionFragment"
                },
                {
                  "kind": "ClientExtension",
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "__id",
                      "storageKey": null
                    }
                  ]
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "tags(first:9)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "caa22b2c4cda2d1cfa9dde4868e290a5";

export default node;
