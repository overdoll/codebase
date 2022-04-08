/**
 * @generated SignedSource<<4fb2e4d5f2d7a84f87bc37f3a29b9290>>
 * @relayHash 707d6ffa289e5a1bcd51e3ffed1bf6e3
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 707d6ffa289e5a1bcd51e3ffed1bf6e3

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffSearchCancellationReasonsQuery$variables = {};
export type StaffSearchCancellationReasonsQueryVariables = StaffSearchCancellationReasonsQuery$variables;
export type StaffSearchCancellationReasonsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"StaffSearchCancellationReasonsFragment">;
};
export type StaffSearchCancellationReasonsQueryResponse = StaffSearchCancellationReasonsQuery$data;
export type StaffSearchCancellationReasonsQuery = {
  variables: StaffSearchCancellationReasonsQueryVariables;
  response: StaffSearchCancellationReasonsQuery$data;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffSearchCancellationReasonsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "StaffSearchCancellationReasonsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "StaffSearchCancellationReasonsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CancellationReasonConnection",
        "kind": "LinkedField",
        "name": "cancellationReasons",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CancellationReasonEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CancellationReason",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "reference",
                    "storageKey": null
                  },
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
                    "kind": "ScalarField",
                    "name": "id",
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
        "args": null,
        "filters": null,
        "handle": "connection",
        "key": "StaffCancellationReasonsConnection_cancellationReasons",
        "kind": "LinkedHandle",
        "name": "cancellationReasons"
      }
    ]
  },
  "params": {
    "id": "707d6ffa289e5a1bcd51e3ffed1bf6e3",
    "metadata": {},
    "name": "StaffSearchCancellationReasonsQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "e5ec34ad7fc2732e46bee0ecfacdd9ca";

export default node;
