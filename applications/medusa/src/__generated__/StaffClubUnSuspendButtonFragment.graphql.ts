/**
 * @generated SignedSource<<6c3e2610086eed2e39163240cd08996b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubUnSuspendButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffClubUnSuspendButtonFragment";
};
export type StaffClubUnSuspendButtonFragment = StaffClubUnSuspendButtonFragment$data;
export type StaffClubUnSuspendButtonFragment$key = {
  readonly " $data"?: StaffClubUnSuspendButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubUnSuspendButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubUnSuspendButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "ce90d29b9fe58e1480c59f71393a644e";

export default node;
