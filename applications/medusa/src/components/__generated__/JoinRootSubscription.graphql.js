/**
 * @flow
 * @relayHash 4c61efbe93f81d3a6bf2216d8f666869
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type JoinRootSubscriptionVariables = {||};
export type JoinRootSubscriptionResponse = {|
  +authenticationState: ?{|
    +authorized: boolean,
    +registered: boolean,
    +redirect: boolean,
  |}
|};
export type JoinRootSubscription = {|
  variables: JoinRootSubscriptionVariables,
  response: JoinRootSubscriptionResponse,
|};
*/


/*
subscription JoinRootSubscription {
  authenticationState {
    authorized
    registered
    redirect
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "redirect",
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
    "id": "1348e60dcda31ab0b31f92554afa54cb1779daf54e52420db0765591c1f83ca5",
    "metadata": {},
    "name": "JoinRootSubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ca31c1da352f590c625171c27966bdeb';

module.exports = node;
