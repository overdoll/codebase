/**
 * @flow
 * @relayHash c3538ff1ed0ac6870c3e7e3eb05887c2
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ReissueAuthenticationTokenValidation = "TOKEN_EXPIRED" | "%future added value";
export type LobbyMutationVariables = {||};
export type LobbyMutationResponse = {|
  +reissueAuthenticationToken: ?{|
    +validation: ?ReissueAuthenticationTokenValidation,
    +authenticationToken: ?{|
      +email: string
    |},
  |}
|};
export type LobbyMutation = {|
  variables: LobbyMutationVariables,
  response: LobbyMutationResponse,
|};


/*
mutation LobbyMutation {
  reissueAuthenticationToken {
    validation
    authenticationToken {
      email
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "validation",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LobbyMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ReissueAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "reissueAuthenticationToken",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationToken",
            "kind": "LinkedField",
            "name": "authenticationToken",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LobbyMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ReissueAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "reissueAuthenticationToken",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationToken",
            "kind": "LinkedField",
            "name": "authenticationToken",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "c3538ff1ed0ac6870c3e7e3eb05887c2",
    "metadata": {},
    "name": "LobbyMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '339c96b7282fddbd7ae4a6eb824d92a0';
module.exports = node;
