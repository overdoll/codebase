/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 2c93181c7c3a593188b2d52c726483d5 */

import { ConcreteRequest } from "relay-runtime";
export type RevertPostAuditLogInput = {
    postAuditLogId: string;
};
export type AuditInspectMutationVariables = {
    input: RevertPostAuditLogInput;
};
export type AuditInspectMutationResponse = {
    readonly revertPostAuditLog: {
        readonly postAuditLog: {
            readonly id: string;
            readonly reverted: boolean;
        } | null;
    } | null;
};
export type AuditInspectMutation = {
    readonly response: AuditInspectMutationResponse;
    readonly variables: AuditInspectMutationVariables;
};



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
    "id": "2c93181c7c3a593188b2d52c726483d5",
    "metadata": {},
    "name": "AuditInspectMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '0109ff157b4b53ac8ee8f5edccc29880';
export default node;
