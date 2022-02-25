/**
 * @generated SignedSource<<ea91b14dfebd51b6d3b83b45a2c52877>>
 * @relayHash 4bf96a36148dd672f0e12ef50275fdf2
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4bf96a36148dd672f0e12ef50275fdf2

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateSeriesTitleInput = {
  id: string;
  locale: string;
  title: string;
};
export type ChangeSeriesTitleFormMutation$variables = {
  input: UpdateSeriesTitleInput;
};
export type ChangeSeriesTitleFormMutationVariables = ChangeSeriesTitleFormMutation$variables;
export type ChangeSeriesTitleFormMutation$data = {
  readonly updateSeriesTitle: {
    readonly series: {
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
export type ChangeSeriesTitleFormMutationResponse = ChangeSeriesTitleFormMutation$data;
export type ChangeSeriesTitleFormMutation = {
  variables: ChangeSeriesTitleFormMutationVariables;
  response: ChangeSeriesTitleFormMutation$data;
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
    "concreteType": "UpdateSeriesTitlePayload",
    "kind": "LinkedField",
    "name": "updateSeriesTitle",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Series",
        "kind": "LinkedField",
        "name": "series",
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
    "name": "ChangeSeriesTitleFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeSeriesTitleFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "4bf96a36148dd672f0e12ef50275fdf2",
    "metadata": {},
    "name": "ChangeSeriesTitleFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "b5aad23aabeac255e102ab550a6ed8cc";

export default node;
