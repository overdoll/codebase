/**
 * @flow
 * @relayHash 91e99d0f72cc9a5af278a2989768735e
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TokenQueryVariables = {|
  cookie: string
|};
export type TokenQueryResponse = {|
  +redeemCookie: ?{|
    +sameSession: boolean,
    +registered: boolean,
  |}
|};
export type TokenQuery = {|
  variables: TokenQueryVariables,
  response: TokenQueryResponse,
|};
*/


/*
query TokenQuery(
  $cookie: String!
) {
  redeemCookie(cookie: $cookie) {
    sameSession
    registered
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
    "concreteType": "Cookie",
    "kind": "LinkedField",
    "name": "redeemCookie",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TokenQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TokenQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "91e99d0f72cc9a5af278a2989768735e",
    "metadata": {},
    "name": "TokenQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '83361292edc86160a390b0d03595aa48';

module.exports = node;
