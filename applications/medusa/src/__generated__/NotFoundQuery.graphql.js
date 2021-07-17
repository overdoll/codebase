/**
 * @flow
 * @relayHash e4399102e5a6c22d2c196b2fac806823
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type NotFoundQueryVariables = {||};
export type NotFoundQueryResponse = {|
  +node: ?{|
    +id: string,
    +__typename: "Test",
    +test?: string,
  |}
|};
export type NotFoundQuery = {|
  variables: NotFoundQueryVariables,
  response: NotFoundQueryResponse,
|};


/*
query NotFoundQuery {
  node(id: "testid123") {
    __typename
    id
    ... on Test {
      __typename
      test
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "testid123"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "test",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NotFoundQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "type": "Test",
            "abstractKey": null
          }
        ],
        "storageKey": "node(id:\"testid123\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NotFoundQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v1/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/)
            ],
            "type": "Test",
            "abstractKey": null
          }
        ],
        "storageKey": "node(id:\"testid123\")"
      }
    ]
  },
  "params": {
    "id": "e4399102e5a6c22d2c196b2fac806823",
    "metadata": {},
    "name": "NotFoundQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '09ba6e40dc057b7513adbc8034681fc6';
module.exports = node;
