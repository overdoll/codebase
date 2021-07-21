/**
 * @flow
 * @relayHash 5bea89c07976cdcffb14789ca0816f9d
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ModeratePostMutationVariables = {|
  postId: string,
  reasonId?: ?string,
  notes: string,
|};
export type ModeratePostMutationResponse = {|
  +moderatePost: {|
    +validation: ?{|
      +code: string
    |},
    +auditLog: ?{|
      +id: string
    |},
  |}
|};
export type ModeratePostMutation = {|
  variables: ModeratePostMutationVariables,
  response: ModeratePostMutationResponse,
|};


/*
mutation ModeratePostMutation(
  $postId: String!
  $reasonId: String
  $notes: String!
) {
  moderatePost(data: {pendingPostId: $postId, rejectionReasonId: $reasonId, notes: $notes}) {
    validation {
      code
    }
    auditLog {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "notes"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "postId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "reasonId"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "notes",
            "variableName": "notes"
          },
          {
            "kind": "Variable",
            "name": "pendingPostId",
            "variableName": "postId"
          },
          {
            "kind": "Variable",
            "name": "rejectionReasonId",
            "variableName": "reasonId"
          }
        ],
        "kind": "ObjectValue",
        "name": "data"
      }
    ],
    "concreteType": "ModeratePost",
    "kind": "LinkedField",
    "name": "moderatePost",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Validation",
        "kind": "LinkedField",
        "name": "validation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PendingPostAuditLog",
        "kind": "LinkedField",
        "name": "auditLog",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ModeratePostMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ModeratePostMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": "5bea89c07976cdcffb14789ca0816f9d",
    "metadata": {},
    "name": "ModeratePostMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '0cdf041ccf4a87552eb1668073eb1ff5';
module.exports = node;
