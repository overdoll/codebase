/**
 * @generated SignedSource<<880800f832a2f08c5f5ffafbe457cb77>>
 * @relayHash 0ff8f14ca8c48fbb992962f7a8216c3a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0ff8f14ca8c48fbb992962f7a8216c3a

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type JoinClubButtonWithdrawMembershipMutation$variables = {
  clubId: string;
};
export type JoinClubButtonWithdrawMembershipMutationVariables = JoinClubButtonWithdrawMembershipMutation$variables;
export type JoinClubButtonWithdrawMembershipMutation$data = {
  readonly withdrawClubMembership: {
    readonly clubMemberId: string;
  } | null;
};
export type JoinClubButtonWithdrawMembershipMutationResponse = JoinClubButtonWithdrawMembershipMutation$data;
export type JoinClubButtonWithdrawMembershipMutation = {
  variables: JoinClubButtonWithdrawMembershipMutationVariables;
  response: JoinClubButtonWithdrawMembershipMutation$data;
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
    "name": "JoinClubButtonWithdrawMembershipMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "JoinClubButtonWithdrawMembershipMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "0ff8f14ca8c48fbb992962f7a8216c3a",
    "metadata": {},
    "name": "JoinClubButtonWithdrawMembershipMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "ea374c122586c3c08804939f498a6d4b";

export default node;
