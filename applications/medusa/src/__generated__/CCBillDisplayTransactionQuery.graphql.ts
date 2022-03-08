/**
 * @generated SignedSource<<ec540e8b35fd8718a34e21d8d54de868>>
 * @relayHash 9d825cc2d24379e423d2321d654b0acd
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9d825cc2d24379e423d2321d654b0acd

import { ConcreteRequest, Query } from 'relay-runtime';
export type CCBillDeclineError = "CARD_EXPIRED" | "GENERAL_SYSTEM_ERROR" | "INSUFFICIENT_FUNDS" | "RATE_LIMIT_ERROR" | "TRANSACTION_APPROVAL_REQUIRED" | "TRANSACTION_DECLINED" | "TRANSACTION_DENIED_OR_REFUSED_BY_BANK" | "%future added value";
export type CCBillDisplayTransactionQuery$variables = {
  token: string;
};
export type CCBillDisplayTransactionQueryVariables = CCBillDisplayTransactionQuery$variables;
export type CCBillDisplayTransactionQuery$data = {
  readonly ccbillTransactionDetails: {
    readonly id: string;
    readonly approved: boolean;
    readonly declineError: CCBillDeclineError | null;
    readonly declineText: string | null;
    readonly linkedAccountClubSupporterSubscription: {
      readonly id: string;
    } | null;
  } | null;
};
export type CCBillDisplayTransactionQueryResponse = CCBillDisplayTransactionQuery$data;
export type CCBillDisplayTransactionQuery = {
  variables: CCBillDisplayTransactionQueryVariables;
  response: CCBillDisplayTransactionQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "CCBillTransactionDetails",
    "kind": "LinkedField",
    "name": "ccbillTransactionDetails",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "approved",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "declineError",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "declineText",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountClubSupporterSubscription",
        "kind": "LinkedField",
        "name": "linkedAccountClubSupporterSubscription",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CCBillDisplayTransactionQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CCBillDisplayTransactionQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "9d825cc2d24379e423d2321d654b0acd",
    "metadata": {},
    "name": "CCBillDisplayTransactionQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "04c76db34e6d9fb32403383611f3d444";

export default node;
