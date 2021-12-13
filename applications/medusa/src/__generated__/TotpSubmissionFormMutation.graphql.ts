/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 8da6df175ba332299eb439bef0f9ed9f */

import { ConcreteRequest } from "relay-runtime";
export type EnrollAccountMultiFactorTotpValidation = "INVALID_CODE" | "%future added value";
export type EnrollAccountMultiFactorTotpInput = {
    id: string;
    code: string;
};
export type TotpSubmissionFormMutationVariables = {
    input: EnrollAccountMultiFactorTotpInput;
};
export type TotpSubmissionFormMutationResponse = {
    readonly enrollAccountMultiFactorTotp: {
        readonly validation: EnrollAccountMultiFactorTotpValidation | null;
        readonly accountMultiFactorTotpEnabled: boolean | null;
    } | null;
};
export type TotpSubmissionFormMutation = {
    readonly response: TotpSubmissionFormMutationResponse;
    readonly variables: TotpSubmissionFormMutationVariables;
};



/*
mutation TotpSubmissionFormMutation(
  $input: EnrollAccountMultiFactorTotpInput!
) {
  enrollAccountMultiFactorTotp(input: $input) {
    validation
    accountMultiFactorTotpEnabled
  }
}
*/

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
    "name": "TotpSubmissionFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TotpSubmissionFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "8da6df175ba332299eb439bef0f9ed9f",
    "metadata": {},
    "name": "TotpSubmissionFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = 'e42d28d3a20fd21c1f7098ef27f12738';
export default node;
