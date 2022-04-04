/**
 * @generated SignedSource<<7a2304a3824aeb049317216810d463fb>>
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

(node as any).hash = "33ebe5a2681a617eb6ede2edc2d2b3af";

export default node;
