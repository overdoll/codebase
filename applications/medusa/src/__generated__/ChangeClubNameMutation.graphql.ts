/**
 * @generated SignedSource<<672753f81fbac6a68eb50b14f066acf8>>
 * @relayHash fa46b33d00292f22e9607b295f9ddab6
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID fa46b33d00292f22e9607b295f9ddab6

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChangeClubNameMutation$variables = {
  id: string;
  name: string;
};
export type ChangeClubNameMutationVariables = ChangeClubNameMutation$variables;
export type ChangeClubNameMutation$data = {
  readonly updateClubName: {
    readonly club: {
      readonly id: string;
      readonly name: string;
    } | null;
  } | null;
};
export type ChangeClubNameMutationResponse = ChangeClubNameMutation$data;
export type ChangeClubNameMutation = {
  variables: ChangeClubNameMutationVariables;
  response: ChangeClubNameMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
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
            "name": "id",
            "variableName": "id"
          },
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UpdateClubNamePayload",
    "kind": "LinkedField",
    "name": "updateClubName",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
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
            "name": "name",
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
    "name": "ChangeClubNameMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeClubNameMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "fa46b33d00292f22e9607b295f9ddab6",
    "metadata": {},
    "name": "ChangeClubNameMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "87cd26fdc027eaae39a95369fcedd075";

export default node;
