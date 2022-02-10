/**
 * @generated SignedSource<<8a82857d5f5fc6cb856740bb5886c057>>
 * @relayHash 66447af1fee23a4edaee4700871549be
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 66447af1fee23a4edaee4700871549be

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RevokeAuthenticationTokenInput = {
  secret?: string | null;
  token: string;
};
export type ConfirmRevokeMutation$variables = {
  input: RevokeAuthenticationTokenInput;
};
export type ConfirmRevokeMutationVariables = ConfirmRevokeMutation$variables;
export type ConfirmRevokeMutation$data = {
  readonly revokeAuthenticationToken: {
    readonly revokedAuthenticationTokenId: string;
  } | null;
};
export type ConfirmRevokeMutationResponse = ConfirmRevokeMutation$data;
export type ConfirmRevokeMutation = {
  variables: ConfirmRevokeMutationVariables;
  response: ConfirmRevokeMutation$data;
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
    "concreteType": "RevokeAuthenticationTokenPayload",
    "kind": "LinkedField",
    "name": "revokeAuthenticationToken",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "revokedAuthenticationTokenId",
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
    "name": "ConfirmRevokeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConfirmRevokeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "66447af1fee23a4edaee4700871549be",
    "metadata": {},
    "name": "ConfirmRevokeMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "e5406e58e44e3c174d71eccac9d38e61";

export default node;
