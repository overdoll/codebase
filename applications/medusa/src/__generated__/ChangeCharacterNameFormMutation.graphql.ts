/**
 * @generated SignedSource<<4c1cf6b598a3c09a65d410af6e8ebfa6>>
 * @relayHash d6302154de673f6a52b5669490ef64fa
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d6302154de673f6a52b5669490ef64fa

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateCharacterNameInput = {
  id: string;
  locale: string;
  name: string;
};
export type ChangeCharacterNameFormMutation$variables = {
  input: UpdateCharacterNameInput;
};
export type ChangeCharacterNameFormMutationVariables = ChangeCharacterNameFormMutation$variables;
export type ChangeCharacterNameFormMutation$data = {
  readonly updateCharacterName: {
    readonly character: {
      readonly id: string;
      readonly name: string;
      readonly nameTranslations: ReadonlyArray<{
        readonly text: string;
        readonly language: {
          readonly locale: string;
          readonly name: string;
        };
      }>;
    } | null;
  } | null;
};
export type ChangeCharacterNameFormMutationResponse = ChangeCharacterNameFormMutation$data;
export type ChangeCharacterNameFormMutation = {
  variables: ChangeCharacterNameFormMutationVariables;
  response: ChangeCharacterNameFormMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateCharacterNamePayload",
    "kind": "LinkedField",
    "name": "updateCharacterName",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "character",
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
            "concreteType": "Translation",
            "kind": "LinkedField",
            "name": "nameTranslations",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Language",
                "kind": "LinkedField",
                "name": "language",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "locale",
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
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
    "name": "ChangeCharacterNameFormMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeCharacterNameFormMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "d6302154de673f6a52b5669490ef64fa",
    "metadata": {},
    "name": "ChangeCharacterNameFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "448ce892e3f9c759113cbdbf0350f954";

export default node;
