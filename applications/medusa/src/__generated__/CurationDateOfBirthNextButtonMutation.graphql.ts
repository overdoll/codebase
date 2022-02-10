/**
 * @generated SignedSource<<d01c574b1385bb2f154fd5f801c7b574>>
 * @relayHash 13c95462e8e0b48f0ab896e5853fe65d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 13c95462e8e0b48f0ab896e5853fe65d

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CurationDateOfBirthNextButtonMutation$variables = {
  dateOfBirth?: any | null;
  skipped: boolean;
};
export type CurationDateOfBirthNextButtonMutationVariables = CurationDateOfBirthNextButtonMutation$variables;
export type CurationDateOfBirthNextButtonMutation$data = {
  readonly updateCurationProfileDateOfBirth: {
    readonly curationProfile: {
      readonly id: string;
      readonly completed: boolean;
      readonly dateOfBirth: {
        readonly skipped: boolean;
        readonly completed: boolean;
        readonly dateOfBirth: any | null;
      };
    } | null;
  } | null;
};
export type CurationDateOfBirthNextButtonMutationResponse = CurationDateOfBirthNextButtonMutation$data;
export type CurationDateOfBirthNextButtonMutation = {
  variables: CurationDateOfBirthNextButtonMutationVariables;
  response: CurationDateOfBirthNextButtonMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "dateOfBirth"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "skipped"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "completed",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "dateOfBirth",
            "variableName": "dateOfBirth"
          },
          {
            "kind": "Variable",
            "name": "skipped",
            "variableName": "skipped"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UpdateCurationProfileDateOfBirthPayload",
    "kind": "LinkedField",
    "name": "updateCurationProfileDateOfBirth",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CurationProfile",
        "kind": "LinkedField",
        "name": "curationProfile",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "DateOfBirthCurationProfile",
            "kind": "LinkedField",
            "name": "dateOfBirth",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "skipped",
                "storageKey": null
              },
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "dateOfBirth",
                "storageKey": null
              }
            ],
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
    "name": "CurationDateOfBirthNextButtonMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CurationDateOfBirthNextButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "13c95462e8e0b48f0ab896e5853fe65d",
    "metadata": {},
    "name": "CurationDateOfBirthNextButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "3e2a811260655f25ab98d4417469f772";

export default node;
