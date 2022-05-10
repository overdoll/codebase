/**
 * @generated SignedSource<<4bf43819e1a94348a99d93a8e86fa58d>>
 * @relayHash c0e1c132b66bbbf83f0189fc1cf2435c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c0e1c132b66bbbf83f0189fc1cf2435c

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RevokeAccountArtistRole = {
  accountId: string;
};
export type StaffRevokeArtistButtonMutation$variables = {
  input: RevokeAccountArtistRole;
};
export type StaffRevokeArtistButtonMutationVariables = StaffRevokeArtistButtonMutation$variables;
export type StaffRevokeArtistButtonMutation$data = {
  readonly revokeAccountArtistRole: {
    readonly account: {
      readonly id: string;
      readonly isArtist: boolean;
    } | null;
  } | null;
};
export type StaffRevokeArtistButtonMutationResponse = StaffRevokeArtistButtonMutation$data;
export type StaffRevokeArtistButtonMutation = {
  variables: StaffRevokeArtistButtonMutationVariables;
  response: StaffRevokeArtistButtonMutation$data;
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
    "concreteType": "RevokeAccountArtistRolePayload",
    "kind": "LinkedField",
    "name": "revokeAccountArtistRole",
    "plural": false,
    "selections": [
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
            "name": "isArtist",
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
    "name": "StaffRevokeArtistButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffRevokeArtistButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "c0e1c132b66bbbf83f0189fc1cf2435c",
    "metadata": {},
    "name": "StaffRevokeArtistButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "d140db3c3ca00a5efe8e247fb9c1e89c";

export default node;
