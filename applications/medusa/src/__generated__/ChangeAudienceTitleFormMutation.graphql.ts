/**
 * @generated SignedSource<<fbd5db4a439b26c542a466cee4936d92>>
 * @relayHash c2da6cedfb5807e0148b17e948b60c9d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c2da6cedfb5807e0148b17e948b60c9d

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateAudienceTitleInput = {
  id: string;
  locale: string;
  title: string;
};
export type ChangeAudienceTitleFormMutation$variables = {
  input: UpdateAudienceTitleInput;
};
export type ChangeAudienceTitleFormMutation$data = {
  readonly updateAudienceTitle: {
    readonly audience: {
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
export type ChangeAudienceTitleFormMutation = {
  response: ChangeAudienceTitleFormMutation$data;
  variables: ChangeAudienceTitleFormMutation$variables;
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
    "concreteType": "UpdateAudienceTitlePayload",
    "kind": "LinkedField",
    "name": "updateAudienceTitle",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Audience",
        "kind": "LinkedField",
        "name": "audience",
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
    "name": "ChangeAudienceTitleFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeAudienceTitleFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "c2da6cedfb5807e0148b17e948b60c9d",
    "metadata": {},
    "name": "ChangeAudienceTitleFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "db174dcf39a211022ab269ea28ce3944";

export default node;
