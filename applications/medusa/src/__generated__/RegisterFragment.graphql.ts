/**
 * @generated SignedSource<<8d9062c3b406523a3ca9c585137ab4ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RegisterFragment$data = {
  readonly id: string;
  readonly token: string;
  readonly " $fragmentSpreads": FragmentRefs<"RevokeTokenButtonFragment">;
  readonly " $fragmentType": "RegisterFragment";
};
export type RegisterFragment$key = {
  readonly " $data"?: RegisterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RegisterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RegisterFragment",
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
      "name": "token",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RevokeTokenButtonFragment"
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "30f2ff467c50340d4ce3e6a8308201c1";

export default node;
