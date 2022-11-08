/**
 * @generated SignedSource<<c6865cb964d0c49b071aa066774d2545>>
 * @relayHash f1aea35ad7238536203e08ce5bf3eb50
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f1aea35ad7238536203e08ce5bf3eb50

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateClubBlurbInput = {
  blurb: string;
  id: string;
};
export type ChangeClubBlurbFormMutation$variables = {
  input: UpdateClubBlurbInput;
};
export type ChangeClubBlurbFormMutation$data = {
  readonly updateClubBlurb: {
    readonly club: {
      readonly blurb: string;
      readonly id: string;
    } | null;
  } | null;
};
export type ChangeClubBlurbFormMutation = {
  response: ChangeClubBlurbFormMutation$data;
  variables: ChangeClubBlurbFormMutation$variables;
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
    "concreteType": "UpdateClubBlurbPayload",
    "kind": "LinkedField",
    "name": "updateClubBlurb",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
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
            "name": "blurb",
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
    "name": "ChangeClubBlurbFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeClubBlurbFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "f1aea35ad7238536203e08ce5bf3eb50",
    "metadata": {},
    "name": "ChangeClubBlurbFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "91b6135cfe973e02ac06695d33e0cad5";

export default node;
