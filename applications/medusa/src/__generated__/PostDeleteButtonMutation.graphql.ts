/**
 * @generated SignedSource<<d4e102aa9b67347df553c7fc75425aff>>
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
  connections: ReadonlyArray<string>;
  input: DeletePostInput;
};
export type PostDeleteButtonMutation$data = {
  readonly deletePost: {
    readonly postId: string | null;
  } | null;
};
export type PostDeleteButtonMutation = {
  response: PostDeleteButtonMutation$data;
  variables: PostDeleteButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PostDeleteButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "DeletePostPayload",
        "kind": "LinkedField",
        "name": "deletePost",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "PostDeleteButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "DeletePostPayload",
        "kind": "LinkedField",
        "name": "deletePost",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "postId",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
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

(node as any).hash = "fd6b8ef6a6d9cfa5862a1696fa7068f6";

export default node;
