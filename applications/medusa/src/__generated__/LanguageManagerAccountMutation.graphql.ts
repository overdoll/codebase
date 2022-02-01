/**
 * @generated SignedSource<<d0be424873759437e6fba9a0d9a09b0d>>
 * @relayHash 5b2d56ffbe947ffa06998e8d42a5770f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5b2d56ffbe947ffa06998e8d42a5770f

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateAccountLanguageInput = {
  locale: string;
};
export type LanguageManagerAccountMutation$variables = {
  input: UpdateAccountLanguageInput;
};
export type LanguageManagerAccountMutationVariables = LanguageManagerAccountMutation$variables;
export type LanguageManagerAccountMutation$data = {
  readonly updateAccountLanguage: {
    readonly language: {
      readonly locale: string;
      readonly name: string;
    } | null;
  } | null;
};
export type LanguageManagerAccountMutationResponse = LanguageManagerAccountMutation$data;
export type LanguageManagerAccountMutation = {
  variables: LanguageManagerAccountMutationVariables;
  response: LanguageManagerAccountMutation$data;
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
    "concreteType": "UpdateAccountLanguagePayload",
    "kind": "LinkedField",
    "name": "updateAccountLanguage",
    "plural": false,
    "selections": [
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
    "name": "LanguageManagerAccountMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LanguageManagerAccountMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "5b2d56ffbe947ffa06998e8d42a5770f",
    "metadata": {},
    "name": "LanguageManagerAccountMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "eb48534c7ecb10176221ca1670030adf";

export default node;
