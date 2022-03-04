/**
 * @generated SignedSource<<76112ffaa30559ba3aa5a0a7d7b9dca4>>
 * @relayHash 06ec1eb7d07d859efb5cf1ad040cdf04
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 06ec1eb7d07d859efb5cf1ad040cdf04

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateRuleTitleInput = {
  locale: string;
  ruleId: string;
  title: string;
};
export type ChangeRuleTitleFormMutation$variables = {
  input: UpdateRuleTitleInput;
};
export type ChangeRuleTitleFormMutationVariables = ChangeRuleTitleFormMutation$variables;
export type ChangeRuleTitleFormMutation$data = {
  readonly updateRuleTitle: {
    readonly rule: {
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
export type ChangeRuleTitleFormMutationResponse = ChangeRuleTitleFormMutation$data;
export type ChangeRuleTitleFormMutation = {
  variables: ChangeRuleTitleFormMutationVariables;
  response: ChangeRuleTitleFormMutation$data;
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
    "concreteType": "UpdateRuleTitlePayload",
    "kind": "LinkedField",
    "name": "updateRuleTitle",
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
    "name": "ChangeRuleTitleFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeRuleTitleFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "06ec1eb7d07d859efb5cf1ad040cdf04",
    "metadata": {},
    "name": "ChangeRuleTitleFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "8c95a1ad6b803f6734d0217ae5d6a8b5";

export default node;
