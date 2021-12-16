/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash b3737bd363ab02a5b07fa92ef97b85cf */

import { ConcreteRequest } from "relay-runtime";
export type UpdatePostAudienceInput = {
    id: string;
    audienceId: string;
};
export type useUpdateAudienceMutationVariables = {
    input: UpdatePostAudienceInput;
};
export type useUpdateAudienceMutationResponse = {
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
export type useUpdateAudienceMutation = {
    readonly response: useUpdateAudienceMutationResponse;
    readonly variables: useUpdateAudienceMutationVariables;
};



/*
mutation useUpdateAudienceMutation(
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
    "name": "useUpdateAudienceMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateAudienceMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "b3737bd363ab02a5b07fa92ef97b85cf",
    "metadata": {},
    "name": "useUpdateAudienceMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = 'd8dcc686147eafb259f513056d7315e8';
export default node;
