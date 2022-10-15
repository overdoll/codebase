/**
 * @generated SignedSource<<57b54d117f2b3a786332eb70c7afbc34>>
 * @relayHash 5f6c67f156496216564f54b08829c29a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5f6c67f156496216564f54b08829c29a

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CurationProfileDateOfBirthButtonMutation$variables = {
  dateOfBirth?: any | null;
  skipped: boolean;
};
export type CurationProfileDateOfBirthButtonMutation$data = {
  readonly updateCurationProfileDateOfBirth: {
    readonly curationProfile: {
      readonly completed: boolean;
      readonly dateOfBirth: {
        readonly completed: boolean;
        readonly dateOfBirth: any | null;
        readonly skipped: boolean;
      };
      readonly id: string;
    } | null;
  } | null;
};
export type CurationProfileDateOfBirthButtonMutation = {
  response: CurationProfileDateOfBirthButtonMutation$data;
  variables: CurationProfileDateOfBirthButtonMutation$variables;
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
    "name": "CurationProfileDateOfBirthButtonMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CurationProfileDateOfBirthButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "5f6c67f156496216564f54b08829c29a",
    "metadata": {},
    "name": "CurationProfileDateOfBirthButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "9e092f7340e4c5705d7da278c13dc76b";

export default node;
