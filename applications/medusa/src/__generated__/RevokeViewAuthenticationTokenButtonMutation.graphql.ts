/**
 * @generated SignedSource<<dccddf0c8937e652e9370d9326919a4c>>
 * @relayHash 43f34f4cb25bd064c47e48971270e743
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 43f34f4cb25bd064c47e48971270e743

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RevokeAuthenticationTokenInput = {
  secret?: string | null;
  token: string;
};
export type RevokeViewAuthenticationTokenButtonMutation$variables = {
  input: RevokeAuthenticationTokenInput;
};
export type RevokeViewAuthenticationTokenButtonMutation$data = {
  readonly revokeAuthenticationToken: {
    readonly revokedAuthenticationTokenId: string;
  } | null;
};
export type RevokeViewAuthenticationTokenButtonMutation = {
  response: RevokeViewAuthenticationTokenButtonMutation$data;
  variables: RevokeViewAuthenticationTokenButtonMutation$variables;
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
    "name": "RevokeViewAuthenticationTokenButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RevokeViewAuthenticationTokenButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "43f34f4cb25bd064c47e48971270e743",
    "metadata": {},
    "name": "RevokeViewAuthenticationTokenButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "2cfbc32f4dcadc74b0e47e766946111c";

export default node;
