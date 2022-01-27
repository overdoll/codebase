/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 89f44bcb143b2ddf9c77f21bdbde4406 */

import { ConcreteRequest } from "relay-runtime";
export type RejectPostInput = {
    postId: string;
    ruleId: string;
    notes?: string | null | undefined;
};
export type ModeratePostRejectMutationVariables = {
    input: RejectPostInput;
    connections: Array<string>;
};
export type ModeratePostRejectMutationResponse = {
    readonly rejectPost: {
        readonly postAuditLog: {
            readonly id: string;
            readonly post: {
                readonly id: string;
            };
        } | null;
    } | null;
};
export type ModeratePostRejectMutation = {
    readonly response: ModeratePostRejectMutationResponse;
    readonly variables: ModeratePostRejectMutationVariables;
};



/*
mutation ModeratePostRejectMutation(
  $input: RejectPostInput!
) {
  rejectPost(input: $input) {
    postAuditLog {
      id
      post {
        id
      }
    }
  }
}
*/

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
(node as any).hash = '43c3f00a14f96a925f1ccec977fabbb9';
export default node;
