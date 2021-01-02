/**
 * @flow
 * @relayHash 627dbbe48db3856ffa29c3761ad459ed
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
    +registered: boolean,
    +sameSession: boolean,
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
    registered
    sameSession
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
    "concreteType": "AccountData",
    "kind": "LinkedField",
    "name": "redeemCookie",
    "plural": false,
    "selections": [
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
        "name": "sameSession",
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
    "id": "6033c5a10fceaf104d411df83fa9336d82398c3f7f789d3170d2319fd5beefa8",
    "metadata": {},
    "name": "tokenQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1bef598c2f54d9199120131ec185f0c8';

module.exports = node;
