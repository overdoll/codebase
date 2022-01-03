/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash d391681ef6228b425bfa17d8e76317cb */

import { ConcreteRequest } from "relay-runtime";
export type UpdatePostContentInput = {
    id: string;
    content: Array<string>;
};
export type UpdateBrandButtonMutationVariables = {
    input: UpdatePostContentInput;
};
export type UpdateBrandButtonMutationResponse = {
    readonly updatePostContent: {
        readonly post: {
            readonly id: string;
        } | null;
    } | null;
};
export type UpdateBrandButtonMutation = {
    readonly response: UpdateBrandButtonMutationResponse;
    readonly variables: UpdateBrandButtonMutationVariables;
};



/*
mutation UpdateBrandButtonMutation(
  $input: UpdatePostContentInput!
) {
  updatePostContent(input: $input) {
    post {
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdatePostContentPayload",
    "kind": "LinkedField",
    "name": "updatePostContent",
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
    "name": "UpdateBrandButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateBrandButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "d391681ef6228b425bfa17d8e76317cb",
    "metadata": {},
    "name": "UpdateBrandButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = 'ce6128f0acbef559dd8ccb345048673c';
export default node;
