/**
 * @generated SignedSource<<c2e473007920d5f801ac6fe8ed00bb40>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadSearchCharactersMultiSelectorFragment$data = {
  readonly characters: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly " $fragmentSpreads": FragmentRefs<"CharacterTileOverlayFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "UploadSearchCharactersMultiSelectorFragment";
};
export type UploadSearchCharactersMultiSelectorFragment$key = {
  readonly " $data"?: UploadSearchCharactersMultiSelectorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadSearchCharactersMultiSelectorFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "characters"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "clubCharacters"
    },
    {
      "defaultValue": 14,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "name"
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
      "operation": require('./UploadSearchCharactersMultiSelectorPaginationFragment.graphql')
    }
  },
  "name": "UploadSearchCharactersMultiSelectorFragment",
  "selections": [
    {
      "alias": "characters",
      "args": [
        {
          "kind": "Variable",
          "name": "clubCharacters",
          "variableName": "clubCharacters"
        },
        {
          "kind": "Variable",
          "name": "name",
          "variableName": "name"
        }
      ],
      "concreteType": "CharacterConnection",
      "kind": "LinkedField",
      "name": "__UploadSearchCharactersMultiSelector_characters_connection",
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
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

(node as any).hash = "2d444fe4121f0f8d5f865bd491335f54";

export default node;
