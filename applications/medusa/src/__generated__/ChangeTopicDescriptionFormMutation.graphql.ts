/**
 * @generated SignedSource<<7cde924c5bba40a781f145081487d25f>>
 * @relayHash 634b29eed863c683607ff1d79a756163
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 634b29eed863c683607ff1d79a756163

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateTopicDescriptionInput = {
  description: string;
  id: string;
  locale: string;
};
export type ChangeTopicDescriptionFormMutation$variables = {
  input: UpdateTopicDescriptionInput;
};
export type ChangeTopicDescriptionFormMutation$data = {
  readonly updateTopicDescription: {
    readonly topic: {
      readonly description: string;
      readonly descriptionTranslations: ReadonlyArray<{
        readonly language: {
          readonly locale: string;
          readonly name: string;
        };
        readonly text: string;
      }>;
      readonly id: string;
    } | null;
  } | null;
};
export type ChangeTopicDescriptionFormMutation = {
  response: ChangeTopicDescriptionFormMutation$data;
  variables: ChangeTopicDescriptionFormMutation$variables;
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
    "concreteType": "UpdateTopicDescriptionPayload",
    "kind": "LinkedField",
    "name": "updateTopicDescription",
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
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Translation",
            "kind": "LinkedField",
            "name": "descriptionTranslations",
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
    "name": "ChangeTopicDescriptionFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeTopicDescriptionFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "634b29eed863c683607ff1d79a756163",
    "metadata": {},
    "name": "ChangeTopicDescriptionFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "48a3d271f17663ed429f46a90fc6174f";

export default node;
