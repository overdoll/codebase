/**
 * @flow
 * @relayHash 681b8d7958c1231ee10b34b7b921278f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LobbySubscriptionVariables = {||};
export type LobbySubscriptionResponse = {|
  +authListener: ?{|
    +sameSession: boolean,
    +cookie: ?{|
      +registered: boolean
    |},
  |}
|};
export type LobbySubscription = {|
  variables: LobbySubscriptionVariables,
  response: LobbySubscriptionResponse,
|};
*/


/*
subscription LobbySubscription {
  authListener {
    sameSession
    cookie {
      registered
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AuthListener",
    "kind": "LinkedField",
    "name": "authListener",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "sameSession",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Cookie",
        "kind": "LinkedField",
        "name": "cookie",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "registered",
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
    "name": "LobbySubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LobbySubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "681b8d7958c1231ee10b34b7b921278f",
    "metadata": {},
    "name": "LobbySubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b2f669514520bac689e603a89d83765f';

module.exports = node;
