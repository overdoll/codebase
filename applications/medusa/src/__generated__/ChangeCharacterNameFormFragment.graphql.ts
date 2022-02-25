/**
 * @generated SignedSource<<c185030c07cab5dcb7a8ab79ea7ab2ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCharacterNameFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeCharacterNameFormFragment";
};
export type ChangeCharacterNameFormFragment = ChangeCharacterNameFormFragment$data;
export type ChangeCharacterNameFormFragment$key = {
  readonly " $data"?: ChangeCharacterNameFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCharacterNameFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCharacterNameFormFragment",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      "action": "THROW",
      "path": "id"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "c85a3de650e0f858bf0be30f341b9d9d";

export default node;
