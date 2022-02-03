/**
 * @generated SignedSource<<8b2d00066dafec1d0bf89cec4377a17f>>
 * @relayHash 353c52a51e6ae6464e7ba9147608f9e0
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
<<<<<<< HEAD:applications/medusa/src/__generated__/AudienceMultiSelectorQuery.graphql.ts
/* @relayHash c419aff5d729ae86133b5da187285e24 */
=======
>>>>>>> master:applications/medusa/src/__generated__/AudiencesQuery.graphql.ts

// @relayRequestID 353c52a51e6ae6464e7ba9147608f9e0

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
<<<<<<< HEAD:applications/medusa/src/__generated__/AudienceMultiSelectorQuery.graphql.ts
export type AudienceMultiSelectorQueryVariables = {};
export type AudienceMultiSelectorQueryResponse = {
    readonly audiences: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly title: string;
                readonly " $fragmentRefs": FragmentRefs<"AudienceTileOverlayFragment">;
            };
        }>;
    };
};
export type AudienceMultiSelectorQuery = {
    readonly response: AudienceMultiSelectorQueryResponse;
    readonly variables: AudienceMultiSelectorQueryVariables;
};



/*
query AudienceMultiSelectorQuery {
  audiences {
    edges {
      node {
        id
        title
        ...AudienceTileOverlayFragment
      }
    }
  }
}

fragment AudienceTileOverlayFragment on Audience {
  title
  thumbnail {
    ...ResourceItemFragment
    id
  }
}

fragment ImageSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}

fragment ResourceItemFragment on Resource {
  type
  ...ImageSnippetFragment
  ...VideoSnippetFragment
}

fragment VideoSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}
*/

=======
export type AudiencesQuery$variables = {};
export type AudiencesQueryVariables = AudiencesQuery$variables;
export type AudiencesQuery$data = {
  readonly audiences: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly title: string;
        readonly " $fragmentSpreads": FragmentRefs<"AudienceTileOverlayFragment">;
      };
    }>;
  };
};
export type AudiencesQueryResponse = AudiencesQuery$data;
export type AudiencesQuery = {
  variables: AudiencesQueryVariables;
  response: AudiencesQuery$data;
};

>>>>>>> master:applications/medusa/src/__generated__/AudiencesQuery.graphql.ts
const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AudienceMultiSelectorQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AudienceConnection",
        "kind": "LinkedField",
        "name": "audiences",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AudienceEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Audience",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "AudienceTileOverlayFragment"
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
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AudienceMultiSelectorQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AudienceConnection",
        "kind": "LinkedField",
        "name": "audiences",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AudienceEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Audience",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Resource",
                    "kind": "LinkedField",
                    "name": "thumbnail",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "type",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ResourceUrl",
                        "kind": "LinkedField",
                        "name": "urls",
                        "plural": true,
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
                            "name": "mimeType",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v0/*: any*/)
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "c419aff5d729ae86133b5da187285e24",
    "metadata": {},
    "name": "AudienceMultiSelectorQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
<<<<<<< HEAD:applications/medusa/src/__generated__/AudienceMultiSelectorQuery.graphql.ts
(node as any).hash = 'df5243268b0bf531c2745a3c5d4027d6';
=======

(node as any).hash = "81a8d3ff43d094e4672ca3a0c9128ce7";

>>>>>>> master:applications/medusa/src/__generated__/AudiencesQuery.graphql.ts
export default node;
