/**
 * @flow
 * @relayHash f45c22656e3c1382553435a28e17d104
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type CreatePostFlowMutationVariables = {||};
export type CreatePostFlowMutationResponse = {|
  +createPost: ?{|
    +post: ?{|
      +reference: string
    |}
  |}
|};
export type CreatePostFlowMutation = {|
  variables: CreatePostFlowMutationVariables,
  response: CreatePostFlowMutationResponse,
|};


/*
mutation CreatePostFlowMutation {
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
    "name": "CreatePostFlowMutation",
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
    "name": "CreatePostFlowMutation",
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
    "id": "f45c22656e3c1382553435a28e17d104",
    "metadata": {},
    "name": "CreatePostFlowMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '58f2e537beb9700622d56004dac81aa3';
module.exports = node;