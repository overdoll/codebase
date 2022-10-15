/**
 * @generated SignedSource<<739f9c0a57eeb1259d23a0cbd6350441>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchSeriesRecommendationsFragment$data = {
  readonly characters: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"ClickableCharacterFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "SearchSeriesRecommendationsFragment";
};
export type SearchSeriesRecommendationsFragment$key = {
  readonly " $data"?: SearchSeriesRecommendationsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchSeriesRecommendationsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchSeriesRecommendationsFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 5
        }
      ],
      "concreteType": "CharacterConnection",
      "kind": "LinkedField",
      "name": "characters",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CharacterEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Character",
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
                  "name": "ClickableCharacterFragment"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "characters(first:5)"
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "6bfe3e3e28449b1e7e529d5a202a1116";

export default node;
