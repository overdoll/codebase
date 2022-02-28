/**
 * @generated SignedSource<<242fe51afab1edf5dcdf238bee46ab4f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileMenuFragment$data = {
  readonly username: string;
  readonly " $fragmentType": "ProfileMenuFragment";
};
export type ProfileMenuFragment = ProfileMenuFragment$data;
export type ProfileMenuFragment$key = {
  readonly " $data"?: ProfileMenuFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileMenuFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileMenuFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "9e7b522d2bf93e2399ec5fec28429692";

export default node;
