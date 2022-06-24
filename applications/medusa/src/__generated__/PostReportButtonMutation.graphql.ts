/**
 * @generated SignedSource<<39d07acec481905afcd214575317af2d>>
 * @relayHash 20c260e5bd220caa3f4fa567d38867f9
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 20c260e5bd220caa3f4fa567d38867f9

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ReportPostInput = {
  postId: string;
  ruleId: string;
};
export type PostReportButtonMutation$variables = {
  input: ReportPostInput;
};
export type PostReportButtonMutation$data = {
  readonly reportPost: {
    readonly postReport: {
      readonly id: string;
      readonly rule: {
        readonly title: string;
      };
    } | null;
  } | null;
};
export type PostReportButtonMutation = {
  response: PostReportButtonMutation$data;
  variables: PostReportButtonMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PostReportButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ReportPostPayload",
        "kind": "LinkedField",
        "name": "reportPost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostReport",
            "kind": "LinkedField",
            "name": "postReport",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Rule",
                "kind": "LinkedField",
                "name": "rule",
                "plural": false,
                "selections": [
                  (v3/*: any*/)
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostReportButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ReportPostPayload",
        "kind": "LinkedField",
        "name": "reportPost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostReport",
            "kind": "LinkedField",
            "name": "postReport",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Rule",
                "kind": "LinkedField",
                "name": "rule",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "20c260e5bd220caa3f4fa567d38867f9",
    "metadata": {},
    "name": "PostReportButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "5bd9aa7e8dfd3b50fa50fe3679a57284";

export default node;
