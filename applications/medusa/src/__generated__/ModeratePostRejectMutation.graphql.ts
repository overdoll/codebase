/**
 * @generated SignedSource<<3b95e3122e2ecb27a1487b74504bb6c1>>
 * @relayHash 89f44bcb143b2ddf9c77f21bdbde4406
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 89f44bcb143b2ddf9c77f21bdbde4406

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
    readonly postAuditLog: {
      readonly id: string;
      readonly post: {
        readonly id: string;
      };
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
            "concreteType": "PostAuditLog",
            "kind": "LinkedField",
            "name": "postAuditLog",
            "plural": false,
            "selections": [
              (v3/*: any*/),
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
            "concreteType": "PostAuditLog",
            "kind": "LinkedField",
            "name": "postAuditLog",
            "plural": false,
            "selections": [
              (v3/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "89f44bcb143b2ddf9c77f21bdbde4406",
    "metadata": {},
    "name": "ModeratePostRejectMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "43c3f00a14f96a925f1ccec977fabbb9";

export default node;
