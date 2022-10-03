/**
 * @generated SignedSource<<a0156692e06599ccd09ac354e5719612>>
 * @relayHash a14e2b250fcd2771d2c01b67dc2e1314
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a14e2b250fcd2771d2c01b67dc2e1314

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RevokeAuthenticationTokenInput = {
  secret?: string | null;
  token: string;
};
export type ConfirmVerifyTokenRevokeMutation$variables = {
  input: RevokeAuthenticationTokenInput;
};
export type ConfirmVerifyTokenRevokeMutation$data = {
  readonly revokeAuthenticationToken: {
    readonly revokedAuthenticationTokenId: string;
  } | null;
};
export type ConfirmVerifyTokenRevokeMutation = {
  response: ConfirmVerifyTokenRevokeMutation$data;
  variables: ConfirmVerifyTokenRevokeMutation$variables;
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
    "name": "ConfirmVerifyTokenRevokeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConfirmVerifyTokenRevokeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "a14e2b250fcd2771d2c01b67dc2e1314",
    "metadata": {},
    "name": "ConfirmVerifyTokenRevokeMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "c5fefa9deadb859e285b9db39bd68e17";

export default node;
