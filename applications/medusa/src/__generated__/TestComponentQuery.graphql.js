/**
 * @flow
 * @relayHash d71b63326a582f6e7277a65655badb6f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TestComponentQueryVariables = {|
  cookie: string
|};
export type TestComponentQueryResponse = {|
  +authenticationCookie: ?$ReadOnlyArray<{|
    +cookie: string,
    +email: string,
    +redeemed: boolean,
    +expiration: string,
  |}>
|};
export type TestComponentQuery = {|
  variables: TestComponentQueryVariables,
  response: TestComponentQueryResponse,
|};
*/


/*
query TestComponentQuery(
  $cookie: String!
) {
  authenticationCookie(cookie: $cookie) {
    cookie
    email
    redeemed
    expiration
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
    "concreteType": "AuthenticationCookie",
    "kind": "LinkedField",
    "name": "authenticationCookie",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cookie",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "redeemed",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "expiration",
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
    "name": "TestComponentQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TestComponentQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "174788e2fbfd9651ea45adf07b50f700cd8e93ab0bfd54799e09a2b0370836ad",
    "metadata": {},
    "name": "TestComponentQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b9d78e451fba8ee21c73ce72f404e84a';

module.exports = node;
