/**
 * @flow
 * @relayHash 6751386073d08aefe132978ce03eb085
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type tokenQueryVariables = {|
  cookie: string
|};
export type tokenQueryResponse = {|
  +redeemCookie: ?{|
    +same: boolean
  |}
|};
export type tokenQuery = {|
  variables: tokenQueryVariables,
  response: tokenQueryResponse,
|};
*/


/*
query tokenQuery(
  $cookie: String!
) {
  redeemCookie(cookie: $cookie) {
    same
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cookie"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "cookie",
        "variableName": "cookie"
      }
    ],
    "concreteType": "SameSession",
    "kind": "LinkedField",
    "name": "redeemCookie",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "same",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "tokenQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "tokenQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "d7df09c81fe1819ec6e54a95b90870d7ef0dd3a4e9fc022400f71b945fa4c5f1",
    "metadata": {},
    "name": "tokenQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '87187f6cdbec88e2252bcdc4bc89fa90';

module.exports = node;
