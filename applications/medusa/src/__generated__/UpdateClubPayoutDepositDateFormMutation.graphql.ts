/**
 * @generated SignedSource<<abf02068ae259f6efc1d55b40fdbe31c>>
 * @relayHash 1a60f06f45c54cf3fb51f663213396b9
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1a60f06f45c54cf3fb51f663213396b9

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateClubPayoutDepositDateInput = {
  newDate: any;
  payoutId: string;
};
export type UpdateClubPayoutDepositDateFormMutation$variables = {
  input: UpdateClubPayoutDepositDateInput;
};
export type UpdateClubPayoutDepositDateFormMutationVariables = UpdateClubPayoutDepositDateFormMutation$variables;
export type UpdateClubPayoutDepositDateFormMutation$data = {
  readonly updateClubPayoutDepositDate: {
    readonly clubPayout: {
      readonly id: string;
      readonly depositDate: any;
    } | null;
  } | null;
};
export type UpdateClubPayoutDepositDateFormMutationResponse = UpdateClubPayoutDepositDateFormMutation$data;
export type UpdateClubPayoutDepositDateFormMutation = {
  variables: UpdateClubPayoutDepositDateFormMutationVariables;
  response: UpdateClubPayoutDepositDateFormMutation$data;
};

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
    "concreteType": "UpdateClubPayoutDepositDatePayload",
    "kind": "LinkedField",
    "name": "updateClubPayoutDepositDate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ClubPayout",
        "kind": "LinkedField",
        "name": "clubPayout",
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
            "name": "depositDate",
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
    "name": "UpdateClubPayoutDepositDateFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateClubPayoutDepositDateFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "1a60f06f45c54cf3fb51f663213396b9",
    "metadata": {},
    "name": "UpdateClubPayoutDepositDateFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "d1ed950b0fb1a032c2a830fc39fb6d4d";

export default node;
