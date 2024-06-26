/**
 * @generated SignedSource<<faf470df0b740a472781f44fe009ac8d>>
 * @relayHash 82ee8bac1024c01bae41907fca24f5a1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 82ee8bac1024c01bae41907fca24f5a1

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EnrollAccountMultiFactorTotpValidation = "INVALID_CODE" | "%future added value";
export type EnrollAccountMultiFactorTotpInput = {
  code: string;
  id: string;
};
export type TotpActivationFormMutation$variables = {
  input: EnrollAccountMultiFactorTotpInput;
};
export type TotpActivationFormMutation$data = {
  readonly enrollAccountMultiFactorTotp: {
    readonly account: {
      readonly id: string;
      readonly multiFactorEnabled: boolean;
      readonly multiFactorTotpConfigured: boolean;
    } | null;
    readonly validation: EnrollAccountMultiFactorTotpValidation | null;
  } | null;
};
export type TotpActivationFormMutation = {
  response: TotpActivationFormMutation$data;
  variables: TotpActivationFormMutation$variables;
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
    "concreteType": "EnrollAccountMultiFactorTotpPayload",
    "kind": "LinkedField",
    "name": "enrollAccountMultiFactorTotp",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "validation",
        "storageKey": null
      },
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
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "multiFactorEnabled",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "multiFactorTotpConfigured",
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
    "name": "TotpActivationFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TotpActivationFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "82ee8bac1024c01bae41907fca24f5a1",
    "metadata": {},
    "name": "TotpActivationFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "1194ad327fbefe983bec7b64a18e9df3";

export default node;
