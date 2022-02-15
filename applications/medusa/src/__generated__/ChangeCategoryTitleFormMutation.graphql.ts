/**
 * @generated SignedSource<<6a229deff2a02c01c398d448d37de10f>>
 * @relayHash 3f4366a06d946692f8b5fbea8d77db2f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3f4366a06d946692f8b5fbea8d77db2f

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
      readonly titleTranslations: ReadonlyArray<{
        readonly text: string;
        readonly language: {
          readonly locale: string;
          readonly name: string;
        };
      }>;
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Translation",
            "kind": "LinkedField",
            "name": "titleTranslations",
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
    "id": "3f4366a06d946692f8b5fbea8d77db2f",
    "metadata": {},
    "name": "ChangeCategoryTitleFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "a8d66d2e1688d716d326012c2dbc3cfa";

export default node;
