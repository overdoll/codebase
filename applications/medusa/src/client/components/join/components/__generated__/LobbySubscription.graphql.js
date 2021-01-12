/**
 * @flow
 * @relayHash 0ea07a4f8818b11fbc26149245590383
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
      +sameSession: boolean
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
    "id": "0ea07a4f8818b11fbc26149245590383",
    "metadata": {},
    "name": "LobbySubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '15a2ca356a95c493437934aa3af18f40';

module.exports = node;
