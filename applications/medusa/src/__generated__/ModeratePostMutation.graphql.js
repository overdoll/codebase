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
  input: ModeratePostInput
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
    "name": "ModeratePostMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ModeratePostMutation",
    "selections": (v1/*: any*/)
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
(node: any).hash = '6daad6ccb91a52a94aa3fc2c4124101f';
module.exports = node;
