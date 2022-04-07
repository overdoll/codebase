/**
 * @generated SignedSource<<8f19c6179f13a6362efafc7d7df76c4e>>
 * @relayHash 31c93fefea6e3c4c1cda343aab1920cf
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 31c93fefea6e3c4c1cda343aab1920cf

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "%future added value";
export type RemovePostInput = {
  notes?: string | null;
  postId: string;
  ruleId: string;
};
export type ModerationRemovePostFormMutation$variables = {
  input: RemovePostInput;
};
export type ModerationRemovePostFormMutationVariables = ModerationRemovePostFormMutation$variables;
export type ModerationRemovePostFormMutation$data = {
  readonly removePost: {
    readonly post: {
      readonly id: string;
      readonly state: PostState;
    } | null;
  } | null;
};
export type ModerationRemovePostFormMutationResponse = ModerationRemovePostFormMutation$data;
export type ModerationRemovePostFormMutation = {
  variables: ModerationRemovePostFormMutationVariables;
  response: ModerationRemovePostFormMutation$data;
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
    "concreteType": "RemovePostPayload",
    "kind": "LinkedField",
    "name": "removePost",
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
    "name": "ModerationRemovePostFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ModerationRemovePostFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "31c93fefea6e3c4c1cda343aab1920cf",
    "metadata": {},
    "name": "ModerationRemovePostFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "36105b9b479743ab2299ef9940a661b4";

export default node;
