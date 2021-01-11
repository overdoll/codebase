/**
 * @flow
 * @relayHash 9fd910c1b2ae055ff9282fa1192b21e1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type JoinSubscriptionVariables = {||};
export type JoinSubscriptionResponse = {|
  +authListener: ?{|
    +authorized: boolean,
    +redirect: boolean,
    +cookie: ?{|
      +sameSession: boolean
    |},
  |}
|};
export type JoinSubscription = {|
  variables: JoinSubscriptionVariables,
  response: JoinSubscriptionResponse,
|};
*/


/*
subscription JoinSubscription {
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
    "name": "JoinSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "JoinSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "9fd910c1b2ae055ff9282fa1192b21e1",
    "metadata": {},
    "name": "JoinSubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '720b50015d755fd578f3823ba6ad06e4';

module.exports = node;
