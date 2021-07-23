/**
 * @flow
 * @relayHash df72ffb5fb4c046e7278fdb797c4d155
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type LobbyMutationVariables = {||};
export type LobbyMutationResponse = {|
  +reissueAuthenticationToken: ?{|
    +authenticationToken: ?{|
      +email: string
    |}
  |}
|};
export type LobbyMutation = {|
  variables: LobbyMutationVariables,
  response: LobbyMutationResponse,
|};


/*
mutation LobbyMutation {
  reissueAuthenticationToken {
    authenticationToken {
      email
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ReissueAuthenticationTokenPayload",
    "kind": "LinkedField",
    "name": "reissueAuthenticationToken",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "authenticationToken",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LobbyMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LobbyMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "df72ffb5fb4c046e7278fdb797c4d155",
    "metadata": {},
    "name": "LobbyMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '7f94927a47815ed963ec0cafb1193360';
module.exports = node;
