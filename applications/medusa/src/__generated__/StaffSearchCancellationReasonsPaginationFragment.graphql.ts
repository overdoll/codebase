/**
 * @generated SignedSource<<0313435915c095afbadf9f30e41e84ab>>
 * @relayHash 14bb3949629d89dfaaa14b8f6da1f217
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 14bb3949629d89dfaaa14b8f6da1f217

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffSearchCancellationReasonsPaginationFragment$variables = {
  after?: string | null;
  first?: number | null;
};
export type StaffSearchCancellationReasonsPaginationFragmentVariables = StaffSearchCancellationReasonsPaginationFragment$variables;
export type StaffSearchCancellationReasonsPaginationFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"StaffSearchCancellationReasonsFragment">;
};
export type StaffSearchCancellationReasonsPaginationFragmentResponse = StaffSearchCancellationReasonsPaginationFragment$data;
export type StaffSearchCancellationReasonsPaginationFragment = {
  variables: StaffSearchCancellationReasonsPaginationFragmentVariables;
  response: StaffSearchCancellationReasonsPaginationFragment$data;
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
    "name": "StaffSearchCancellationReasonsPaginationFragment",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "StaffSearchCancellationReasonsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffSearchCancellationReasonsPaginationFragment",
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
        "key": "StaffCancellationReasonsConnection_cancellationReasons",
        "kind": "LinkedHandle",
        "name": "cancellationReasons"
      }
    ]
  },
  "params": {
    "id": "14bb3949629d89dfaaa14b8f6da1f217",
    "metadata": {},
    "name": "StaffSearchCancellationReasonsPaginationFragment",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "fab28a9f18fde10f84aa0f9b4afe5613";

export default node;
