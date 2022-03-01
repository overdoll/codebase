/**
 * @generated SignedSource<<29d8cea768e06544b89f5b7760cafc50>>
 * @relayHash 537727d784ad1cb04dd4666cf1930cc7
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 537727d784ad1cb04dd4666cf1930cc7

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostReportDateRange = {
  from: any;
  to: any;
};
export type ViewPostReportsQuery$variables = {
  reference: string;
  dateRange: PostReportDateRange;
};
export type ViewPostReportsQueryVariables = ViewPostReportsQuery$variables;
export type ViewPostReportsQuery$data = {
  readonly post: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewPostReportsFragment">;
  };
};
export type ViewPostReportsQueryResponse = ViewPostReportsQuery$data;
export type ViewPostReportsQuery = {
  variables: ViewPostReportsQueryVariables;
  response: ViewPostReportsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "dateRange"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "reference"
},
v2 = [
  {
    "kind": "Variable",
    "name": "reference",
    "variableName": "reference"
  }
],
v3 = [
  {
    "kind": "Variable",
    "name": "dateRange",
    "variableName": "dateRange"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewPostReportsQuery",
    "selections": [
      {
        "kind": "RequiredField",
        "field": {
          "alias": null,
          "args": (v2/*: any*/),
          "concreteType": "Post",
          "kind": "LinkedField",
          "name": "post",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ViewPostReportsFragment"
            }
          ],
          "storageKey": null
        },
        "action": "THROW",
        "path": "post"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ViewPostReportsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "PostReportConnection",
            "kind": "LinkedField",
            "name": "reports",
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
              "dateRange"
            ],
            "handle": "connection",
            "key": "ViewPostReports_reports",
            "kind": "LinkedHandle",
            "name": "reports"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "537727d784ad1cb04dd4666cf1930cc7",
    "metadata": {},
    "name": "ViewPostReportsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "ed299a2d16a9560391525c11cc69aa6b";

export default node;
