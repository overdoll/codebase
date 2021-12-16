/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 15fe49bf7251dfb9d5b57482dc3c5dbb */

import { ConcreteRequest } from "relay-runtime";
export type PostState = "DISCARDED" | "DISCARDING" | "DRAFT" | "PROCESSING" | "PUBLISHED" | "PUBLISHING" | "REJECTED" | "REMOVED" | "REMOVING" | "REVIEW" | "%future added value";
export type SubmitPostInput = {
    id: string;
};
export type useSubmitPostMutationVariables = {
    input: SubmitPostInput;
};
export type useSubmitPostMutationResponse = {
    readonly submitPost: {
        readonly post: {
            readonly id: string;
            readonly state: PostState;
        } | null;
        readonly inReview: boolean | null;
    } | null;
};
export type useSubmitPostMutation = {
    readonly response: useSubmitPostMutationResponse;
    readonly variables: useSubmitPostMutationVariables;
};



/*
mutation useSubmitPostMutation(
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
    "name": "useSubmitPostMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useSubmitPostMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "15fe49bf7251dfb9d5b57482dc3c5dbb",
    "metadata": {},
    "name": "useSubmitPostMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = 'e46caf98cdceabae618427a26ddd7c10';
export default node;
