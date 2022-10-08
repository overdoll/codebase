/**
 * @generated SignedSource<<9ccf7f18a7bd3b0933a41d1568c8b8b3>>
 * @relayHash 73fa36fd2e7c724790935678b63d43c1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 73fa36fd2e7c724790935678b63d43c1

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubsDisplayQuery$variables = {};
export type ClubsDisplayQuery$data = {
  readonly clubs: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly " $fragmentSpreads": FragmentRefs<"FancyClubIcon">;
      };
    }>;
  };
};
export type ClubsDisplayQuery = {
  response: ClubsDisplayQuery$data;
  variables: ClubsDisplayQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "canSupport",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
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
v4 = [
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
        "name": "icon",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "mini",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubsDisplayQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ClubConnection",
        "kind": "LinkedField",
        "name": "clubs",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Club",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "FancyClubIcon"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "clubs(canSupport:true,first:10)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ClubsDisplayQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ClubConnection",
        "kind": "LinkedField",
        "name": "clubs",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Club",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "thumbnailMedia",
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
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isMedia"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v4/*: any*/),
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
                            "selections": (v4/*: any*/),
                            "storageKey": null
                          },
                          (v1/*: any*/)
                        ],
                        "type": "VideoMedia",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v1/*: any*/)
                        ],
                        "type": "RawMedia",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "clubs(canSupport:true,first:10)"
      }
    ]
  },
  "params": {
    "id": "73fa36fd2e7c724790935678b63d43c1",
    "metadata": {},
    "name": "ClubsDisplayQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "5f5d3dbb8e40427036a3bc406fe6ef06";

export default node;
