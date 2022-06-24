/**
 * @generated SignedSource<<ba96a9bc5648a4793a2d6ad0368cf7b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubCancelActiveSupporterSubscriptionsForClubFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "StaffClubCancelActiveSupporterSubscriptionsForClubFragment";
};
export type StaffClubCancelActiveSupporterSubscriptionsForClubFragment$key = {
  readonly " $data"?: StaffClubCancelActiveSupporterSubscriptionsForClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubCancelActiveSupporterSubscriptionsForClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubCancelActiveSupporterSubscriptionsForClubFragment",
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
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "c3e4938cf613c1da34ca7d4c2943db0a";

export default node;
