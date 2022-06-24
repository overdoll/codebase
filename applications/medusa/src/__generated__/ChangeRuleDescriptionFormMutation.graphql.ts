/**
 * @generated SignedSource<<58258389e90d01e17884d1ee6dc1cd76>>
 * @relayHash 5371cc228813fb6f66f59243fd2d8019
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5371cc228813fb6f66f59243fd2d8019

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateRuleDescriptionInput = {
  description: string;
  locale: string;
  ruleId: string;
};
export type ChangeRuleDescriptionFormMutation$variables = {
  input: UpdateRuleDescriptionInput;
};
export type ChangeRuleDescriptionFormMutation$data = {
  readonly updateRuleDescription: {
    readonly rule: {
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
export type ChangeRuleDescriptionFormMutation = {
  response: ChangeRuleDescriptionFormMutation$data;
  variables: ChangeRuleDescriptionFormMutation$variables;
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
    "concreteType": "UpdateRuleDescriptionPayload",
    "kind": "LinkedField",
    "name": "updateRuleDescription",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Rule",
        "kind": "LinkedField",
        "name": "rule",
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
    "name": "ChangeRuleDescriptionFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeRuleDescriptionFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "5371cc228813fb6f66f59243fd2d8019",
    "metadata": {},
    "name": "ChangeRuleDescriptionFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "6d023b1cd9ef290dd1a4112936745258";

export default node;
