/**
 * @generated SignedSource<<9cad989a488470c962dc9b959d557a2e>>
 * @relayHash e615c2a8304cd1f54fe689491fefa291
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e615c2a8304cd1f54fe689491fefa291

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type WithdrawMembershipButtonMutation$variables = {
  clubId: string;
};
export type WithdrawMembershipButtonMutationVariables = WithdrawMembershipButtonMutation$variables;
export type WithdrawMembershipButtonMutation$data = {
  readonly withdrawClubMembership: {
    readonly clubMemberId: string;
  } | null;
};
export type WithdrawMembershipButtonMutationResponse = WithdrawMembershipButtonMutation$data;
export type WithdrawMembershipButtonMutation = {
  variables: WithdrawMembershipButtonMutationVariables;
  response: WithdrawMembershipButtonMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "clubId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "clubId",
            "variableName": "clubId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "WithdrawClubMembershipPayload",
    "kind": "LinkedField",
    "name": "withdrawClubMembership",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clubMemberId",
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
    "name": "WithdrawMembershipButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WithdrawMembershipButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "e615c2a8304cd1f54fe689491fefa291",
    "metadata": {},
    "name": "WithdrawMembershipButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "f50d90e489ac3a7756beb33894fc75ab";

export default node;
