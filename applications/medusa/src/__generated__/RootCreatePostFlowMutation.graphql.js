/**
 * @flow
 * @relayHash 3063199f3ea8a21545a231429a3035ae
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type RootCreatePostFlowMutationVariables = {||};
export type RootCreatePostFlowMutationResponse = {|
  +createPost: ?{|
    +post: ?{|
      +reference: string
    |}
  |}
|};
export type RootCreatePostFlowMutation = {|
  variables: RootCreatePostFlowMutationVariables,
  response: RootCreatePostFlowMutationResponse,
|};


/*
mutation RootCreatePostFlowMutation {
  createPost {
    post {
      reference
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RootCreatePostFlowMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CreatePostPayload",
        "kind": "LinkedField",
        "name": "createPost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "post",
            "plural": false,
            "selections": [
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RootCreatePostFlowMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CreatePostPayload",
        "kind": "LinkedField",
        "name": "createPost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "post",
            "plural": false,
            "selections": [
              (v0/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "3063199f3ea8a21545a231429a3035ae",
    "metadata": {},
    "name": "RootCreatePostFlowMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'a6326438e586f925e31ab87f442a9b57';
module.exports = node;
