/**
 * @generated SignedSource<<febe5c99bffc143a7b68b11b648af766>>
 * @relayHash 7ef08502181bf8c03472866198be2206
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7ef08502181bf8c03472866198be2206

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RejectPostInput = {
  notes?: string | null;
  postId: string;
  ruleId: string;
};
export type ModeratePostRejectMutation$variables = {
  input: RejectPostInput;
  connections: ReadonlyArray<string>;
};
export type ModeratePostRejectMutationVariables = ModeratePostRejectMutation$variables;
export type ModeratePostRejectMutation$data = {
  readonly rejectPost: {
    readonly post: {
      readonly id: string;
    } | null;
  } | null;
};
export type ModeratePostRejectMutationResponse = ModeratePostRejectMutation$data;
export type ModeratePostRejectMutation = {
  variables: ModeratePostRejectMutationVariables;
  response: ModeratePostRejectMutation$data;
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
    "name": "ModeratePostRejectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RejectPostPayload",
        "kind": "LinkedField",
        "name": "rejectPost",
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
    "name": "ModeratePostRejectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RejectPostPayload",
        "kind": "LinkedField",
        "name": "rejectPost",
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
    "id": "7ef08502181bf8c03472866198be2206",
    "metadata": {},
    "name": "ModeratePostRejectMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "437cfbac12649689ce300715dfdb1751";

export default node;
