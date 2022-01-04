/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UsernamesSettingsFragment = {
    readonly username: string;
    readonly usernameEditAvailableAt: unknown;
    readonly " $refType": "UsernamesSettingsFragment";
};
export type UsernamesSettingsFragment$data = UsernamesSettingsFragment;
export type UsernamesSettingsFragment$key = {
    readonly " $data"?: UsernamesSettingsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UsernamesSettingsFragment">;
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
(node as any).hash = 'a916a8808878280fb46d0525815ae532';
export default node;
