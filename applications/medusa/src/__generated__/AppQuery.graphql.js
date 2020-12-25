/**
 * @flow
 * @relayHash c2faed7e5c7b7b69ed90cda551f49998
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AppQueryVariables = {|
  cookie: string
|};
export type AppQueryResponse = {|
  +authenticationCookie: ?$ReadOnlyArray<{|
    +cookie: string,
    +email: string,
    +redeemed: boolean,
    +expiration: string,
  |}>
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/


/*
query AppQuery(
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
    "name": "AppQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AppQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "a5af2a6bf6cd8b6b29473dddc2ad747d6c2f2d913c8129bd95103cc63f1936c3",
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4aa0cbe6f429672eee4b168a496c61fb';

module.exports = node;
