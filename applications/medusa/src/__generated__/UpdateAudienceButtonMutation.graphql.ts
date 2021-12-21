/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 1dd96056a5d03145570b194e50e511a0 */

import { ConcreteRequest } from "relay-runtime";
export type UpdatePostAudienceInput = {
    id: string;
    audienceId: string;
};
export type UpdateAudienceButtonMutationVariables = {
    input: UpdatePostAudienceInput;
};
export type UpdateAudienceButtonMutationResponse = {
    readonly updatePostAudience: {
        readonly post: {
            readonly id: string;
            readonly audience: {
                readonly id: string;
                readonly title: string;
            } | null;
        } | null;
    } | null;
};
export type UpdateAudienceButtonMutation = {
    readonly response: UpdateAudienceButtonMutationResponse;
    readonly variables: UpdateAudienceButtonMutationVariables;
};



/*
mutation UpdateAudienceButtonMutation(
  $input: UpdatePostAudienceInput!
) {
  updatePostAudience(input: $input) {
    post {
      id
      audience {
        id
        title
      }
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdatePostAudiencePayload",
    "kind": "LinkedField",
    "name": "updatePostAudience",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Audience",
            "kind": "LinkedField",
            "name": "audience",
            "plural": false,
            "selections": [
              (v1/*: any*/),
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateAudienceButtonMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateAudienceButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "1dd96056a5d03145570b194e50e511a0",
    "metadata": {},
    "name": "UpdateAudienceButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '7aa5eb375b9ad79bd7726cd4f03697f4';
export default node;
