/**
 * @flow
 * @relayHash 059eea10b5a63e6e5260cee562bad7ca
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type JoinSubRootSubscriptionVariables = {||};
export type JoinSubRootSubscriptionResponse = {|
  +authenticationState: ?{|
    +authorized: boolean,
    +registered: boolean,
  |}
|};
export type JoinSubRootSubscription = {|
  variables: JoinSubRootSubscriptionVariables,
  response: JoinSubRootSubscriptionResponse,
|};
*/


/*
subscription JoinSubRootSubscription {
  authenticationState {
    authorized
    registered
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AuthenticationState",
    "kind": "LinkedField",
    "name": "authenticationState",
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
        "name": "registered",
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
    "name": "JoinSubRootSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "JoinSubRootSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "23bf010da542460b094f7adbf1647484c63df3d02bb92edef7af675af8b1093a",
    "metadata": {},
    "name": "JoinSubRootSubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0d131352cbd60cb584cf0011f3c0d603';

module.exports = node;
