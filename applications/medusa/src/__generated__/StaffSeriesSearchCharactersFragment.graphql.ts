/**
 * @generated SignedSource<<f501bf2dbba47c59652a3e3ce8c615c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffSeriesSearchCharactersFragment$data = {
  readonly characters: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly series: {
          readonly slug: string;
        } | null;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"CharacterTileOverlayFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "StaffSeriesSearchCharactersFragment";
};
export type StaffSeriesSearchCharactersFragment$key = {
  readonly " $data"?: StaffSeriesSearchCharactersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffSeriesSearchCharactersFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "characters"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 9,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "slug"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./StaffSeriesSearchCharactersPaginationFragment.graphql')
    }
  },
  "name": "StaffSeriesSearchCharactersFragment",
  "selections": [
    {
      "alias": "characters",
      "args": [
        {
          "kind": "Variable",
          "name": "seriesSlug",
          "variableName": "slug"
        }
      ],
      "concreteType": "CharacterConnection",
      "kind": "LinkedField",
      "name": "__StaffSeriesSearchCharacters_characters_connection",
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
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Series",
                  "kind": "LinkedField",
                  "name": "series",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/)
                  ],
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CharacterTileOverlayFragment"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
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
})();

(node as any).hash = "484cebf880fbc6381e8052834cf0b2c1";

export default node;
