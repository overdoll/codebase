/**
 * @generated SignedSource<<ee1f4e96ace4941d0e63c5b94647fe10>>
 * @relayHash aa1dd00091dee86c7da9c50b89c2947d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID aa1dd00091dee86c7da9c50b89c2947d

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateCharacterValidation = "SLUG_TAKEN" | "%future added value";
export type CreateCharacterInput = {
  clubId?: string | null;
  name: string;
  seriesId?: string | null;
  slug: string;
};
export type CreateClubCharacterFormMutation$variables = {
  input: CreateCharacterInput;
};
export type CreateClubCharacterFormMutation$data = {
  readonly createCharacter: {
    readonly character: {
      readonly id: string;
      readonly name: string;
    } | null;
    readonly validation: CreateCharacterValidation | null;
  } | null;
};
export type CreateClubCharacterFormMutation = {
  response: CreateClubCharacterFormMutation$data;
  variables: CreateClubCharacterFormMutation$variables;
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
    "concreteType": "CreateCharacterPayload",
    "kind": "LinkedField",
    "name": "createCharacter",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "validation",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "character",
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
            "name": "name",
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
    "name": "CreateClubCharacterFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateClubCharacterFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "aa1dd00091dee86c7da9c50b89c2947d",
    "metadata": {},
    "name": "CreateClubCharacterFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "da8f776580ba89b807bde3832b93197f";

export default node;
