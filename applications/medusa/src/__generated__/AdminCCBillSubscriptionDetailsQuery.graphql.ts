/**
 * @generated SignedSource<<bfcc0b355e3647ef551885a405429897>>
 * @relayHash 635167bda6c3d9075b1cc1ac4d72f4d7
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 635167bda6c3d9075b1cc1ac4d72f4d7

import { ConcreteRequest, Query } from 'relay-runtime';
export type AdminCCBillSubscriptionDetailsQuery$variables = {
  ccbillSubscriptionId: string;
};
export type AdminCCBillSubscriptionDetailsQueryVariables = AdminCCBillSubscriptionDetailsQuery$variables;
export type AdminCCBillSubscriptionDetailsQuery$data = {
  readonly ccbillSubscriptionDetails: {
    readonly id: string;
  } | null;
};
export type AdminCCBillSubscriptionDetailsQueryResponse = AdminCCBillSubscriptionDetailsQuery$data;
export type AdminCCBillSubscriptionDetailsQuery = {
  variables: AdminCCBillSubscriptionDetailsQueryVariables;
  response: AdminCCBillSubscriptionDetailsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ccbillSubscriptionId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "ccbillSubscriptionId",
        "variableName": "ccbillSubscriptionId"
      }
    ],
    "concreteType": "CCBillSubscriptionDetails",
    "kind": "LinkedField",
    "name": "ccbillSubscriptionDetails",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "AdminCCBillSubscriptionDetailsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AdminCCBillSubscriptionDetailsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "635167bda6c3d9075b1cc1ac4d72f4d7",
    "metadata": {},
    "name": "AdminCCBillSubscriptionDetailsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "115e8e5b883edd4cd534f379f9d54e0b";

export default node;
