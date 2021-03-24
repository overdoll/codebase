/**
 * @flow
 * @relayHash ff3f64652c450fbcaada028f4225e41b
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type TokenQueryVariables = {|
  cookie: string
|};
export type TokenQueryResponse = {|
  +redeemCookie: {|
    +sameSession: boolean,
    +registered: boolean,
    +session: string,
    +invalid: boolean,
  |}
|};
export type TokenQuery = {|
  variables: TokenQueryVariables,
  response: TokenQueryResponse,
|};


/*
query TokenQuery(
  $cookie: String!
) {
  redeemCookie(cookie: $cookie) {
    sameSession
    registered
    session
    invalid
  }
}
*/

const node: ConcreteRequest = (function(){
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "session",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "invalid",
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
    "id": "ff3f64652c450fbcaada028f4225e41b",
    "metadata": {},
    "name": "TokenQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '899ed8c0b5a3d2eb8dc779a49788b2c8';
module.exports = node;
