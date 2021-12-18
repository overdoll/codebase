/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 5ab0ca5bf23747e497108aa121673c50 */

import { ConcreteRequest } from "relay-runtime";
export type UpdateLanguageInput = {
    locale: string;
};
export type LanguageManagerMutationVariables = {
    input: UpdateLanguageInput;
};
export type LanguageManagerMutationResponse = {
    readonly updateLanguage: {
        readonly language: {
            readonly locale: string;
            readonly name: string;
        } | null;
    } | null;
};
export type LanguageManagerMutation = {
    readonly response: LanguageManagerMutationResponse;
    readonly variables: LanguageManagerMutationVariables;
};



/*
mutation LanguageManagerMutation(
  $input: UpdateLanguageInput!
) {
  updateLanguage(input: $input) {
    language {
      locale
      name
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
    "concreteType": "UpdateLanguagePayload",
    "kind": "LinkedField",
    "name": "updateLanguage",
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
    "name": "LanguageManagerMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LanguageManagerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "5ab0ca5bf23747e497108aa121673c50",
    "metadata": {},
    "name": "LanguageManagerMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '79a9cd6891411bd53f506f89dafe3206';
export default node;
