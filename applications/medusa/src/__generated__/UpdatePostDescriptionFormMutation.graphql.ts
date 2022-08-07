/**
 * @generated SignedSource<<26ba6917ab1e0b9a4a9eaba8f9b11b75>>
 * @relayHash 0649231317cf4f8866f208631afec7c4
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0649231317cf4f8866f208631afec7c4

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdatePostDescriptionInput = {
  description: string;
  id: string;
  locale: string;
};
export type UpdatePostDescriptionFormMutation$variables = {
  input: UpdatePostDescriptionInput;
};
export type UpdatePostDescriptionFormMutation$data = {
  readonly updatePostDescription: {
    readonly post: {
      readonly description: string;
      readonly id: string;
    } | null;
  } | null;
};
export type UpdatePostDescriptionFormMutation = {
  response: UpdatePostDescriptionFormMutation$data;
  variables: UpdatePostDescriptionFormMutation$variables;
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
    "concreteType": "UpdatePostDescriptionPayload",
    "kind": "LinkedField",
    "name": "updatePostDescription",
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
            "name": "description",
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
    "name": "UpdatePostDescriptionFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdatePostDescriptionFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "0649231317cf4f8866f208631afec7c4",
    "metadata": {},
    "name": "UpdatePostDescriptionFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "471fde56c043c035a7bfe45df22fa7e5";

export default node;
