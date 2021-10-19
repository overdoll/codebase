/**
 * @flow
 * @relayHash 911400ae48d85a09af216cfcb7166b11
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type RootCreatePostFlowQueryVariables = {|
  reference: string
|};
export type RootCreatePostFlowQueryResponse = {|
  +post: ?{|
    +__typename: string
  |}
|};
export type RootCreatePostFlowQuery = {|
  variables: RootCreatePostFlowQueryVariables,
  response: RootCreatePostFlowQueryResponse,
|};


/*
query RootCreatePostFlowQuery(
  $reference: String!
) {
  post(reference: $reference) {
    __typename
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "reference",
    "variableName": "reference"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RootCreatePostFlowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RootCreatePostFlowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "911400ae48d85a09af216cfcb7166b11",
    "metadata": {},
    "name": "RootCreatePostFlowQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'ca8fcfeb53e6f11d4a69ce9d8f5d706f';
module.exports = node;
