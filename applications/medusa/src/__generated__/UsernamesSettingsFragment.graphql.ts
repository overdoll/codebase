/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UsernamesSettingsFragment = {
    readonly username: string;
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
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = 'b0fe70753b1c4919598f89b8d6a7e3e9';
export default node;
