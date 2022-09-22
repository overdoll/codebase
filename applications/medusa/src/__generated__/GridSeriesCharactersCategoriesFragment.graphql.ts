/**
 * @generated SignedSource<<e869e9cffe1e1bf0ea3bac8747654729>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GridSeriesCharactersCategoriesFragment$data = {
  readonly categories: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"PreviewCategoryTileHomeFragment">;
      };
    }>;
  };
  readonly characters: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"PreviewCharacterTileHomeFragment">;
      };
    }>;
  };
  readonly series: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"PreviewSeriesTileHomeFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "GridSeriesCharactersCategoriesFragment";
};
export type GridSeriesCharactersCategoriesFragment$key = {
  readonly " $data"?: GridSeriesCharactersCategoriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GridSeriesCharactersCategoriesFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "first",
  "value": 3
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GridSeriesCharactersCategoriesFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "excludeEmpty",
          "value": true
        },
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "sortBy",
          "value": "POPULAR"
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PreviewCategoryTileHomeFragment"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "categories(excludeEmpty:true,first:3,sortBy:\"POPULAR\")"
    },
    {
      "alias": null,
      "args": [
        (v0/*: any*/)
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
                  "name": "PreviewCharacterTileHomeFragment"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "characters(first:3)"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 2
        }
      ],
      "concreteType": "SeriesConnection",
      "kind": "LinkedField",
      "name": "series",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SeriesEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Series",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PreviewSeriesTileHomeFragment"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "series(first:2)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "619b2e6761f0ff819e1670e7f610351e";

export default node;
