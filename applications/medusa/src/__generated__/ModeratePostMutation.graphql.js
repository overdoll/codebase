/**
 * @flow
 * @relayHash bc46e4f065e4d0a9b71911a575e429b2
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ModeratePostInput = {|
  postId: string,
  postRejectionReasonId?: ?string,
  notes: string,
|};
export type ModeratePostMutationVariables = {|
  input: ModeratePostInput,
  connections: $ReadOnlyArray<string>,
|};
export type ModeratePostMutationResponse = {|
  +moderatePost: ?{|
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
  $input: ModeratePostInput!
) {
  moderatePost(input: $input) {
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
        "concreteType": "ModeratePostPayload",
        "kind": "LinkedField",
        "name": "moderatePost",
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
        "concreteType": "ModeratePostPayload",
        "kind": "LinkedField",
        "name": "moderatePost",
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
    "id": "bc46e4f065e4d0a9b71911a575e429b2",
    "metadata": {},
    "name": "ModeratePostMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'f052735aabd0d413a09a03672a9be867';
module.exports = node;
