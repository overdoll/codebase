/**
 * @generated SignedSource<<d3fde7c2bdb7be522bc9f8fc3979ad72>>
 * @relayHash ab61a710048b2705df9806b96d78d691
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ab61a710048b2705df9806b96d78d691

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteAccountSavedPaymentMethodInput = {
  savedPaymentMethodId: string;
};
export type DeleteSavedPaymentMethodButtonMutation$variables = {
  input: DeleteAccountSavedPaymentMethodInput;
  connections: ReadonlyArray<string>;
};
export type DeleteSavedPaymentMethodButtonMutationVariables = DeleteSavedPaymentMethodButtonMutation$variables;
export type DeleteSavedPaymentMethodButtonMutation$data = {
  readonly deleteAccountSavedPaymentMethod: {
    readonly deletedAccountSavedPaymentMethodId: string;
  } | null;
};
export type DeleteSavedPaymentMethodButtonMutationResponse = DeleteSavedPaymentMethodButtonMutation$data;
export type DeleteSavedPaymentMethodButtonMutation = {
  variables: DeleteSavedPaymentMethodButtonMutationVariables;
  response: DeleteSavedPaymentMethodButtonMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "deletedAccountSavedPaymentMethodId",
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
    "name": "DeleteSavedPaymentMethodButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "DeleteAccountSavedPaymentMethodPayload",
        "kind": "LinkedField",
        "name": "deleteAccountSavedPaymentMethod",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "DeleteSavedPaymentMethodButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "DeleteAccountSavedPaymentMethodPayload",
        "kind": "LinkedField",
        "name": "deleteAccountSavedPaymentMethod",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "deletedAccountSavedPaymentMethodId",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "ab61a710048b2705df9806b96d78d691",
    "metadata": {},
    "name": "DeleteSavedPaymentMethodButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "606226a66963f05708fcdc79d0735037";

export default node;
