/**
 * @generated SignedSource<<f717a0d666529beef0c84c0ac3cf6f63>>
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
};
export type ModeratePostRejectMutation$data = {
  readonly rejectPost: {
    readonly post: {
      readonly id: string;
    } | null;
  } | null;
};
export type ModeratePostRejectMutation = {
  response: ModeratePostRejectMutation$data;
  variables: ModeratePostRejectMutation$variables;
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
    "name": "ModeratePostRejectMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ModeratePostRejectMutation",
    "selections": (v1/*: any*/)
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

(node as any).hash = "b78dc13d1d1bee9f4c63636ae3087a23";

export default node;
