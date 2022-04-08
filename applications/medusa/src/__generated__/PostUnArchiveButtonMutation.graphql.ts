/**
 * @generated SignedSource<<aa1a539ab035d6c536b6c0742db5788a>>
 * @relayHash 21a028efd79935b6a34dfc53b4bac41e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 21a028efd79935b6a34dfc53b4bac41e

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "%future added value";
export type UnArchivePostInput = {
  id: string;
};
export type PostUnArchiveButtonMutation$variables = {
  input: UnArchivePostInput;
};
export type PostUnArchiveButtonMutationVariables = PostUnArchiveButtonMutation$variables;
export type PostUnArchiveButtonMutation$data = {
  readonly unArchivePost: {
    readonly post: {
      readonly id: string;
      readonly state: PostState;
    } | null;
  } | null;
};
export type PostUnArchiveButtonMutationResponse = PostUnArchiveButtonMutation$data;
export type PostUnArchiveButtonMutation = {
  variables: PostUnArchiveButtonMutationVariables;
  response: PostUnArchiveButtonMutation$data;
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
    "concreteType": "UnArchivePostPayload",
    "kind": "LinkedField",
    "name": "unArchivePost",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
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
    "name": "PostUnArchiveButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostUnArchiveButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "21a028efd79935b6a34dfc53b4bac41e",
    "metadata": {},
    "name": "PostUnArchiveButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "b89c9e6cffbe783cef35cfc2a017f337";

export default node;
