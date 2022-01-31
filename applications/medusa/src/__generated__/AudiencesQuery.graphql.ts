/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 353c52a51e6ae6464e7ba9147608f9e0 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AudiencesQueryVariables = {};
export type AudiencesQueryResponse = {
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
export type AudiencesQuery = {
    readonly response: AudiencesQueryResponse;
    readonly variables: AudiencesQueryVariables;
};



/*
query AudiencesQuery {
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
    "name": "AudiencesQuery",
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
    "name": "AudiencesQuery",
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
    "id": "353c52a51e6ae6464e7ba9147608f9e0",
    "metadata": {},
    "name": "AudiencesQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '81a8d3ff43d094e4672ca3a0c9128ce7';
export default node;
