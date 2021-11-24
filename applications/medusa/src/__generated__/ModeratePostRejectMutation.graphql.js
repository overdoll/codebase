/**
 * @flow
 * @relayHash fc2cd3a27bd1fcc4e2a5c0d6b2909128
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type RejectPostInput = {|
  postId: string,
  postRejectionReasonId: string,
  notes?: ?string,
|};
export type ModeratePostRejectMutationVariables = {|
  input: RejectPostInput,
  connections: $ReadOnlyArray<string>,
|};
export type ModeratePostRejectMutationResponse = {|
  +rejectPost: ?{|
    +postAuditLog: ?{|
      +id: string
    |}
  |}
|};
export type ModeratePostRejectMutation = {|
  variables: ModeratePostRejectMutationVariables,
  response: ModeratePostRejectMutationResponse,
|};


/*
mutation ModeratePostRejectMutation(
  $input: RejectPostInput!
) {
  rejectPost(input: $input) {
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
    "id": "fc2cd3a27bd1fcc4e2a5c0d6b2909128",
    "metadata": {},
    "name": "ModeratePostRejectMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '631e184ac54110b6debe0219ca673eb0';
module.exports = node;
