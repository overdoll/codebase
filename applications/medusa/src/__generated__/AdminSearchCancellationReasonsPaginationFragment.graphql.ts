/**
 * @generated SignedSource<<3b2d39392a538993afd2d1048e5e8b41>>
 * @relayHash 1a186335f6d89aea7b822582bc45c8ff
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1a186335f6d89aea7b822582bc45c8ff

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminSearchCancellationReasonsPaginationFragment$variables = {
  after?: string | null;
  first?: number | null;
};
export type AdminSearchCancellationReasonsPaginationFragmentVariables = AdminSearchCancellationReasonsPaginationFragment$variables;
export type AdminSearchCancellationReasonsPaginationFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AdminSearchCancellationReasonsFragment">;
};
export type AdminSearchCancellationReasonsPaginationFragmentResponse = AdminSearchCancellationReasonsPaginationFragment$data;
export type AdminSearchCancellationReasonsPaginationFragment = {
  variables: AdminSearchCancellationReasonsPaginationFragmentVariables;
  response: AdminSearchCancellationReasonsPaginationFragment$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  }
],
v1 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AdminSearchCancellationReasonsPaginationFragment",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "AdminSearchCancellationReasonsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AdminSearchCancellationReasonsPaginationFragment",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "AdminCancellationReasonsConnection_cancellationReasons",
        "kind": "LinkedHandle",
        "name": "cancellationReasons"
      }
    ]
  },
  "params": {
    "id": "1a186335f6d89aea7b822582bc45c8ff",
    "metadata": {},
    "name": "AdminSearchCancellationReasonsPaginationFragment",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "fa2e0b570427b23859818cc90caeefc0";

export default node;
