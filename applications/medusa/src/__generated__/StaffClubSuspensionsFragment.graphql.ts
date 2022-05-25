/**
 * @generated SignedSource<<38c5c7a9a711ff186820f388cd0cd447>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubSuspensionsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubSuspensionLogsFragment" | "StaffClubInfractionsFragment">;
  readonly " $fragmentType": "StaffClubSuspensionsFragment";
};
export type StaffClubSuspensionsFragment = StaffClubSuspensionsFragment$data;
export type StaffClubSuspensionsFragment$key = {
  readonly " $data"?: StaffClubSuspensionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubSuspensionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubSuspensionsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffClubSuspensionLogsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffClubInfractionsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "c1d4ea4a4c2cbaf33cf56364f8530707";

export default node;
