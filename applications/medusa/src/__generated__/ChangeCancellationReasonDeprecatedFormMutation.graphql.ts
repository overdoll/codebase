/**
 * @generated SignedSource<<1d6ec0d75badba7a7aeaf1024cc14176>>
 * @relayHash d7cfbba76755f2ecc42e9d31243ede3f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d7cfbba76755f2ecc42e9d31243ede3f

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateCancellationReasonDeprecatedInput = {
  cancellationReasonId: string;
  deprecated: boolean;
};
export type ChangeCancellationReasonDeprecatedFormMutation$variables = {
  input: UpdateCancellationReasonDeprecatedInput;
};
export type ChangeCancellationReasonDeprecatedFormMutationVariables = ChangeCancellationReasonDeprecatedFormMutation$variables;
export type ChangeCancellationReasonDeprecatedFormMutation$data = {
  readonly updateCancellationReasonDeprecated: {
    readonly cancellationReason: {
      readonly id: string;
      readonly deprecated: boolean;
    } | null;
  } | null;
};
export type ChangeCancellationReasonDeprecatedFormMutationResponse = ChangeCancellationReasonDeprecatedFormMutation$data;
export type ChangeCancellationReasonDeprecatedFormMutation = {
  variables: ChangeCancellationReasonDeprecatedFormMutationVariables;
  response: ChangeCancellationReasonDeprecatedFormMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateCancellationReasonDeprecatedPayload",
    "kind": "LinkedField",
    "name": "updateCancellationReasonDeprecated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CancellationReason",
        "kind": "LinkedField",
        "name": "cancellationReason",
        "plural": false,
        "selections": [
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
            "name": "deprecated",
            "storageKey": null
          }
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
    "name": "ChangeCancellationReasonDeprecatedFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeCancellationReasonDeprecatedFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "d7cfbba76755f2ecc42e9d31243ede3f",
    "metadata": {},
    "name": "ChangeCancellationReasonDeprecatedFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "44832ae2b7b942f2135f5a54b9a5c825";

export default node;
