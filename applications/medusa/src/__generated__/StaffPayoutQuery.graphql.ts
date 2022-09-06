/**
 * @generated SignedSource<<20dd891c59946c58d02e335bb14e9a47>>
 * @relayHash 98cadf8d60e96a5459f7d41d73304faf
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 98cadf8d60e96a5459f7d41d73304faf

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffPayoutQuery$variables = {
  reference: string;
};
export type StaffPayoutQuery$data = {
  readonly payout: {
    readonly " $fragmentSpreads": FragmentRefs<"StaffClubPayoutCardFragment" | "StaffPayoutAccountFragment" | "StaffPayoutClubFragment" | "StaffPayoutEventsFragment" | "StaffPayoutOptionsFragment" | "StaffPayoutPaymentsListFragment">;
  } | null;
};
export type StaffPayoutQuery = {
  response: StaffPayoutQuery$data;
  variables: StaffPayoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "reference",
    "variableName": "reference"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "preview",
    "storageKey": null
  },
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceUrl",
    "kind": "LinkedField",
    "name": "urls",
    "plural": true,
    "selections": [
      (v5/*: any*/),
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
      (v5/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "type",
    "storageKey": null
  }
],
v7 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffPayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ClubPayout",
        "kind": "LinkedField",
        "name": "payout",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffClubPayoutCardFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffPayoutOptionsFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffPayoutAccountFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffPayoutPaymentsListFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffPayoutEventsFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffPayoutClubFragment"
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
    "name": "StaffPayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ClubPayout",
        "kind": "LinkedField",
        "name": "payout",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "amount",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "depositDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "coverFeeAmount",
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "payoutAccount",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "username",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "avatar",
                "plural": false,
                "selections": (v6/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "concreteType": "ClubPaymentConnection",
            "kind": "LinkedField",
            "name": "payments",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ClubPaymentEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ClubPayment",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "reference",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "finalAmount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "settlementDate",
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
            "storageKey": "payments(first:5)"
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "StaffPayoutPayments_payments",
            "kind": "LinkedHandle",
            "name": "payments"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubPayoutEvent",
            "kind": "LinkedField",
            "name": "events",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "error",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "createdAt",
                "storageKey": null
              }
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": (v6/*: any*/),
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
    ]
  },
  "params": {
    "id": "98cadf8d60e96a5459f7d41d73304faf",
    "metadata": {},
    "name": "StaffPayoutQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "ff4c1039d1fdb5eb61221b9f3d333d4a";

export default node;
