/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 926d9b8b79922d67b1acd809afbd3dca */

import { ConcreteRequest } from "relay-runtime";
export type ApprovePostInput = {
    postId: string;
};
export type ModeratePostApproveMutationVariables = {
    input: ApprovePostInput;
    connections: Array<string>;
};
export type ModeratePostApproveMutationResponse = {
    readonly approvePost: {
        readonly postAuditLog: {
            readonly id: string;
            readonly post: {
                readonly id: string;
            };
        } | null;
    } | null;
};
export type ModeratePostApproveMutation = {
    readonly response: ModeratePostApproveMutationResponse;
    readonly variables: ModeratePostApproveMutationVariables;
};



/*
mutation ModeratePostApproveMutation(
  $input: ApprovePostInput!
) {
  approvePost(input: $input) {
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
    "id": "926d9b8b79922d67b1acd809afbd3dca",
    "metadata": {},
    "name": "ModeratePostApproveMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '2272be8d7f1cfd8f551e6e19d792a904';
export default node;
