/**
 * @generated SignedSource<<2be7484d7704538da0305933ae346c82>>
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
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "seriesSlug"
    }
  ],
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
          "value": 3
        },
        {
          "kind": "Variable",
          "name": "seriesSlug",
          "variableName": "seriesSlug"
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
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "bd2f6b32d51e3954083cfe89a50120ce";

export default node;
