/**
 * @generated SignedSource<<e5be53faa0e84d4be05a24c97ed1d25f>>
 * @relayHash 676b6cf519fb02fdd3d922c56becd760
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 676b6cf519fb02fdd3d922c56becd760

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeletePostInput = {
  id: string;
};
export type PostDeleteButtonMutation$variables = {
  input: DeletePostInput;
};
export type PostDeleteButtonMutationVariables = PostDeleteButtonMutation$variables;
export type PostDeleteButtonMutation$data = {
  readonly deletePost: {
    readonly postId: string | null;
  } | null;
};
export type PostDeleteButtonMutationResponse = PostDeleteButtonMutation$data;
export type PostDeleteButtonMutation = {
  variables: PostDeleteButtonMutationVariables;
  response: PostDeleteButtonMutation$data;
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
    "concreteType": "DeletePostPayload",
    "kind": "LinkedField",
    "name": "deletePost",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "postId",
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
    "name": "PostDeleteButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostDeleteButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "676b6cf519fb02fdd3d922c56becd760",
    "metadata": {},
    "name": "PostDeleteButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "04e2da3f722a783831f46f5b42cfd134";

export default node;
