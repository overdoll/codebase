/**
 * @generated SignedSource<<ef4061cfcc9bad8e2f277169d96bad18>>
 * @relayHash 544688170b5a52a9933af94aa14a4d54
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 544688170b5a52a9933af94aa14a4d54

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadSearchClubCharactersMultiSelectorQuery$variables = {
  name?: string | null;
  slug: string;
};
export type UploadSearchClubCharactersMultiSelectorQuery$data = {
  readonly club: {
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"UploadSearchClubCharactersMultiSelectorFragment">;
  } | null;
};
export type UploadSearchClubCharactersMultiSelectorQuery = {
  response: UploadSearchClubCharactersMultiSelectorQuery$data;
  variables: UploadSearchClubCharactersMultiSelectorQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "kind": "Variable",
  "name": "name",
  "variableName": "name"
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 14
  },
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = [
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
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UploadSearchClubCharactersMultiSelectorQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": [
              (v3/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "UploadSearchClubCharactersMultiSelectorFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UploadSearchClubCharactersMultiSelectorQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
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
                      (v5/*: any*/),
                      (v6/*: any*/),
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
                          (v5/*: any*/)
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
                          (v6/*: any*/),
                          (v5/*: any*/)
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
                          (v7/*: any*/),
                          {
                            "kind": "TypeDiscriminator",
                            "abstractKey": "__isMedia"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v8/*: any*/),
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
                                "selections": (v8/*: any*/),
                                "storageKey": null
                              },
                              (v5/*: any*/)
                            ],
                            "type": "VideoMedia",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v5/*: any*/)
                            ],
                            "type": "RawMedia",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v7/*: any*/)
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
            "args": (v4/*: any*/),
            "filters": [
              "name"
            ],
            "handle": "connection",
            "key": "UploadSearchOriginalCharactersMultiSelector_characters",
            "kind": "LinkedHandle",
            "name": "characters"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "544688170b5a52a9933af94aa14a4d54",
    "metadata": {},
    "name": "UploadSearchClubCharactersMultiSelectorQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "787615f3ab14df06210289e23c815e6b";

export default node;
