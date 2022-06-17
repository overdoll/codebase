/**
 * @generated SignedSource<<e747a87c9025a8fe58c5ccdcdcfc051f>>
 * @relayHash 81a7aec44cbe991cebafa80a19bbafc3
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 81a7aec44cbe991cebafa80a19bbafc3

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ApprovePostInput = {
  postId: string;
};
export type ModeratePostApproveMutation$variables = {
  input: ApprovePostInput;
};
export type ModeratePostApproveMutationVariables = ModeratePostApproveMutation$variables;
export type ModeratePostApproveMutation$data = {
  readonly approvePost: {
    readonly post: {
      readonly id: string;
    } | null;
  } | null;
};
export type ModeratePostApproveMutationResponse = ModeratePostApproveMutation$data;
export type ModeratePostApproveMutation = {
  variables: ModeratePostApproveMutationVariables;
  response: ModeratePostApproveMutation$data;
};

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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ApprovePostPayload",
    "kind": "LinkedField",
    "name": "approvePost",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ModeratePostApproveMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ModeratePostApproveMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "81a7aec44cbe991cebafa80a19bbafc3",
    "metadata": {},
    "name": "ModeratePostApproveMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "82f9ab6d13e97962d79d4b0207359cea";

export default node;
