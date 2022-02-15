/**
 * @generated SignedSource<<f5e2b4a71a6a8b2769aeb704fa7bdfdb>>
 * @relayHash 576843f454a998f96883bb7e353667c9
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 576843f454a998f96883bb7e353667c9

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateCategoryTitleInput = {
  id: string;
  locale: string;
  title: string;
};
export type ChangeCategoryTitleFormMutation$variables = {
  input: UpdateCategoryTitleInput;
};
export type ChangeCategoryTitleFormMutationVariables = ChangeCategoryTitleFormMutation$variables;
export type ChangeCategoryTitleFormMutation$data = {
  readonly updateCategoryTitle: {
    readonly category: {
      readonly id: string;
      readonly title: string;
    } | null;
  } | null;
};
export type ChangeCategoryTitleFormMutationResponse = ChangeCategoryTitleFormMutation$data;
export type ChangeCategoryTitleFormMutation = {
  variables: ChangeCategoryTitleFormMutationVariables;
  response: ChangeCategoryTitleFormMutation$data;
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
    "concreteType": "UpdateCategoryTitlePayload",
    "kind": "LinkedField",
    "name": "updateCategoryTitle",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Category",
        "kind": "LinkedField",
        "name": "category",
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
            "name": "title",
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
    "name": "ChangeCategoryTitleFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeCategoryTitleFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "576843f454a998f96883bb7e353667c9",
    "metadata": {},
    "name": "ChangeCategoryTitleFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "2eb2eeff1d68fa57889e28e927f9432e";

export default node;
