/**
 * @generated SignedSource<<5dff31cc01b7fb40f62aa91ed4df45c2>>
 * @relayHash d4bc486e1029176a962d36fa8e89f544
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d4bc486e1029176a962d36fa8e89f544

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectTopicSearchQuery$variables = {};
export type SelectTopicSearchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SelectTopicSearchFragment">;
};
export type SelectTopicSearchQuery = {
  response: SelectTopicSearchQuery$data;
  variables: SelectTopicSearchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 12
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
  "name": "url",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SelectTopicSearchQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "SelectTopicSearchFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SelectTopicSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "TopicConnection",
        "kind": "LinkedField",
        "name": "topics",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TopicEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Topic",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Resource",
                    "kind": "LinkedField",
                    "name": "banner",
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
                        "kind": "ScalarField",
                        "name": "processed",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "preview",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "failed",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ResourceProgress",
                        "kind": "LinkedField",
                        "name": "progress",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "progress",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "state",
                            "storageKey": null
                          },
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ResourceUrl",
                        "kind": "LinkedField",
                        "name": "urls",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
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
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ResourceUrl",
                        "kind": "LinkedField",
                        "name": "videoThumbnail",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
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
        "storageKey": "topics(first:12)"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "StaffTopicsConnection_topics",
        "kind": "LinkedHandle",
        "name": "topics"
      }
    ]
  },
  "params": {
    "id": "d4bc486e1029176a962d36fa8e89f544",
    "metadata": {},
    "name": "SelectTopicSearchQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "1dbd6b4020a6d4baa43ad484c69cab4e";

export default node;
