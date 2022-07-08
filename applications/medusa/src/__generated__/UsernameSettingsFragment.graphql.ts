/**
 * @generated SignedSource<<d55d357a5c6221c5cee0795f3c552a06>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UsernameSettingsFragment$data = {
  readonly username: string;
  readonly usernameEditAvailableAt: any;
  readonly " $fragmentType": "UsernameSettingsFragment";
};
export type UsernameSettingsFragment$key = {
  readonly " $data"?: UsernameSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UsernameSettingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UsernameSettingsFragment",
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

(node as any).hash = "b864faea4ce8758c61e31b94cfd94237";

export default node;
