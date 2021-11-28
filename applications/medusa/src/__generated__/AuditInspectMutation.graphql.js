/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type RevertPostAuditLogInput = {|
  postAuditLogId: string
|};
export type AuditInspectMutationVariables = {|
  input: RevertPostAuditLogInput
|};
export type AuditInspectMutationResponse = {|
  +revertPostAuditLog: ?{|
    +postAuditLog: ?{|
      +id: string,
      +reverted: boolean,
    |}
  |}
|};
export type AuditInspectMutation = {|
  variables: AuditInspectMutationVariables,
  response: AuditInspectMutationResponse,
|};


/*
mutation AuditInspectMutation(
  $input: RevertPostAuditLogInput!
) {
  revertPostAuditLog(input: $input) {
    postAuditLog {
      id
      reverted
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
    "concreteType": "RevertPostAuditLogPayload",
    "kind": "LinkedField",
    "name": "revertPostAuditLog",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "reverted",
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
    "name": "AuditInspectMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuditInspectMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2c93181c7c3a593188b2d52c726483d5",
    "id": null,
    "metadata": {},
    "name": "AuditInspectMutation",
    "operationKind": "mutation",
    "text": "mutation AuditInspectMutation(\n  $input: RevertPostAuditLogInput!\n) {\n  revertPostAuditLog(input: $input) {\n    postAuditLog {\n      id\n      reverted\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '0109ff157b4b53ac8ee8f5edccc29880';
module.exports = node;
