/**
 * @flow
 * @relayHash b275c8da21d7b64428977155a2b50124
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type LogoutButtonMutationVariables = {||};
export type LogoutButtonMutationResponse = {|
  +revokeAccountAccess: ?{|
    +revokedAccountId: string
  |}
|};
export type LogoutButtonMutation = {|
  variables: LogoutButtonMutationVariables,
  response: LogoutButtonMutationResponse,
|};


/*
mutation LogoutButtonMutation {
  revokeAccountAccess {
    revokedAccountId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "RevokeAccountAccessPayload",
    "kind": "LinkedField",
    "name": "revokeAccountAccess",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "revokedAccountId",
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
    "name": "LogoutButtonMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LogoutButtonMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "b275c8da21d7b64428977155a2b50124",
    "metadata": {},
    "name": "LogoutButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'f5192da68e2bfec0da7256d95839a25a';
module.exports = node;
