/**
 * @flow
 * @relayHash 15b6b350ae61fdfbf9dd6eeef348c28b
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
    +sameSession: boolean,
    +registered: boolean,
    +redeemed: boolean,
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
    sameSession
    registered
    redeemed
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "redeemed",
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
    "id": "15b6b350ae61fdfbf9dd6eeef348c28b",
    "metadata": {},
    "name": "tokenQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '92dc3eff58233668e80499f16ef447fd';

module.exports = node;
