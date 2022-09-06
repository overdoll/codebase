/**
 * @generated SignedSource<<e19184f3eff31fe772444383bd3fe20f>>
 * @relayHash 6cecb96a702e91a9e53ae5daf17be0ad
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 6cecb96a702e91a9e53ae5daf17be0ad

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubSuspensionLogsPaginationQuery$variables = {
  after?: string | null;
  first?: number | null;
  id: string;
};
export type StaffClubSuspensionLogsPaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"StaffClubSuspensionLogsFragment">;
  } | null;
};
export type StaffClubSuspensionLogsPaginationQuery = {
  response: StaffClubSuspensionLogsPaginationQuery$data;
  variables: StaffClubSuspensionLogsPaginationQuery$variables;
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
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "username",
    "storageKey": null
  },
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffClubSuspensionLogsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": (v2/*: any*/),
            "kind": "FragmentSpread",
            "name": "StaffClubSuspensionLogsFragment"
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
    "name": "StaffClubSuspensionLogsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v2/*: any*/),
                "concreteType": "ClubSuspensionLogConnection",
                "kind": "LinkedField",
                "name": "suspensionLogs",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ClubSuspensionLogEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v4/*: any*/),
                              {
                                "alias": "issuedAccount",
                                "args": null,
                                "concreteType": "Account",
                                "kind": "LinkedField",
                                "name": "account",
                                "plural": false,
                                "selections": (v5/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "reason",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "suspendedUntil",
                                "storageKey": null
                              }
                            ],
                            "type": "ClubIssuedSuspensionLog",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v4/*: any*/),
                              {
                                "alias": "removedAccount",
                                "args": null,
                                "concreteType": "Account",
                                "kind": "LinkedField",
                                "name": "account",
                                "plural": false,
                                "selections": (v5/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "type": "ClubRemovedSuspensionLog",
                            "abstractKey": null
                          },
                          {
                            "kind": "TypeDiscriminator",
                            "abstractKey": "__isClubSuspensionLog"
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
                "args": (v2/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "StaffClubSuspensionLogs_suspensionLogs",
                "kind": "LinkedHandle",
                "name": "suspensionLogs"
              }
            ],
            "type": "Club",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "6cecb96a702e91a9e53ae5daf17be0ad",
    "metadata": {},
    "name": "StaffClubSuspensionLogsPaginationQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "1a4dacf06dd6cf7e0887cf7311779bc4";

export default node;
