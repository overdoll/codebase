/**
 * @generated SignedSource<<db28693ec72d493c9f2acffdd696814a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UsernamesSettingsFragment$data = {
  readonly username: string;
  readonly usernameEditAvailableAt: any;
  readonly " $fragmentType": "UsernamesSettingsFragment";
};
export type UsernamesSettingsFragment = UsernamesSettingsFragment$data;
export type UsernamesSettingsFragment$key = {
  readonly " $data"?: UsernamesSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UsernamesSettingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UsernamesSettingsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "usernameEditAvailableAt",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "a916a8808878280fb46d0525815ae532";

export default node;
