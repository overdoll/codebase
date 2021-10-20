/**
 * @flow
 * @relayHash 6ce7a4c61fb41cd336413e1537bb1afd
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ApprovePostInput = {|
  postId: string
|};
export type ModeratePostMutationVariables = {|
  input: ApprovePostInput,
  connections: $ReadOnlyArray<string>,
|};
export type ModeratePostMutationResponse = {|
  +approvePost: ?{|
    +postAuditLog: ?{|
      +id: string
    |}
  |}
|};
export type ModeratePostMutation = {|
  variables: ModeratePostMutationVariables,
  response: ModeratePostMutationResponse,
|};


/*
mutation ModeratePostMutation(
  $input: ApprovePostInput!
) {
  approvePost(input: $input) {
    postAuditLog {
      id
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
    "name": "ModeratePostMutation",
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
    "name": "ModeratePostMutation",
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
    "id": "6ce7a4c61fb41cd336413e1537bb1afd",
    "metadata": {},
    "name": "ModeratePostMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '43274ace47e1ec3ecfe138dd7b10d7cc';
module.exports = node;
