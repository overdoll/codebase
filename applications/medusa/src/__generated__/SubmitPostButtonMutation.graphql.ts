/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash c49b64df64e1f7fc65b3512b5927b2f4 */

import { ConcreteRequest } from "relay-runtime";
export type PostState = "DISCARDED" | "DISCARDING" | "DRAFT" | "PROCESSING" | "PUBLISHED" | "PUBLISHING" | "REJECTED" | "REMOVED" | "REMOVING" | "REVIEW" | "%future added value";
export type SubmitPostInput = {
    id: string;
};
export type SubmitPostButtonMutationVariables = {
    input: SubmitPostInput;
};
export type SubmitPostButtonMutationResponse = {
    readonly submitPost: {
        readonly post: {
            readonly id: string;
            readonly state: PostState;
        } | null;
        readonly inReview: boolean | null;
    } | null;
};
export type SubmitPostButtonMutation = {
    readonly response: SubmitPostButtonMutationResponse;
    readonly variables: SubmitPostButtonMutationVariables;
};



/*
mutation SubmitPostButtonMutation(
  $input: SubmitPostInput!
) {
  submitPost(input: $input) {
    post {
      id
      state
    }
    inReview
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "SubmitPostPayload",
    "kind": "LinkedField",
    "name": "submitPost",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "inReview",
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
    "name": "SubmitPostButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmitPostButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "c49b64df64e1f7fc65b3512b5927b2f4",
    "metadata": {},
    "name": "SubmitPostButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '9c0fe6b3a76981a02f9ddc4226799997';
export default node;
