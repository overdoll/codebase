/**
 * @flow
 * @relayHash 1486f53fb71a0deefecfa852416ad2ca
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type JoinRootSubscriptionVariables = {||};
export type JoinRootSubscriptionResponse = {|
  +authListener: ?{|
    +authorized: boolean,
    +redirect: boolean,
    +cookie: ?{|
      +sameSession: boolean
    |},
  |}
|};
export type JoinRootSubscription = {|
  variables: JoinRootSubscriptionVariables,
  response: JoinRootSubscriptionResponse,
|};
*/


/*
subscription JoinRootSubscription {
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
    "name": "JoinRootSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "JoinRootSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "ddfba833df99f8f92301eace36c336c026068660f703032e4c3662a482f907a4",
    "metadata": {},
    "name": "JoinRootSubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0b513fcd66fd081f08bf3f3fff5d348f';

module.exports = node;
