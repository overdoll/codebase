/**
 * @flow
 * @relayHash b4763c40f5c9c9dfd668e1f888dd61b4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type routesQueryVariables = {|
  cookie: string
|};
export type routesQueryResponse = {|
  +redeemCookie: ?{|
    +same: boolean
  |}
|};
export type routesQuery = {|
  variables: routesQueryVariables,
  response: routesQueryResponse,
|};
*/


/*
query routesQuery(
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
    "name": "routesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "routesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "1495477c5c94f045f032e66340c3c98870c9281766c520f11c90af36f73aa745",
    "metadata": {},
    "name": "routesQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '85869af23428f69b06fdc394daea91c0';

module.exports = node;
