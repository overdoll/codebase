/**
 * @generated SignedSource<<5d12161128ffcccc45a175471b9a4fa3>>
 * @relayHash 7ff03b3de6f52af6e8dce5de75c05639
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7ff03b3de6f52af6e8dce5de75c05639

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostReportsPaginationQuery$variables = {
  after?: string | null;
  first?: number | null;
  from: any;
  to?: any | null;
};
export type PostReportsPaginationQueryVariables = PostReportsPaginationQuery$variables;
export type PostReportsPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostReportsFragment">;
};
export type PostReportsPaginationQueryResponse = PostReportsPaginationQuery$data;
export type PostReportsPaginationQuery = {
  variables: PostReportsPaginationQueryVariables;
  response: PostReportsPaginationQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 5,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "from"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "to"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "kind": "Variable",
    "name": "from",
    "variableName": "from"
  },
  {
    "kind": "Variable",
    "name": "to",
    "variableName": "to"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PostReportsPaginationQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "PostReportsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostReportsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "PostReportConnection",
        "kind": "LinkedField",
        "name": "postReports",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostReportEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PostReport",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Account",
                    "kind": "LinkedField",
                    "name": "account",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "username",
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Rule",
                    "kind": "LinkedField",
                    "name": "rule",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Post",
                    "kind": "LinkedField",
                    "name": "post",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "reference",
                        "storageKey": null
                      },
                      (v4/*: any*/)
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
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "filters": [
          "from",
          "to"
        ],
        "handle": "connection",
        "key": "PostReports_postReports",
        "kind": "LinkedHandle",
        "name": "postReports"
      }
    ]
  },
  "params": {
    "id": "7ff03b3de6f52af6e8dce5de75c05639",
    "metadata": {},
    "name": "PostReportsPaginationQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "aedec6f581a255fa59ef5dd104945398";

export default node;
