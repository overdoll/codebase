/**
 * @generated SignedSource<<05b2b167314366569694483752deae87>>
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
  connections: ReadonlyArray<string>;
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
  "name": "id",
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
    "name": "ModeratePostApproveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
              (v3/*: any*/)
            ],
            "storageKey": null
          }
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
    "name": "ModeratePostApproveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteEdge",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id",
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
        ],
        "storageKey": null
      }
    ]
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

(node as any).hash = "886358de62d177e7779c643c346c7541";

export default node;
