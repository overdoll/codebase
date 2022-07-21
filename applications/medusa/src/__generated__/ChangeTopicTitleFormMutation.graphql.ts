/**
 * @generated SignedSource<<0fc34d7582034ee0eea2d2b0db38dd5f>>
 * @relayHash 4d7857c16a5e5cbcd03734b9acd8bbd0
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4d7857c16a5e5cbcd03734b9acd8bbd0

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateTopicTitleInput = {
  id: string;
  locale: string;
  title: string;
};
export type ChangeTopicTitleFormMutation$variables = {
  input: UpdateTopicTitleInput;
};
export type ChangeTopicTitleFormMutation$data = {
  readonly updateTopicTitle: {
    readonly topic: {
      readonly id: string;
      readonly title: string;
      readonly titleTranslations: ReadonlyArray<{
        readonly language: {
          readonly locale: string;
          readonly name: string;
        };
        readonly text: string;
      }>;
    } | null;
  } | null;
};
export type ChangeTopicTitleFormMutation = {
  response: ChangeTopicTitleFormMutation$data;
  variables: ChangeTopicTitleFormMutation$variables;
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
    "concreteType": "UpdateTopicTitlePayload",
    "kind": "LinkedField",
    "name": "updateTopicTitle",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Topic",
        "kind": "LinkedField",
        "name": "topic",
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
    "name": "ChangeTopicTitleFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeTopicTitleFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "4d7857c16a5e5cbcd03734b9acd8bbd0",
    "metadata": {},
    "name": "ChangeTopicTitleFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "4b40e89738f8544618ea6a30d0d42581";

export default node;
