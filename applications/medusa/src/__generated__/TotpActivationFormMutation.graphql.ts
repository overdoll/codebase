/**
 * @generated SignedSource<<c70801b87eda2cec83598248fc83c9e6>>
 * @relayHash 2aa94deb9b52ae0f585815d12adfac43
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 2aa94deb9b52ae0f585815d12adfac43

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EnrollAccountMultiFactorTotpValidation = "INVALID_CODE" | "%future added value";
export type EnrollAccountMultiFactorTotpInput = {
  code: string;
  id: string;
};
export type TotpActivationFormMutation$variables = {
  input: EnrollAccountMultiFactorTotpInput;
};
export type TotpActivationFormMutationVariables = TotpActivationFormMutation$variables;
export type TotpActivationFormMutation$data = {
  readonly enrollAccountMultiFactorTotp: {
    readonly validation: EnrollAccountMultiFactorTotpValidation | null;
    readonly accountMultiFactorTotpEnabled: boolean | null;
  } | null;
};
export type TotpActivationFormMutationResponse = TotpActivationFormMutation$data;
export type TotpActivationFormMutation = {
  variables: TotpActivationFormMutationVariables;
  response: TotpActivationFormMutation$data;
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
        "kind": "ScalarField",
        "name": "accountMultiFactorTotpEnabled",
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
    "id": "2aa94deb9b52ae0f585815d12adfac43",
    "metadata": {},
    "name": "TotpActivationFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "3998ef08a40e0cabc4f4966d8e9c8623";

export default node;
