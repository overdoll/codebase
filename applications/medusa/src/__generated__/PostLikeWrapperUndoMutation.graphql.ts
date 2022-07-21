/**
 * @generated SignedSource<<fa8391b87e1e4e2e82e1512de9a0121e>>
 * @relayHash db2f09d76b6ec7d6ce5142d6dc5782a2
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID db2f09d76b6ec7d6ce5142d6dc5782a2

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UndoLikePostInput = {
  id: string;
};
export type PostLikeWrapperUndoMutation$variables = {
  input: UndoLikePostInput;
};
export type PostLikeWrapperUndoMutation$data = {
  readonly undoLikePost: {
    readonly postLikeId: string | null;
  } | null;
};
export type PostLikeWrapperUndoMutation = {
  response: PostLikeWrapperUndoMutation$data;
  variables: PostLikeWrapperUndoMutation$variables;
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
    "concreteType": "UndoLikePostPayload",
    "kind": "LinkedField",
    "name": "undoLikePost",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "postLikeId",
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
    "name": "PostLikeWrapperUndoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostLikeWrapperUndoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "db2f09d76b6ec7d6ce5142d6dc5782a2",
    "metadata": {},
    "name": "PostLikeWrapperUndoMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "2b9e5d104821ef53c63b0151dfe2c7cf";

export default node;
