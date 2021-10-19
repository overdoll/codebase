/**
 * @flow
 * @relayHash 419bfd6d6db48c69d7ea015adeb9730f
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type CreatePostMutationVariables = {||};
export type CreatePostMutationResponse = {|
  +createPost: ?{|
    +post: ?{|
      +reference: string
    |}
  |}
|};
export type CreatePostMutation = {|
  variables: CreatePostMutationVariables,
  response: CreatePostMutationResponse,
|};


/*
mutation CreatePostMutation {
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
    "name": "CreatePostMutation",
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
    "name": "CreatePostMutation",
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
    "id": "419bfd6d6db48c69d7ea015adeb9730f",
    "metadata": {},
    "name": "CreatePostMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '870abfceeddd4cd4b118d8215fc1d2dd';
module.exports = node;
