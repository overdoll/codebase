/**
 * @generated SignedSource<<bcc8be7cbe18633f99fcdabae96abd65>>
 * @relayHash fed652c8450ae73c5a45616c24f467e4
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID fed652c8450ae73c5a45616c24f467e4

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RevokeAuthenticationTokenInput = {
  secret?: string | null;
  token: string;
};
export type RevokeTokenButtonMutation$variables = {
  input: RevokeAuthenticationTokenInput;
};
export type RevokeTokenButtonMutationVariables = RevokeTokenButtonMutation$variables;
export type RevokeTokenButtonMutation$data = {
  readonly revokeAuthenticationToken: {
    readonly revokedAuthenticationTokenId: string;
  } | null;
};
export type RevokeTokenButtonMutationResponse = RevokeTokenButtonMutation$data;
export type RevokeTokenButtonMutation = {
  variables: RevokeTokenButtonMutationVariables;
  response: RevokeTokenButtonMutation$data;
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
    "name": "RevokeTokenButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RevokeTokenButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "fed652c8450ae73c5a45616c24f467e4",
    "metadata": {},
    "name": "RevokeTokenButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "5e2db3b962325d345244b43c8f88f30d";

export default node;
