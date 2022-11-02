/**
 * @generated SignedSource<<206ff59750898528cb0218b0efb878e9>>
 * @relayHash 2ee69cf5c1c4357d7e149b7be29b3078
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 2ee69cf5c1c4357d7e149b7be29b3078

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadSearchOtherCharactersMultiSelectorQuery$variables = {
  name?: string | null;
};
export type UploadSearchOtherCharactersMultiSelectorQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UploadSearchOtherCharactersMultiSelectorFragment">;
};
export type UploadSearchOtherCharactersMultiSelectorQuery = {
  response: UploadSearchOtherCharactersMultiSelectorQuery$data;
  variables: UploadSearchOtherCharactersMultiSelectorQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  }
],
v1 = {
  "kind": "Variable",
  "name": "name",
  "variableName": "name"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 14
  },
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ColorPalette",
    "kind": "LinkedField",
    "name": "colorPalettes",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "red",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "green",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "blue",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ImageMediaVariants",
    "kind": "LinkedField",
    "name": "variants",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "banner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "url",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "width",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "height",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UploadSearchOtherCharactersMultiSelectorQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "UploadSearchOtherCharactersMultiSelectorFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UploadSearchOtherCharactersMultiSelectorQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Series",
                    "kind": "LinkedField",
                    "name": "series",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Club",
                    "kind": "LinkedField",
                    "name": "club",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "bannerMedia",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isMedia"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v6/*: any*/),
                        "type": "ImageMedia",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ImageMedia",
                            "kind": "LinkedField",
                            "name": "cover",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "type": "VideoMedia",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/)
                        ],
                        "type": "RawMedia",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
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
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": [
          "name"
        ],
        "handle": "connection",
        "key": "UploadSearchCharactersMultiSelector_characters",
        "kind": "LinkedHandle",
        "name": "characters"
      }
    ]
  },
  "params": {
    "id": "2ee69cf5c1c4357d7e149b7be29b3078",
    "metadata": {},
    "name": "UploadSearchOtherCharactersMultiSelectorQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "24e9a0c3edd75693c276e7480d22b788";

export default node;
