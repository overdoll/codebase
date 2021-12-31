/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 8a30aa0a9b989a2aefc5b6d5a2f4da5f */

import { ConcreteRequest } from "relay-runtime";
export type CreatePostInput = {
    clubId: string;
};
export type CreatePostFlowMutationVariables = {
    input: CreatePostInput;
};
export type CreatePostFlowMutationResponse = {
    readonly createPost: {
        readonly post: {
            readonly reference: string;
        } | null;
    } | null;
};
export type CreatePostFlowMutation = {
    readonly response: CreatePostFlowMutationResponse;
    readonly variables: CreatePostFlowMutationVariables;
};



/*
mutation CreatePostFlowMutation(
  $input: CreatePostInput!
) {
  createPost(input: $input) {
    post {
      reference
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreatePostFlowMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreatePostFlowMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "8a30aa0a9b989a2aefc5b6d5a2f4da5f",
    "metadata": {},
    "name": "CreatePostFlowMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '8da6f5b9d23d59606adb02fed345dfa7';
export default node;
