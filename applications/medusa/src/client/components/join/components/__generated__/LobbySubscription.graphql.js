/**
 * @flow
 * @relayHash 827a0c2f647341f9d03cec6a6ab57c14
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LobbySubscriptionVariables = {||};
export type LobbySubscriptionResponse = {|
  +authListener: ?{|
    +authorized: boolean,
    +redirect: boolean,
    +cookie: ?{|
      +sameSession: boolean,
      +registered: boolean,
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
    authorized
    redirect
    cookie {
      sameSession
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
        "name": "authorized",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "redirect",
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
            "name": "sameSession",
            "storageKey": null
          },
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
    "id": "827a0c2f647341f9d03cec6a6ab57c14",
    "metadata": {},
    "name": "LobbySubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '01bc6788f2a60f7f1313f22aa3f1e587';

module.exports = node;
